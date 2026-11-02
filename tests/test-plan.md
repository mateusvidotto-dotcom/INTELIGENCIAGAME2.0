# Plano de teste manual — Mind Forge Omega

## Integridade de conteúdo
- [ ] Abrir `/?test=1` e confirmar que o painel indica sucesso.
- [ ] Conferir o conteúdo factual e a explicação apresentada numa amostra de cada módulo.
- [ ] Confirmar que não existem IDs repetidos.

## Fluxo de sessão
- [ ] Iniciar um laboratório, selecionar uma opção e enviar.
- [ ] Confirmar que a explicação aparece somente depois da tentativa.
- [ ] Em uma questão errada, tentar novamente e depois avançar.
- [ ] Usar uma pista e verificar o indicador de pistas.
- [ ] Terminar uma sessão e conferir o relatório.
- [ ] Sair de uma sessão antes do fim e confirmar que as respostas já enviadas permanecem no histórico.

## Mecânicas específicas
- [ ] Atenção: contar o símbolo-alvo e conferir o feedback.
- [ ] Memória: observar a sequência, ocultá-la, responder e conferir o feedback.
- [ ] Criatividade/metacognição: escrever uma resposta, marcar critérios e registrar a reflexão sem que ela seja tratada como questão objetiva.
- [ ] Revisão: errar uma questão, abrir a fila e praticar o item novamente.
- [ ] Campanha: concluir corretamente uma etapa e confirmar que ela fica registrada; uma etapa errada deve continuar disponível.

## Dados e acessibilidade
- [ ] Atualizar a página e confirmar a persistência do progresso.
- [ ] Exportar um backup e importar o mesmo arquivo.
- [ ] Tentar importar um JSON inválido e confirmar mensagem de erro.
- [ ] Redefinir o progresso somente após confirmação.
- [ ] Navegar por teclado e verificar foco visível.
- [ ] Conferir layout em viewport de celular e desktop.

Este checklist acompanha o projeto. As verificações devem ser marcadas depois de executadas no navegador alvo.

## Verificações automatizadas já executadas nesta versão

- [x] Sintaxe de todos os arquivos JavaScript (`node --check`).
- [x] Auditoria estrita do banco: 12 módulos, 269 questões, 124 conjuntos de alternativas revisados, sem erros estruturais, repetição exata de enunciados, quase-duplicatas ou alertas de pista por comprimento.
- [x] Testes automatizados de pontuação, armazenamento simulado, fila de revisão, variantes de atenção/memória e diversidade adaptativa.
- [x] Verificação no Chromium com a versão portátil incorporada: tela inicial e 12 módulos renderizam, autoteste passa, desafio de elite inicia, a resposta provoca feedback após tentativa e o layout móvel em 390 px não apresenta rolagem horizontal.
- [x] Fluxo de tentativa e feedback exercitado nos 12 módulos; nenhum erro JavaScript de página/console detectado.
- [x] Nenhum erro JavaScript de página detectado durante o teste de navegação e resposta no Chromium.

## Repetir os testes localmente

Execute na raiz do repositório:

```bash
node tools/export-question-bank.cjs .question-bank.audit.json
python tools/audit_questions.py .question-bank.audit.json --strict
node tools/run-tests.cjs
```

O fluxo `.github/workflows/quality-check.yml` realiza estes passos automaticamente no GitHub Actions. Os testes cobrem sintaxe JavaScript, integridade do banco, tipos e níveis de questões, unicidade de IDs, distribuição de alternativas depois do embaralhamento, variantes procedurais de atenção/memória, XP, persistência, fila de revisão e diversidade adaptativa.

A auditoria não consegue provar automaticamente que todos os distratores são pedagogicamente excelentes, que toda interpretação bíblica é correta ou que a experiência funciona em todos os dispositivos. A revisão humana e a inspeção em navegadores reais continuam necessárias.
