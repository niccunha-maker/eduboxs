const testimonials = [
  {
    name: "Fernanda M.",
    role: "Mãe de 2 filhos",
    text: "Salvou minha vida! Não precisei perder um sábado inteiro correndo atrás de livraria. O kit chegou organizado direto na escola.",
    initials: "FM",
    color: "bg-primary",
    rotation: "-rotate-1",
    tapeColor: "bg-yellow-300/50",
  },
  {
    name: "Carlos R.",
    role: "Pai de 3 filhos",
    text: "Tenho 3 filhos em séries diferentes. A EduBoxs montou os 3 kits certinhos, cada um com a lista do colégio. Super recomendo!",
    initials: "CR",
    color: "bg-accent",
    rotation: "rotate-[0.8deg]",
    tapeColor: "bg-sky-300/50",
  },
  {
    name: "Ana Paula S.",
    role: "Mãe de 1 filho",
    text: "Preço justo, tudo conforme a lista e entregue na escola antes das aulas começarem. Ano que vem compro de novo com certeza!",
    initials: "AP",
    color: "bg-emerald-500",
    rotation: "-rotate-[0.5deg]",
    tapeColor: "bg-orange-300/50",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid" />

      <div className="container relative">
        <div className="text-center mb-14">
          <span className="font-handwritten text-2xl text-accent font-bold block mb-1 transform rotate-[-2deg]">
            De verdade!
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O Que Os Pais Dizem
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Milhares de famílias já simplificaram a volta às aulas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`relative bg-card border-2 border-border/60 rounded-xl p-7 shadow-ink hover:shadow-ink-lg hover:-translate-y-1 transition-all transform ${t.rotation} hover:rotate-0`}
            >
              {/* Washi tape decoration on top */}
              <div
                className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 ${t.tapeColor} rounded-sm transform -rotate-2 z-10`}
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4 mt-1" aria-label="5 estrelas">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="h-4 w-4 fill-accent text-accent" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote — handwritten style mixed with serif */}
              <p className="text-[15px] text-foreground/80 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              {/* Author — with dashed separator */}
              <div className="flex items-center gap-3 pt-4 border-t-2 border-dashed border-border/50">
                <div className={`h-10 w-10 rounded-lg ${t.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">{t.name}</p>
                  <p className="text-xs text-muted-foreground font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
