import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, Building2, Check, Clock3, Coins, FileCheck2, MapPin, Play, ShieldCheck, ShoppingBasket, Sparkles, Wallet, Wrench, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand, WellMarketHeader } from '@/components/well-market-header';
import { ContactDialog } from '@/components/well-market-contact';
import { WellMarketFaq } from '@/components/well-market-faq';
import { commercialTerms, type FaqCategory } from '@/data/well-market';
import storeImage from '@/assets/well-market-store.jpg';
import presentation from '@/assets/apresentacao.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Well Market | Mini mercado autônomo para o seu condomínio' },
    { name: 'description', content: 'Conheça a proposta Well Market: mini mercado 24 horas, sem investimento inicial para o condomínio. Implantação, funcionamento e dúvidas na Grande Vitória.' },
    { property: 'og:title', content: 'Well Market | Seu mini mercado, pertinho de você' },
    { property: 'og:description', content: 'Conveniência 24 horas no condomínio. Entenda a implantação, a operação e as condições comerciais da Well Market.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const topics: { icon: typeof Wallet; title: string; copy: string; category: FaqCategory }[] = [
  { icon: Wallet, title: 'Sem investimento inicial', copy: 'Equipamentos, estoque e operação por nossa conta. Entenda as condições.', category: 'Custos e condições' },
  { icon: Building2, title: 'Um mercado no seu espaço', copy: 'Loja interna, estrutura compacta ou contêiner. A solução começa com uma avaliação.', category: 'Espaço e implantação' },
  { icon: ShieldCheck, title: 'Segurança e tranquilidade', copy: 'Monitoramento, privacidade e responsabilidades bem definidas desde o início.', category: 'Segurança e privacidade' },
  { icon: ShoppingBasket, title: 'A gente cuida de tudo', copy: 'Produtos, reposição, limpeza e manutenção. Sem colocar a operação nas mãos do síndico.', category: 'Operação e produtos' },
  { icon: Clock3, title: 'Um piloto de 90 dias', copy: 'Um período para conhecer a demanda e avaliar a aceitação dos moradores.', category: 'Custos e condições' },
  { icon: FileCheck2, title: 'Tudo combinado, no contrato', copy: 'Aprovação, condições comerciais e responsabilidades. Clareza em cada etapa.', category: 'Contrato e aprovação' },
];

