import { Plus, Search, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { faqCategories, filterFaqs, type FaqCategory } from '@/data/well-market';

export function WellMarketFaq({ category, setCategory, query, setQuery, onContact }: {
  category: FaqCategory; setCategory: (category: FaqCategory) => void;
  query: string; setQuery: (query: string) => void; onContact: () => void;
}) {
  const results = filterFaqs(category, query);
  return <section id="duvidas" className="section soft-section"><div className="container-wide">
    <div className="section-heading"><div><div className="eyebrow">Sem dúvida, mais tranquilidade</div><h2>Vamos esclarecer<br />cada detalhe.</h2></div><p className="section-lead">Respostas para síndicos, administradoras e moradores. Da instalação ao dia a dia do mercado.</p></div>
    <div className="faq-layout"><aside><div className="faq-menu" aria-label="Assuntos das dúvidas">{faqCategories.map(item => <Button key={item} variant={category === item ? 'default' : 'ghost'} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</Button>)}</div><Button variant="link" onClick={onContact} className="mt-5 px-0">Meu caso é diferente <ArrowUpRight /></Button></aside>
      <div><label className="faq-search"><Search /><input type="search" aria-label="Buscar uma dúvida" placeholder="Qual é a sua dúvida?" value={query} onChange={event => setQuery(event.target.value)} /></label>
        {results.length ? results.map(item => <details className="faq-row" key={item.question}><summary>{item.question}<Plus /></summary><p>{item.answer}</p></details>) : <p className="py-8 text-sm text-muted-foreground">Nenhuma dúvida encontrada. Tente outro termo ou selecione todos os assuntos.</p>}
      </div>
    </div><p className="fine-print">Condições baseadas na apresentação comercial da Well Market. Cada implantação depende de avaliação técnica e contratual.</p>
  </div></section>;
}