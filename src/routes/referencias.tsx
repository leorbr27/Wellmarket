import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/well-market-header';

export const Route = createFileRoute('/referencias')({
  head: () => ({ meta: [
    { title: 'Well Market | Referências de design e publicação' },
    { name: 'description', content: 'Sites concorrentes como referências para a Well Market e orientações sobre GitHub e Google Sites.' },
    { property: 'og:title', content: 'Well Market | Referências do projeto' },
    { property: 'og:description', content: 'Inspirações do setor de mercados autônomos e caminhos para publicação do site.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: References,
});

function References() {
  return <><header className="site-header"><div className="container-wide header-inner"><Brand /><Button variant="outline" asChild><Link to="/"><ArrowLeft /> Voltar ao site</Link></Button></div></header><main className="container-wide pb-20"><div className="reference-header"><div className="eyebrow text-primary">Pesquisa para a Well Market</div><h1>Boas referências.<br />Uma identidade própria.</h1><p className="section-lead">Seleção de concorrentes brasileiros para comparar apresentação, navegação e clareza comercial. Consulta em 12 de outubro de 2026.</p></div>
    <div className="reference-list">{[
      ['market4u', 'https://market4u.com.br/', 'Uma boa referência de apresentação profissional e confiança. A comunicação para síndicos, o portal dedicado e as provas sociais ajudam a organizar uma decisão de implantação.', 'O que aproveitar: hierarquia clara e conteúdo direcionado ao síndico. A Well Market só deve usar depoimentos e números quando forem reais.'],
      ['Honest Market Brasil', 'https://honestmarketbrasil.com.br/', 'Destaque para a organização por público, com áreas para condomínios e empresas, e para a proposta comercial apresentada com clareza.', 'O que aproveitar: facilitar a identificação de quem visita e dar acesso rápido às condições de implantação.'],
      ['Onii', 'https://www.onii.app/', 'Uma referência com personalidade mais tecnológica e comunicação voltada à experiência de compra pelo aplicativo.', 'O que aproveitar: explicar a jornada de compra de forma visual, sem prometer sistemas ainda não definidos pela Well Market.'],
      ['Minha Quitandinha', 'https://minhaquitandinha.com.br/', 'Uma comunicação mais próxima da vizinhança, da comodidade e da rotina do morador.', 'O que aproveitar: linguagem acolhedora e benefícios cotidianos. A apresentação da Well Market mantém sua própria identidade em vermelho e amarelo.'],
    ].map(([name, url, description, lesson]) => <article key={name}><div><h2>{name}</h2><Button variant="link" className="px-0" asChild><a href={url} target="_blank" rel="noopener noreferrer">Visitar site <ArrowUpRight /></a></Button></div><div><p>{description}</p><p className="mt-4">{lesson}</p></div></article>)}</div>
    <section className="section pb-0"><div className="eyebrow">Da prévia à publicação</div><h2>GitHub e Google Sites:<br />papéis diferentes.</h2><div className="mt-8 space-y-5 max-w-3xl text-sm leading-8 text-muted-foreground"><p>O repositório <strong className="text-foreground">Wellmarket no GitHub</strong> pode guardar e sincronizar o projeto. Esta prévia ainda não foi enviada a esse repositório nem publicada.</p><p>O <strong className="text-foreground">Google Sites não importa um repositório como site pronto</strong>. Para preservar este visual, o caminho é hospedar o site e incorporar seu endereço no Google Sites, desde que a hospedagem permita a incorporação. Outra opção é recriar o conteúdo no editor do Google Sites, com menos liberdade visual.</p><p>O GitHub Pages recebe sites estáticos: este projeto precisa de uma exportação estática compatível antes de ser hospedado lá. Guardar o projeto no GitHub, por si só, não cria um endereço público.</p><Button variant="link" className="px-0" asChild><a href="https://support.google.com/sites/answer/90569?hl=pt-BR" target="_blank" rel="noopener noreferrer">Como incorporar conteúdo no Google Sites <ArrowUpRight /></a></Button><p>A imagem do mercado é ilustrativa, criada para esta proposta; não é uma fotografia de uma unidade existente. O PDF não informa telefone, e-mail ou WhatsApp comercial. O botão de avaliação não envia solicitações nesta prévia.</p></div></section>
  </main></>;
}