function Index() {
  const [contactOpen, setContactOpen] = useState(false);
  const [category, setCategory] = useState<FaqCategory>('Todas as dúvidas');
  const [query, setQuery] = useState('');
  const openContact = () => setContactOpen(true);
  const selectTopic = (next: FaqCategory) => { setCategory(next); setQuery(''); document.getElementById('duvidas')?.scrollIntoView({ behavior: 'smooth' }); };
  return <>
    <WellMarketHeader onContact={openContact} />
    <main>
      <section className="hero">
        <img className="hero-photo" src={storeImage} alt="Visualização ilustrativa de um mini mercado com prateleiras, refrigeradores e pagamento autônomo" width={1536} height={1024} fetchPriority="high" />
        <div className="hero-overlay" />
        <div className="container-wide hero-content"><div className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Seu dia a dia, muito mais prático</div>
          <h1>Well Market.<br />Seu mini mercado,<br /><em>pertinho de você.</em></h1>
          <p>Conveniência 24 horas dentro do seu condomínio.<br />Sem investimento inicial. Sem complicar a gestão.<br />Com tudo o que faz falta na hora que você precisa.</p>
          <div className="hero-actions"><Button variant="hero" size="cta" onClick={openContact}>Quero no meu condomínio <ArrowUpRight /></Button><Button variant="heroOutline" size="cta" asChild><a href="#como-funciona"><Play size={14} /> Veja como funciona</a></Button></div>
          <div className="hero-footnote"><MapPin size={13} /> Proposta para a Grande Vitória · Espírito Santo</div>
        </div><span className="photo-caption">Imagem ilustrativa do conceito · não representa unidade implantada</span>
      </section>
      <div className="proof-strip"><div className="container-wide proof-inner">
        {[{ icon: Clock3, title: 'Aberto 24 horas', subtitle: 'Todos os dias, no seu ritmo' }, { icon: Coins, title: 'R$ 0 de investimento inicial', subtitle: 'Para o condomínio, conforme proposta' }, { icon: Wrench, title: 'Operação por nossa conta', subtitle: 'Da reposição à manutenção' }, { icon: ShieldCheck, title: 'Monitoramento remoto', subtitle: 'Segurança com privacidade' }].map(item => <div className="proof-item" key={item.title}><item.icon strokeWidth={1.6} /><div><strong>{item.title}</strong><small>{item.subtitle}</small></div></div>)}
      </div></div>
      <section id="sobre" className="section"><div className="container-wide"><div className="section-heading"><div><div className="eyebrow">Bom para quem mora. Simples para quem cuida.</div><h2>Mais comodidade.<br />Menos preocupações.</h2></div><p className="section-lead">Seu condomínio não precisa virar comerciante.<br />A Well Market assume a operação para levar conveniência à rotina de quem vive ali.</p></div>
        <div className="topic-grid">{topics.map(topic => <article className="topic-card" key={topic.title}><div className="topic-icon"><topic.icon size={22} strokeWidth={1.6} /></div><h3>{topic.title}</h3><p>{topic.copy}</p><div className="topic-bottom"><span>Conheça os detalhes</span><Button variant="topic" size="icon" aria-label={`Saiba mais: ${topic.title}`} onClick={() => selectTopic(topic.category)}><ArrowUpRight /></Button></div></article>)}</div>
      </div></section>
      <section id="como-funciona" className="section soft-section"><div className="container-wide"><div className="section-heading"><div><div className="eyebrow">Do café que acabou ao lanche da madrugada</div><h2>Uma compra simples.<br />A qualquer hora.</h2></div><p className="section-lead">Sem sair do condomínio, sem filas e sem depender do horário do comércio.</p></div>
        <div className="step-grid">{[
          ['01', 'Entre no mercado', 'Acesse o espaço seguindo o controle de acesso definido para a sua unidade.'],
          ['02', 'Escolha seus produtos', 'Bebidas, alimentos e itens do dia a dia, com um mix pensado para os moradores.'],
          ['03', 'Pague digitalmente', 'Finalize sua compra pelo sistema de pagamento disponível no mercado.'],
          ['04', 'Siga com seu dia', 'É só levar suas compras. Nós cuidamos do estoque, da limpeza e da reposição.'],
        ].map(([n, title, copy]) => <article key={n}><div className="step-number">{n}</div><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <p className="fine-print">O sistema de acesso e os meios de pagamento serão definidos no projeto de cada unidade.</p>
      </div></section>
      <section id="implantacao" className="section"><div className="container-wide"><div className="section-heading"><div><div className="eyebrow">Do primeiro contato à primeira compra</div><h2>Um plano para<br />o seu condomínio.</h2></div><Button variant="outline" size="cta" asChild><a href={presentation.url} target="_blank" rel="noopener noreferrer">Ver apresentação <ArrowUpRight /></a></Button></div>
        <div className="step-grid">{[
          ['01', 'Visita técnica', 'Avaliamos espaço, estrutura, circulação e perfil dos moradores.'],
          ['02', 'Proposta e aprovação', 'Definimos o layout e as condições, seguindo as regras do condomínio.'],
          ['03', 'Implantação', 'Organizamos equipamentos, produtos, sistema e identidade do mercado.'],
          ['04', `Piloto de ${commercialTerms.pilotDays} dias`, 'Acompanhamos a aceitação, ajustamos o mix e avaliamos a continuidade.'],
        ].map(([n, title, copy]) => <article key={n}><div className="step-number">{n}</div><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <div className="responsibility-grid"><div><h3>O que fica com a Well Market</h3><ul>{['Equipamentos, sistema e estoque inicial', 'Reposição, validade, limpeza e manutenção operacional', 'Atendimento comercial e monitoramento da operação', 'Perdas de mercadoria e reembolso da energia acordada'].map(item => <li key={item}><Check />{item}</li>)}</ul></div><div><h3>O que alinhamos com o condomínio</h3><ul>{['Disponibilidade e adequação do espaço', 'Aprovações e regras de acesso e convivência', 'Medição de energia e condições de conectividade', 'Contrato, privacidade e responsabilidades por danos'].map(item => <li key={item}><FileCheck2 />{item}</li>)}</ul></div></div>
        <p className="fine-print">A proposta não prevê aluguel do espaço. Participação sobre o faturamento pode ser negociada, sem garantia de retorno. Aprovações, licenças e responsabilidades são validadas para cada local.</p>
      </div></section>
      <WellMarketFaq category={category} setCategory={setCategory} query={query} setQuery={setQuery} onContact={openContact} />
      <section id="contato" className="contact-band"><div className="container-wide contact-inner"><div><h2>A próxima comodidade<br />do seu condomínio.</h2><p>Vamos começar avaliando o seu espaço? A proposta inicial da Well Market é para a Grande Vitória. Empresas também podem apresentar interesse para avaliação específica.</p><div className="region">{commercialTerms.cities.map(city => <span key={city}>{city}</span>)}</div></div><Button variant="hero" size="cta" onClick={openContact}>Conhecer a avaliação <ArrowRight /></Button></div></section>
    </main>
    <footer className="footer"><div className="container-wide"><div className="footer-top"><div><Brand /><p className="mt-3">Conveniência de verdade. Pertinho de você.</p></div><div className="flex flex-wrap gap-5 text-xs"><a href="#duvidas">Dúvidas frequentes</a><a href={presentation.url} target="_blank" rel="noopener noreferrer">Apresentação comercial</a><Link to="/referencias">Referências do projeto <ArrowUpRight className="inline h-3 w-3" /></Link></div></div><div className="footer-bottom"><span>© 2026 Well Market · Proposta comercial para a Grande Vitória</span><span>Condições sujeitas à avaliação técnica e contrato.</span></div></div></footer>
    <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
  </>;
}
