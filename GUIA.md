# Well Market — guia do site estático

O site público foi convertido para HTML, CSS e JavaScript puros. Não é necessário instalar dependências, executar servidor de desenvolvimento, compilar o projeto ou manter React/TSX para publicar o site.

## Arquivos públicos

| Arquivo | Função |
| --- | --- |
| `index.html` | Página inicial e conteúdo comercial |
| `styles.css` | Identidade visual e layout responsivo |
| `script.js` | Menu móvel, busca/categorias do FAQ e janela de contato |
| `referencias.html` | Referências do setor e orientação sobre publicação |
| `src/assets/well-market-store.jpg` | Imagem ilustrativa |
| `docs/well-market-apresentacao.pdf` | Apresentação comercial |
| `.github/workflows/deploy-pages.yml` | Publicação automática sem build |

## Como publicar alterações

Edite os arquivos HTML, CSS ou JavaScript e envie para a branch `main`. O GitHub Actions publicará os arquivos estáticos automaticamente. Não execute `npm install`, `bun install` ou `build`.

## Contato

WhatsApp: (27) 99944-1733  
E-mail: wellmarketbr@gmail.com