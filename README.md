# Well Market

Site institucional da Well Market para apresentar a proposta de mini mercado autônomo a síndicos, condomínios e empresas da Grande Vitória.

## Tecnologia

O site público usa **HTML, CSS e JavaScript puros**. Não usa React, TypeScript/TSX, Vite, Node.js, Bun, npm ou etapa de compilação para publicar.

## Publicação

- Site: https://leorbr27.github.io/Wellmarket/
- A cada alteração na branch `main`, o GitHub Actions copia os arquivos estáticos para uma pasta de publicação e publica no GitHub Pages.
- Workflow: `.github/workflows/deploy-pages.yml`.
- O site inclui página inicial, referências, FAQ com busca e categorias, menu responsivo, janela de contato e PDF comercial.
- A publicação leva somente os arquivos públicos necessários. O código TSX legado que permaneça no repositório não participa da publicação nem é necessário para o funcionamento do site.

## Arquivos do site

- `index.html`: página inicial.
- `styles.css`: estilos e responsividade.
- `script.js`: menu móvel, FAQ, busca e janela de contato.
- `referencias.html`: referências e orientações sobre publicação.\n- `rejeicoes.html`: painel interno “100 Rejeições”, com indicadores, filtros, cadastro/edição, ações rápidas e exportação CSV.
- `src/assets/well-market-store.jpg`: imagem ilustrativa.
- `docs/well-market-apresentacao.pdf`: apresentação comercial.
- `public/favicon.svg`: ícone do site.

## Contato

- WhatsApp: (27) 99944-1733
- E-mail: wellmarketbr@gmail.com

O site não coleta nem armazena dados de visitantes. O contato ocorre ao abrir WhatsApp ou e-mail. A implantação depende de avaliação técnica e contrato.\n\n## Painel 100 Rejeições\n\nA página `rejeicoes.html` é publicada em `https://leorbr27.github.io/Wellmarket/rejeicoes.html` e também está ligada à navegação do site institucional. A versão atual é um protótipo estático: os registros são armazenados no `localStorage` do navegador e não sincronizam entre dispositivos. Não inserir dados pessoais reais ou confidenciais. O projeto Neon `100-rejeicoes` foi provisionado separadamente, mas ainda não está conectado à página; para persistência compartilhada será necessário um backend/API autenticado (por exemplo, Next.js API + Prisma) e variáveis secretas configuradas no ambiente de hospedagem.\n