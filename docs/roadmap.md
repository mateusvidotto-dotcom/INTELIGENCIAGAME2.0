# Roteiro de evolução por fases

## Fase 1 — Fundação local

- Frontend original preservado.
- Mapa curricular de 22 trilhas.
- Python Core local com FastAPI, SQLite, validação, geradores determinísticos, diagnóstico exploratório, revisão e recomendações.
- Banco matemático ampliado com 12 desafios autorais.
- Testes automatizados e workflow de qualidade.

## Fase 2 — Aprofundamento pedagógico

- Escrever aulas reais por trilha, começando por matemática, lógica, memória/metacognição e programação.
- Implementar pré-requisitos como grafo navegável, objetivos e avaliações de retenção e transferência.
- Expandir diagnósticos por área sem tratá-los como psicometria.
- Ampliar soluções alternativas e rubricas das questões discursivas.

## Fase 3 — Jogos completos

- Implementar Sudoku com gerador e verificador de solução.
- Integrar motor de xadrez com licença compatível e avaliação real; validar força por testes, não por rótulo.
- Adicionar partidas locais e, somente com infraestrutura adequada, partidas online.

## Fase 4 — Serviço remoto e IA

- Definir hospedagem do backend, autenticação, isolamento por usuário, limites de uso, observabilidade e backups.
- Só então habilitar IA por adaptador server-side, com chaves protegidas, versionamento de prompts, validação e indicação de conteúdo gerado.
- Manter o frontend estático como fallback offline.
