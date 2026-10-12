# Well Market

Site institucional da Well Market para apresentar a proposta de mini mercado autônomo a síndicos, condomínios e empresas da Grande Vitória.

## Publicação

O site público é publicado pelo GitHub Actions no GitHub Pages:

- Endereço: https://leorbr27.github.io/Wellmarket/
- A cada alteração enviada para a branch `main`, o workflow `.github/workflows/deploy-pages.yml` compila a aplicação e publica a versão estática.
- A configuração específica do GitHub Pages está em `vite.config.pages.ts`. O `vite.config.ts` original é mantido separado para não interferir no ambiente Lovable.
- A aplicação é compilada para funcionar sem servidor. O caminho de base `/Wellmarket/` é configurado para os assets e para a navegação.

## Desenvolvimento local

Requisitos: Bun e uma versão atual do Node.js.

```sh
bun install
bun run dev
```

## Testes

```sh
bun run test
```

## Estrutura principal

- `src/routes/index.tsx`: página inicial.
- `src/routes/referencias.tsx`: referências e orientações de publicação.
- `src/components/`: cabeçalho, FAQ, contato e componentes de interface.
- `src/data/well-market.ts`: condições comerciais e perguntas frequentes.
- `docs/well-market-apresentacao.pdf`: apresentação comercial, publicada junto ao site.
- `vite.config.pages.ts`: compilação estática específica do GitHub Pages.
- `.github/workflows/deploy-pages.yml`: compilação e publicação automáticas.

## Observações comerciais

O site apresenta uma proposta sujeita a avaliação técnica e contrato. O formulário de avaliação é informativo e não envia solicitações: os dados reais de contato comercial ainda precisam ser definidos.
