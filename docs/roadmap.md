# Roteiro de evolução por fases

## Fase 1 — Fundação local (entregue nesta versão)

- Frontend existente preservado.
- Mapa curricular de 22 trilhas.
- Biblioteca OBMEP pesquisável por página/PDF.
- Python Core local com SQLite, FastAPI, validação, 11 geradores determinísticos, diagnóstico exploratório, revisão e recomendações.
- Testes automatizados e workflow de qualidade.

## Fase 2 — OBMEP como biblioteca pedagógica

- Segmentar individualmente cada problema dos PDFs, verificando enunciados e diagramas.
- Classificar tema, técnica, pré-requisitos e dificuldade estimada, registrando incertezas.
- Elaborar soluções próprias e dicas graduais, com revisão matemática independente.
- Criar simulados e análise de erros por conceito. Não publicar gabaritos não verificados.

## Fase 3 — Currículo e tutoriais

- Escrever aulas reais por trilha, começando por matemática, lógica, memória/metacognição e programação.
- Implementar pré-requisitos como grafo navegável, objetivos e avaliações de retenção/transferência.
- Expandir diagnósticos por área sem tratá-los como psicometria.

## Fase 4 — Jogos completos

- Implementar Sudoku com gerador e verificador de solução.
- Integrar motor de xadrez com licença compatível e avaliação real; validar força por testes e não por rótulo comercial.
- Adicionar partidas locais e, somente com infraestrutura adequada, partidas online.

## Fase 5 — Serviço remoto e IA

- Definir provedor de hospedagem do backend, autenticação, isolamento por usuário, limites de uso, observabilidade e backups.
- Só então habilitar IA real por adaptador server-side, com chaves protegidas, versionamento de prompts, validação de saídas e indicação de conteúdo gerado.
- Manter o frontend estático como fallback offline.
