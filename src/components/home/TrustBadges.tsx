import { Shield, CreditCard, Truck, Headphones } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Entrega na Escola",
    description: "Direto no colégio do seu filho",
    rotation: "-rotate-1",
    accent: "border-primary/20 bg-primary/[0.04]",
    iconStyle: "text-primary",
  },
  {
    icon: CreditCard,
    title: "Até 12x sem juros",
    description: "No cartão de crédito",
    rotation: "rotate-1",
    accent: "border-accent/20 bg-accent/[0.04]",
    iconStyle: "text-accent",
  },
  {
    icon: Shield,
    title: "Lista Garantida",
    description: "100% conforme a lista oficial",
    rotation: "-rotate-[0.5deg]",
    accent: "border-teal-500/20 bg-teal-500/[0.04]",
    iconStyle: "text-teal-600",
  },
  {
    icon: Headphones,
    title: "Atendimento Humano",
    description: "Suporte rápido pelo WhatsApp",
    rotation: "rotate-[0.8deg]",
    accent: "border-sky-400/20 bg-sky-400/[0.04]",
    iconStyle: "text-sky-500",
  },
];

export const TrustBadges = () => {
  return (
    <section className="py-4 -mt-3 relative z-10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {badges.map((badge, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 md:gap-3 border-2 ${badge.accent} rounded-lg p-3 md:p-4 transform ${badge.rotation} hover:rotate-0 transition-transform`}
            >
              <badge.icon className={`h-4 w-4 md:h-5 md:w-5 flex-shrink-0 ${badge.iconStyle}`} />
              <div className="min-w-0">
                <h4 className="font-bold text-xs md:text-sm leading-tight">{badge.title}</h4>
                <p className="text-[10px] md:text-[11px] text-muted-foreground leading-snug hidden sm:block">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
