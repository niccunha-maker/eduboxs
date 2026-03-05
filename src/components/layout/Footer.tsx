import { Link } from "react-router-dom";
import { SITE_NAME } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background/80" role="contentinfo" aria-label="Rodapé do site">
      {/* Torn paper top edge */}
      <div className="h-4 bg-background" style={{
        maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 16'%3E%3Cpath d='M0,0 L1200,0 L1200,8 Q1170,14 1140,8 T1080,10 T1020,6 T960,10 T900,8 T840,12 T780,6 T720,10 T660,8 T600,12 T540,6 T480,10 T420,8 T360,12 T300,6 T240,10 T180,8 T120,12 T60,6 L0,10 Z' fill='%23000'/%3E%3C/svg%3E")`,
        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 16'%3E%3Cpath d='M0,0 L1200,0 L1200,8 Q1170,14 1140,8 T1080,10 T1020,6 T960,10 T900,8 T840,12 T780,6 T720,10 T660,8 T600,12 T540,6 T480,10 T420,8 T360,12 T300,6 T240,10 T180,8 T120,12 T60,6 L0,10 Z' fill='%23000'/%3E%3C/svg%3E")`,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      }} />

      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-extrabold text-base font-serif-accent">E</span>
              </div>
              <span className="font-serif-accent text-xl text-background">
                Edu<span className="text-primary font-bold">Boxs</span>
              </span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed mb-6 max-w-xs">
              Montamos kits escolares completos conforme a lista oficial do
              colégio e entregamos direto na escola. Mais tempo pra sua
              família.
            </p>
            <div className="flex items-center gap-1" aria-label="Avaliação 4.9 de 5 estrelas">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-accent text-accent" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-background/50 ml-2">4.9/5 (320+ avaliações)</span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-widest text-background/50 mb-4 font-handwritten text-sm">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/kits" className="text-background/70 hover:text-background transition-colors">Kits Escolares</Link></li>
              <li><Link to="/sobre" className="text-background/70 hover:text-background transition-colors">Sobre Nós</Link></li>
              <li><Link to="/perguntas-frequentes" className="text-background/70 hover:text-background transition-colors">Perguntas frequentes</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-widest text-background/50 mb-4 font-handwritten text-sm">
              Conta
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/minha-conta" className="text-background/70 hover:text-background transition-colors">Minha Conta</Link></li>
              <li><Link to="/meus-pedidos" className="text-background/70 hover:text-background transition-colors">Meus Pedidos</Link></li>
              <li><Link to="/meus-enderecos" className="text-background/70 hover:text-background transition-colors">Endereços</Link></li>
              <li><Link to="/carrinho" className="text-background/70 hover:text-background transition-colors">Carrinho</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-background/50 mb-4 font-handwritten text-sm">
              Contato
            </h4>
            <ul className="space-y-2.5 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">📧</span>
                <span>eduboxs.loja@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">📱</span>
                <span>(11) 95364-6172</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">💬</span>
                <span>WhatsApp disponível</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col items-center gap-4 text-xs text-background/40 md:flex-row md:justify-between">
          <span>&copy; {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.</span>
          <div className="flex items-center gap-4">
            <Link to="/termos-de-uso" className="text-background/50 hover:text-background/80 transition-colors">
              Termos de Uso
            </Link>
            <Link to="/politica-de-privacidade" className="text-background/50 hover:text-background/80 transition-colors">
              Política de Privacidade
            </Link>
          </div>
          <span className="font-handwritten text-sm text-background/35">Feito com carinho para famílias brasileiras</span>
        </div>
      </div>
    </footer>
  );
};
