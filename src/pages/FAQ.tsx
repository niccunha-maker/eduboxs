import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePageMeta } from "@/hooks/usePageMeta";

const faqs = [
  {
    question: "Como funciona a EduBoxs?",
    answer:
      "Você seleciona o colégio e a série do seu filho, compra o kit e nós cuidamos do resto. Montamos o kit com todos os materiais da lista oficial e entregamos organizado direto na escola, antes do início das aulas.",
  },
  {
    question: "Os materiais são originais?",
    answer:
      "Sim! Trabalhamos apenas com materiais originais e de primeira linha, adquiridos diretamente dos distribuidores oficiais.",
  },
  {
    question: "Posso parcelar o pagamento?",
    answer:
      "Sim! Aceitamos pagamento via Mercado Pago com parcelamento em até 12x no cartão de crédito. Também aceitamos Pix e boleto.",
  },
  {
    question: "Onde o kit é entregue?",
    answer:
      "Entregamos direto na escola do seu filho, antes do início das aulas. O aluno já começa o ano letivo com tudo organizado e pronto para usar.",
  },
  {
    question: "E se faltar algum item no kit?",
    answer:
      "Cada kit é montado conforme a lista oficial do colégio, então raramente isso acontece. Mas se houver qualquer problema, entraremos em contato para resolver com substituição ou reembolso.",
  },
  {
    question: "Como faço para devolver ou trocar?",
    answer:
      "Você tem até 7 dias após o recebimento para solicitar a devolução. Entre em contato pelo WhatsApp que resolvemos rapidamente.",
  },
  {
    question: "Posso comprar para mais de um filho?",
    answer:
      "Claro! Basta adicionar os kits de cada série ao carrinho. Cada kit é montado individualmente conforme a lista do colégio.",
  },
];

const FAQ = () => {
  usePageMeta({ title: "Perguntas Frequentes", description: "Tire suas dúvidas sobre a EduBoxs, kits escolares, entrega na escola e formas de pagamento." });
  return (
    <div className="container py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2 text-center">Perguntas Frequentes</h1>
      <p className="text-muted-foreground text-center mb-8">
        Tire suas dúvidas sobre a EduBoxs
      </p>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
