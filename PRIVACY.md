# Privacidade em linguagem simples

O Mind Forge foi desenhado para funcionar sem conta obrigatória. O progresso dos módulos está guardado no armazenamento local do navegador. Isso significa que os dados não aparecem automaticamente em outro aparelho e podem ser apagados pelo navegador ou perdidos se os dados do site forem limpos. Faça backups regularmente.

## O que fica no aparelho

- Progresso, tentativas e preferências do módulo principal.
- Progresso, revisões e projetos marcados no English Forge e no Logic Forge.
- Rascunhos e preferências que a própria pessoa salvar.

Os arquivos de backup podem conter respostas, rascunhos e histórico de atividade. Guarde-os em local privado e não compartilhe dados pessoais.

## Recursos que podem usar serviços externos

- **Tutor IA integrado:** ao enviar uma pergunta, o texto e parte do histórico recente saem do navegador e passam pelo Cloudflare Worker e pelo provedor de IA configurado. Não envie dados pessoais ou informações confidenciais. A IA pode errar.
- **Reconhecimento de fala:** quando ativado, o navegador pode processar o áudio por serviços do fabricante. O comportamento depende do navegador e do sistema operacional. O reconhecimento é opcional.
- **Voz sintetizada:** usa as vozes disponíveis no navegador/dispositivo; a disponibilidade e o processamento dependem do ambiente.
- **Xadrez e links externos:** ao abrir outro site, a política de privacidade desse serviço passa a valer.

## Microfone e gravações

O microfone só deve ser solicitado depois de uma ação explícita de gravação. Verifique permissões do navegador. As gravações locais do English Forge não são enviadas pelo módulo de gravação; a pessoa pode reproduzir ou baixar o arquivo no próprio aparelho.

## Controles

Use a tela de configurações para exportar ou apagar dados do Mind Forge. Para eliminar completamente os dados, também é necessário limpar os dados deste site no próprio navegador e apagar os arquivos de backup que tenham sido salvos fora dele.

Este documento explica o comportamento previsto do produto; não é aconselhamento jurídico nem declaração de conformidade legal. A arquitetura e a política devem ser revistas antes de ativar contas, sincronização, publicidade, analytics ou outros tratamentos de dados.
