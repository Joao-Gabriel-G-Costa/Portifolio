# Portfólio — João Gabriel

Portfólio pessoal em React e TypeScript, publicado no GitHub Pages. Reúne pesquisa acadêmica, aplicações implementadas e projetos em desenvolvimento, identificando com clareza o estágio de cada um.

## Tecnologias

- React e TypeScript
- Vite
- CSS responsivo
- GitHub Actions e GitHub Pages

## Executar localmente

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install
npm run dev
```

Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

## Projetos apresentados

- **Previsão de precipitação com LSTM:** pesquisa com dados históricos do INMET e resultados documentados no repositório próprio.
- **NFC Caelline:** site profissional desenvolvido com React e TypeScript.
- **HelpDesk:** backend Java/Spring Boot em desenvolvimento.
- **GYNLOG:** projeto acadêmico em equipe, desenvolvido em Java Swing.
- **Gerenciador de tarefas e sistema de estoque:** ideias planejadas, identificadas como não implementadas.

O portfólio apresenta links para os repositórios. Não contém código ou dados internos do estágio.

## Publicação

O workflow em `.github/workflows/deploy.yml` instala dependências, gera o site e publica o conteúdo de `dist/` no GitHub Pages. O caminho base do Vite está configurado para o repositório `Portifolio`.
