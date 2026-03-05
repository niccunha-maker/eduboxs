import { Search, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Escolha o colégio e a série",
    description:
      "Selecione a escola e o ano do seu filho. Nós já temos a lista oficial de materiais.",
    color: "text-primary",
    borderColor: "border-primary/30",
    bg: "bg-primary/[0.06]",
    annotation: "fácil!",
  },
  {
    icon: ShoppingCart,
    number: "02",
    title: "Faça seu pedido",
    description:
      "Compre o kit completo em poucos cliques pelo site ou pelo WhatsApp. Parcele em até 12x.",
    color: "text-accent",
    borderColor: "border-accent/30",
    bg: "bg-accent/[0.06]",
    annotation: "seguro!",
  },
  {
    icon: Truck,
    number: "03",
    title: "Entregamos na escola",
    description:
      "O kit chega organizado e pronto direto na escola do seu filho, antes do início das aulas.",
    color: "text-teal-600",
    borderColor: "border-teal-500/30",
    bg: "bg-teal-500/[0.06]",
    annotation: "prático!",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 relative notebook-lines overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
      {/* Red margin line */}
      <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-red-400/10 hidden lg:block" />

      <div className="container relative">
        <div className="text-center mb-14">
          <span className="font-handwritten text-2xl text-accent font-bold block mb-1">
            Simples assim
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como Funciona
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Em apenas <span className="highlighter-blue font-semibold text-foreground">3 passos</span> você resolve toda a lista escolar do seu filho
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative ${step.bg} border-2 ${step.borderColor} rounded-xl p-7 group hover:-translate-y-1 transition-all`}
            >
              {/* Handwritten annotation */}
              <span className={`absolute -top-3 right-4 font-handwritten text-lg ${step.color} font-bold transform rotate-[-4deg] z-10`}>
                {step.annotation}
              </span>

              {/* Large watermark number */}
              <span className="absolute top-3 left-5 text-[4rem] font-serif-accent font-bold opacity-[0.06] leading-none select-none pointer-events-none">
                {step.number}
              </span>

              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg border-2 ${step.borderColor} ${step.bg} mb-5`}>
                <step.icon className={`h-5 w-5 ${step.color}`} />
              </div>

              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector arrow */}
              {index < 2 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-border">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
