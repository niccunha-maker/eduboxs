import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  // TODO: Replace with real metrics from useAdminMetrics hook
  const metrics = [
    { icon: ShoppingCart, label: "Pedidos", value: "0", href: "/admin/pedidos" },
    { icon: Package, label: "Produtos", value: "0", href: "/admin/produtos" },
    { icon: Users, label: "Clientes", value: "0", href: "#" },
    { icon: DollarSign, label: "Receita", value: "R$ 0,00", href: "#" },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((m, i) => (
          <Link key={i} to={m.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{m.label}</p>
                    <p className="text-2xl font-bold mt-1">{m.value}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <m.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acoes Rapidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/produtos/novo">
                <Package className="mr-2 h-4 w-4" />
                Cadastrar Produto
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/pedidos">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Ver Pedidos
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/categorias">
                <Package className="mr-2 h-4 w-4" />
                Gerenciar Categorias
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/cupons">
                <Ticket className="mr-2 h-4 w-4" />
                Cupons de Desconto
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Nenhum pedido recente. Os pedidos aparecerão aqui quando os clientes começarem a comprar.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
