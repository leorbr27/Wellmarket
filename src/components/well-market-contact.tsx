import { ClipboardCheck, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import presentation from '@/assets/apresentacao.asset.json';

export function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent><DialogHeader>
    <DialogTitle>Avaliação do seu espaço</DialogTitle>
    <DialogDescription>O primeiro passo é entender o condomínio ou a empresa e verificar a viabilidade da implantação.</DialogDescription>
  </DialogHeader><ul className="dialog-checklist">
    <li><MapPin /> Cidade e localização do empreendimento</li>
    <li><ClipboardCheck /> Quantidade de unidades ou de pessoas atendidas</li>
    <li><ClipboardCheck /> Área disponível, energia e conectividade</li>
    <li><ClipboardCheck /> Regras locais e condições para aprovação</li>
  </ul><div className="contact-channels">
    <a href="https://wa.me/5527999441733" target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp: (27) 99944-1733</a>
    <a href="mailto:wellmarketbr@gmail.com"><Mail /> wellmarketbr@gmail.com</a>
  </div>
  <p className="fine-print">Entre em contato por WhatsApp ou e-mail para solicitar a avaliação do seu espaço.</p>
  <Button asChild><a href={presentation.url} target="_blank" rel="noopener noreferrer">Abrir apresentação comercial</a></Button>
  </DialogContent></Dialog>;
}