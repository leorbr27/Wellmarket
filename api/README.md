# API — 100 Rejeições

API Node.js/Express para o painel Well Market, com PostgreSQL no Neon e implantação serverless na Vercel.

## Deploy na Vercel

1. Importe `https://github.com/leorbr27/Wellmarket` em https://vercel.com/new.
2. Mantenha a raiz do repositório como Root Directory, pois o arquivo `vercel.json` está na raiz.
3. Em Project Settings → Environment Variables, crie `DATABASE_URL` com a connection string pooled do Neon. Marque Production (e Preview se necessário). Não coloque a URL no GitHub nem no HTML.
4. Faça o deploy. A API ficará em `https://SEU-PROJETO.vercel.app`.

## Variáveis de ambiente
- `DATABASE_URL`: string de conexão pooled do Neon, configurada como variável de ambiente secreta na Vercel.
- `FRONTEND_ORIGIN`: origem do front-end (padrão `https://leorbr27.github.io`).
- `PORT`: usada somente em execução local.

Não comite `.env` nem compartilhe a senha do banco. Use `.env.example` apenas como modelo.

## Rotas
- `GET /health`
- `GET /prospects`
- `POST /prospects` e `PUT /prospects/:id`
- `PATCH /prospects/:id/status`
- `DELETE /prospects/:id`
- `GET /conversations?prospectId=...` ou todas as conversas
- `POST /conversations`, `PUT /conversations/:id`, `DELETE /conversations/:id`

## Segurança
CORS limita origens de navegador, mas não autentica clientes. Antes de usar dados reais publicamente, adicione autenticação/controle de acesso. Nunca coloque a senha do Neon no front-end.
