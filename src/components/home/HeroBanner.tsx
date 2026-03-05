import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image — full width */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative py-14 sm:py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Handwritten annotation */}
          <div className="animate-fade-in mb-6">
            <span className="inline-block font-handwritten text-xl md:text-2xl text-accent font-bold transform -rotate-2">
              Volta às aulas 2026 →
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in stagger-1 text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] xl:text-[5.25rem] font-bold leading-[1.05] mb-4 sm:mb-6 tracking-tight">
            A lista escolar{" "}
            <br className="hidden sm:block" />
            resolvida em{" "}
            <span className="highlighter relative inline-block">
              um clique
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in stagger-2 text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-lg leading-relaxed">
            A EduBoxs monta o kit completo com todos os materiais da lista do
            colégio do seu filho e entrega{" "}
            <strong className="text-foreground font-semibold highlighter-orange">direto na escola</strong>.
            Sem filas, sem estresse.
          </p>

          {/* CTA buttons */}
          <div className="animate-fade-in stagger-3 flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 mb-10 sm:mb-14">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 h-14 rounded-lg shadow-ink-lg hover:shadow-xl hover:-translate-y-0.5 hover:-rotate-1 transition-all font-bold"
            >
              <Link to="/kits">
                Ver Kits Disponíveis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base h-14 rounded-lg border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 font-bold"
            >
              <Link to="/sobre">Como Funciona</Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="animate-fade-in stagger-4">
            <div className="inline-flex items-center gap-4 bg-card/90 backdrop-blur-sm border-2 border-border rounded-lg px-5 py-3 shadow-ink transform -rotate-1">
              <div className="flex -space-x-2.5">
                {[
                  { bg: "bg-primary", initials: "FM" },
                  { bg: "bg-accent", initials: "CR" },
                  { bg: "bg-emerald-500", initials: "AP" },
                  { bg: "bg-sky-400", initials: "LS" },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full ${a.bg} border-2 border-card flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    {a.initials}
                  </div>
                ))}
              </div>
              <div className="text-left border-l-2 border-dashed border-border pl-4">
                <div className="flex items-center gap-1 text-accent" aria-label="5 estrelas">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  <strong className="text-foreground">2.400+</strong> famílias atendidas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
