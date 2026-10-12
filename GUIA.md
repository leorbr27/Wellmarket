# Well Market — guia do pacote

Este ZIP contém o código-fonte completo do site da Well Market, as imagens, a
apresentação em PDF e os testes das condições comerciais.

## O que tem dentro

| Pasta / arquivo | Conteúdo |
| --- | --- |
| `src/routes/` | Páginas: `index.tsx` (página inicial) e `referencias.tsx` (concorrentes e orientações de publicação) |
| `src/components/` | Cabeçalho, bloco de dúvidas e bloco de contato |
| `src/data/well-market.ts` | Condições comerciais e perguntas frequentes — é aqui que se edita o texto das regras |
| `src/data/well-market.test.ts` | Testes que conferem se as condições continuam corretas |
| `src/assets/` | Ilustração da loja e referência da apresentação em PDF |
| `src/styles.css` | Cores da marca (vermelho/amarelo) e as fontes Outfit (títulos) e Figtree (texto) |
| `public/` | Ícone do site e arquivo `robots.txt` |
| `docs/` | Apresentação em PDF (original e versão gerada) |

## Rodar no computador

Pré-requisitos: Node.js 20 ou mais novo.

```sh
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (geralmente `http://localhost:8080`).

## Testar as condições comerciais

```sh
npm run test
```

## Gerar a versão final para publicar

```sh
npm run build
```

O resultado fica na pasta `dist/`.

## Editar o texto

- Condições e dúvidas: `src/data/well-market.ts`
- Textos das páginas: `src/routes/index.tsx` e `src/routes/referencias.tsx`
- Cores e fontes: `src/styles.css`

## Contato comercial

O site ainda não mostra telefone, WhatsApp ou e-mail. Antes de divulgar,
adicione os dados reais em `src/components/well-market-contact.tsx`.
Nunca deixe números de exemplo no ar.

## Tecnologias

TanStack Start (React 19 + Vite), TypeScript, Tailwind CSS v4, shadcn/ui e Vitest.
