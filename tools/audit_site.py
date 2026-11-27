#!/usr/bin/env python3
"""Auditoria estrutural simples da página estática publicada."""
from __future__ import annotations
import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.duplicates = []
        self.targets_without_rel = []
        self.tags = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        self.tags.append((tag, values))
        identifier = values.get("id")
        if identifier:
            if identifier in self.ids:
                self.duplicates.append(identifier)
            self.ids.append(identifier)
        if values.get("target") == "_blank":
            rel = set((values.get("rel") or "").lower().split())
            if not {"noopener", "noreferrer"}.issubset(rel):
                self.targets_without_rel.append(values.get("href") or "<link sem href>")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--inline-output", type=Path, default=Path("/tmp/mind-forge-inline.js"))
    args = parser.parse_args()
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    page = SiteParser()
    page.feed(html)
    errors = []

    html_tag = next((attrs for tag, attrs in page.tags if tag == "html"), {})
    if html_tag.get("lang") != "pt-BR":
        errors.append("A página deve declarar lang=pt-BR.")
    if page.duplicates:
        errors.append("IDs HTML duplicados: " + ", ".join(sorted(set(page.duplicates))))
    if page.targets_without_rel:
        errors.append("Links target=_blank sem noopener noreferrer: " + ", ".join(page.targets_without_rel))

    ids = set(page.ids)
    meta_names = {attrs.get("name") for tag, attrs in page.tags if tag == "meta"}
    if "viewport" not in meta_names or "description" not in meta_names:
        errors.append("Metadados viewport e description são obrigatórios.")
    if not any(tag == "title" for tag, _ in page.tags):
        errors.append("Título da página ausente.")
    if not any(tag == "a" and attrs.get("href") == "#main-content" for tag, attrs in page.tags):
        errors.append("Link para pular ao conteúdo ausente.")
    if not any(tag == "nav" and attrs.get("aria-label") for tag, attrs in page.tags):
        errors.append("Navegação sem nome acessível.")
    if not any(tag == "main" and attrs.get("id") == "main-content" for tag, attrs in page.tags):
        errors.append("Landmark main não encontrado.")
    for required in ("main-content", "s-english", "s-logic", "s-home", "page-announcement"):
        if required not in ids:
            errors.append("Elemento obrigatório ausente: #" + required)

    required_assets = ("manifest.webmanifest", "logic-forge.css", "logic-forge.js", "preferences.css", "platform-enhancements.js", "scripts/site.js", "portuguese-forge.js", "scripts/core/question-context.js")
    for name in required_assets:
        if not any((attrs.get("href") or attrs.get("src") or "").endswith(name) for _, attrs in page.tags):
            errors.append("Recurso não referenciado: " + name)
    site_script = (ROOT / "scripts" / "site.js").read_text(encoding="utf-8")
    if 'serviceWorker.register("./service-worker.js")' not in site_script:
        errors.append("Registro do service worker ausente no controlador principal.")

    for _, attrs in page.tags:
        for attr in ("src", "href"):
            value = attrs.get(attr)
            if not value or value.startswith(("http://", "https://", "mailto:", "#", "data:")):
                continue
            local = value.split("?", 1)[0].split("#", 1)[0]
            if local and not (ROOT / local).exists():
                errors.append("Recurso local inexistente: " + local)

    try:
        manifest = json.loads((ROOT / "manifest.webmanifest").read_text(encoding="utf-8"))
        if manifest.get("lang") != "pt-BR" or manifest.get("start_url") != "./":
            errors.append("Manifest PWA precisa usar idioma e caminho relativos ao GitHub Pages.")
    except Exception as exc:
        errors.append("Manifest inválido: " + str(exc))

    inline_scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, flags=re.IGNORECASE | re.DOTALL)
    if any(script.strip() for script in inline_scripts):
        errors.append("Scripts inline não são permitidos.")
    if not any(tag == "script" and (attrs.get("src") or "").endswith("scripts/site.js") for tag, attrs in page.tags):
        errors.append("Controlador principal scripts/site.js não está referenciado.")

    csp_entries = [attrs.get("content", "") for tag, attrs in page.tags if tag == "meta" and (attrs.get("http-equiv") or "").lower() == "content-security-policy"]
    if len(csp_entries) != 1:
        errors.append("Deve existir exatamente uma política CSP em meta.")
    else:
        csp = csp_entries[0].lower()
        script_policy = next((part.strip() for part in csp.split(";") if part.strip().startswith("script-src ")), "")
        if "default-src 'self'" not in csp or "base-uri 'self'" not in csp or "object-src 'none'" not in csp or "script-src 'self'" not in csp:
            errors.append("Diretivas fundamentais da CSP ausentes.")
        if "unsafe-inline" in script_policy or "unsafe-eval" in csp:
            errors.append("A CSP não pode liberar scripts inline nem eval.")
        if "https://*.workers.dev" not in csp:
            errors.append("A CSP precisa permitir o endpoint do Tutor em workers.dev.")

    if 'id="pillar"></div>' in html or 'id="tasks"></div>' in html:
        errors.append("Pilares e plano inicial devem existir sem depender de JavaScript.")
    if errors:
        print("FALHAS NA AUDITORIA DO SITE:")
        for error in errors:
            print(" - " + error)
        return 1
    print("PASSOU: HTML, navegação, CSP, conteúdo inicial, links externos, PWA e recursos locais.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
