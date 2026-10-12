import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Menu, ShoppingBasket, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Brand() {
  return <Link to="/" className="wordmark" aria-label="Well Market, início"><ShoppingBasket className="brand-icon" strokeWidth={2.1} /><span>well<span>market</span><span className="sr-only">Well Market</span></span></Link>;
}

export function WellMarketHeader({ onContact }: { onContact: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header"><div className="container-wide header-inner">
    <Brand />
    <nav className={`nav-links ${menuOpen ? 'menu-open' : ''}`} aria-label="Navegação principal">
      <a href="/#sobre" onClick={() => setMenuOpen(false)}>A Well Market</a>
      <a href="/#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
      <a href="/#implantacao" onClick={() => setMenuOpen(false)}>Implantação</a>
      <a href="/#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas frequentes</a>
    </nav>
    <Button size="cta" className="desktop-cta" onClick={onContact}>Quero no meu condomínio <ArrowUpRight /></Button>
    <Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
  </div></header>;
}