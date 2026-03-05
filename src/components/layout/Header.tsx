import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  LogOut,
  Package,
  MapPin,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useCartStore } from "@/stores/cart-store";
import { useState } from "react";

export const Header = () => {
  const { user, signOut } = useAuth();
  const { data: isAdmin } = useAdminCheck(user?.id);
  const totalItems = useCartStore((s) => s.totalItems());
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/kits", label: "Kits Escolares" },
    { href: "/sobre", label: "Sobre" },
    { href: "/perguntas-frequentes", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/8 bg-background/90 backdrop-blur-xl" role="banner">
      <div className="container flex h-[68px] items-center justify-between">
        {/* Logo — looks like a hand-stamped school logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="h-11 w-11 rounded-lg bg-primary flex items-center justify-center shadow-ink group-hover:shadow-ink-lg transition-shadow transform group-hover:-rotate-2 transition-transform">
              <span className="text-primary-foreground font-extrabold text-lg font-serif-accent tracking-tight">E</span>
            </div>
            {/* Small accent dot */}
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif-accent text-xl tracking-tight">
              Edu<span className="text-primary font-bold">Boxs</span>
            </span>
            <span className="font-handwritten text-xs text-accent font-semibold -mt-0.5">
              kits escolares
            </span>
          </div>
        </Link>

        {/* Desktop Nav — tab-like links */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-primary border-b-2 border-transparent hover:border-primary/40 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Cart — looks like a sticker */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-lg hover:bg-primary/5 hover:-rotate-2 transition-all"
            onClick={() => navigate("/carrinho")}
            aria-label={`Carrinho${totalItems > 0 ? ` (${totalItems} itens)` : ""}`}
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center rounded-full text-[10px] font-extrabold bg-accent text-accent-foreground px-1 shadow-sm transform rotate-3">
                {totalItems}
              </span>
            )}
          </Button>

          {/* User menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-primary/5">
                  <User className="h-[18px] w-[18px]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5 shadow-ink-lg border-2 border-border">
                <DropdownMenuItem onClick={() => navigate("/minha-conta")} className="rounded-lg font-medium">
                  <User className="mr-2.5 h-4 w-4 text-primary/60" />
                  Minha Conta
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/meus-pedidos")} className="rounded-lg font-medium">
                  <Package className="mr-2.5 h-4 w-4 text-primary/60" />
                  Meus Pedidos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/meus-enderecos")} className="rounded-lg font-medium">
                  <MapPin className="mr-2.5 h-4 w-4 text-primary/60" />
                  Endereços
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="rounded-lg font-medium">
                      <LayoutDashboard className="mr-2.5 h-4 w-4 text-primary/60" />
                      Painel Admin
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="rounded-lg text-destructive focus:text-destructive font-medium">
                  <LogOut className="mr-2.5 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate("/entrar")}
              className="hidden md:inline-flex rounded-lg bg-primary hover:bg-primary/90 shadow-ink hover:shadow-ink-lg transition-all px-5 font-bold transform hover:-rotate-1"
            >
              Entrar
            </Button>
          )}

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 rounded-lg">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b-2 border-border notebook-lines">
                  <span className="font-serif-accent text-xl">
                    Edu<span className="text-primary font-bold">Boxs</span>
                  </span>
                </div>
                <nav className="flex flex-col gap-1 p-4 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-semibold px-4 py-3 rounded-lg hover:bg-primary/5 border-l-3 border-transparent hover:border-primary transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                {!user && (
                  <div className="p-4 border-t-2 border-border">
                    <Button
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/entrar");
                      }}
                      className="w-full rounded-lg font-bold shadow-ink"
                      size="lg"
                    >
                      Entrar
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
