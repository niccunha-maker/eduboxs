import { HeroBanner } from "@/components/home/HeroBanner";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedKits } from "@/components/home/FeaturedKits";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CallToAction } from "@/components/home/CallToAction";
import { usePageMeta } from "@/hooks/usePageMeta";

const Index = () => {
  usePageMeta({ title: "Kit Escolar Completo Entregue na Escola", description: "Kit escolar completo conforme a lista do colégio, entregue direto na escola. Simplifique a volta às aulas do seu filho." });
  return (
    <>
      <HeroBanner />
      <TrustBadges />
      <FeaturedKits />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Index;
