import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

const NotFound = () => {
  usePageMeta({ title: "Página Não Encontrada" });
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl font-semibold mb-2">Página não encontrada</p>
      <p className="text-muted-foreground mb-8">
        A página que você procura não existe ou foi removida.
      </p>
      <Button asChild>
        <Link to="/">
          <Home className="mr-2 h-4 w-4" />
          Voltar ao Início
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
