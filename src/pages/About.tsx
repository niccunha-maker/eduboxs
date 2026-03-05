import { Package, Users, Heart, Zap } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

const About = () => {
  usePageMeta({ title: "Sobre a EduBoxs", description: "Conheça a EduBoxs: kits escolares completos entregues direto na escola do seu filho." });
  return (
    <div className="notebook-lines" style={{ background: "hsl(var(--muted))" }}>
      <div className="container py-16 max-w-3xl">
        <div className="text-center mb-12 animate-fade-in">
          <span className="font-handwritten text-2xl text-accent font-bold block mb-2 transform -rotate-1">
            Nossa história
          </span>
          <h1 className="text-3xl font-bold mb-6">Sobre a EduBoxs</h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A EduBoxs nasceu em 2024 de uma necessidade real: simplificar a volta às
            aulas para as famílias. Sabemos como é corrido e estressante percorrer
            livrarias atrás de cada item da lista escolar. Por isso, montamos kits
            completos conforme a lista oficial do colégio e entregamos tudo
            organizado direto na escola.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Package, title: "Kits sob medida", desc: "Cada kit é montado conforme a lista oficial do colégio e da série do seu filho. Nada falta, nada sobra.", color: "text-primary", border: "border-primary/20", bg: "bg-primary/[0.06]" },
            { icon: Zap, title: "Entrega na escola", desc: "Entregamos direto no colégio antes do início das aulas. Sem filas, sem correria.", color: "text-accent", border: "border-accent/20", bg: "bg-accent/[0.06]" },
            { icon: Users, title: "Feito para famílias", desc: "Uma compra única substitui horas de pesquisa. Mais praticidade e mais tempo com quem importa.", color: "text-teal-600", border: "border-teal-500/20", bg: "bg-teal-500/[0.06]" },
            { icon: Heart, title: "Atendimento humano", desc: "Dúvidas? Fale com a gente pelo WhatsApp. Estamos sempre prontos para ajudar.", color: "text-sky-500", border: "border-sky-400/20", bg: "bg-sky-400/[0.06]" },
          ].map((item, i) => (
            <div key={i} className={`flex gap-4 ${item.bg} border-2 ${item.border} rounded-xl p-5 shadow-ink animate-fade-in stagger-${i + 1}`}>
              <div className={`h-10 w-10 rounded-lg ${item.bg} border-2 ${item.border} flex items-center justify-center flex-shrink-0`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
