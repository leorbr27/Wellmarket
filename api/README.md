# API — 100 Rejeições

API Node.js/Express para o painel Well Market, com PostgreSQL no Neon.

## Variáveis de ambiente
- `DATABASE_URL`: string de conexão pooled do Neon, definida como segredo no provedor de hospedagem.
- `FRONTEND_ORIGIN`: origem do front-end (padrão do Render Blueprint: `https://leorbr27.github.io`).
- `PORT`: porta fornecida pelo provedor (localmente, 3000).

Não comite `.env` nem compartilhe a senha do banco. Use `.env.example` apenas como modelo.

## Rotas
- `GET /health`
- `GET /prospects`
- `POST /prospects` e `PUT /prospects/:id` (upsert/edição)
- `PATCH /prospects/:id/status`
- `DELETE /prospects/:id`
- `GET /conversations?prospectId=...` ou todas as conversas
- `POST /conversations`, `PUT /conversations/:id`, `DELETE /conversations/:id`

## Hospedagem
O arquivo `render.yaml` descreve o serviço. Ao criar o serviço no Render, configure `DATABASE_URL` com a URL pooled do projeto Neon. O painel público não deve usar a URL do banco diretamente.

## Segurança
CORS limita origens de navegador, mas não autentica clientes. Antes de usar dados reais publicamente, adicione autenticação/controle de acesso. Nunca coloque a senha do Neon no front-end.
