import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative rounded-xl overflow-hidden bg-primary px-6 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20 notebook-grid">
          {/* Decorative geometric shapes */}
          <div className="absolute top-6 right-8 w-20 h-20 border-4 border-white/10 rounded-lg transform rotate-12" />
          <div className="absolute bottom-8 left-12 w-14 h-14 border-4 border-white/10 rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-accent/20 rounded transform -rotate-6" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <span className="font-handwritten text-3xl text-accent font-bold block mb-4 transform -rotate-2">
              Pronto pra simplificar?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
              A volta às aulas sem estresse começa aqui
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-lg mx-auto">
              Escolha o colégio, compre o kit e a gente entrega tudo
              organizado direto na escola.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg px-10 h-14 text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:-rotate-1 transition-all"
            >
              <Link to="/kits">
                Comprar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
