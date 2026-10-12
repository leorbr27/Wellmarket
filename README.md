# Well Market — site institucional

Site institucional responsivo da Well Market, voltado a síndicos, administradoras de condomínios e empresas interessadas em mini-mercados autônomos.

## Estrutura atual

- `index.html`: página única com apresentação comercial, etapas de implantação, áreas para condomínios e empresas, operação, FAQ interativo e formulário de interesse.
- HTML, CSS e JavaScript estão no mesmo arquivo para facilitar a publicação estática pelo GitHub Pages.

## Publicação

### GitHub Pages
1. Abra **Settings → Pages** neste repositório.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Selecione a branch `main` e a pasta `/ (root)`, depois salve.
4. Aguarde a conclusão da publicação indicada pelo GitHub.

URL esperada do projeto: https://leorbr27.github.io/Wellmarket/

### Google Sites
Google Sites e GitHub Pages são plataformas de publicação diferentes. O projeto HTML deste repositório não pode ser importado no Google Sites como um site editável nativo. Se o Google Sites for escolhido como destino, a estrutura visual e o conteúdo devem ser recriados nele; o repositório pode continuar como fonte do conteúdo e referência de design.

## Funcionalidades implementadas

- Layout responsivo para desktop e celular.
- Menu de navegação com menu recolhível em telas pequenas.
- Seções de apresentação, funcionamento, condomínios, empresas, operação, dúvidas e contato.
- FAQ interativo, filtrado por categoria.
- Formulário com validação básica que prepara e copia os dados da solicitação para a área de transferência, quando o navegador permite.

## Limitação importante do formulário

O formulário **ainda não envia os dados para a Well Market** nem os armazena em um servidor. Ele apenas prepara e tenta copiar a mensagem no navegador. Antes de divulgar o site para captar clientes, conecte o formulário a um canal comercial real (por exemplo, um serviço de formulários ou endpoint próprio) e publique a política de privacidade adequada.

## Conteúdo comercial a confirmar antes da divulgação

As respostas do FAQ foram redigidas de forma conservadora para não prometer condições ainda não confirmadas. Antes do lançamento, valide os detalhes reais sobre custos, energia, contrato, seguro, segurança, horários, meios de pagamento, reposição, limpeza e manutenção. Inclua também telefone, WhatsApp e e-mail comerciais oficiais, quando definidos.

## Histórico de alterações

- **2026-10-12** — Criado `index.html` com identidade visual verde e off-white, layout responsivo, seções comerciais, FAQ interativo e formulário demonstrativo.
- **2026-10-12** — Criado este README com instruções de publicação, limitações conhecidas e registro da alteração.
