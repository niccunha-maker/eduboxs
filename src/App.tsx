import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { AdminRoute } from "@/components/layout/AdminRoute";
import { PageTransition } from "@/components/layout/PageTransition";

import Index from "@/pages/Index";
import Catalog from "@/pages/Catalog";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Profile from "@/pages/Profile";
import MyOrders from "@/pages/MyOrders";
import OrderDetail from "@/pages/OrderDetail";
import MyAddresses from "@/pages/MyAddresses";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import TermsOfUse from "@/pages/TermsOfUse";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import NotFound from "@/pages/NotFound";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminProductForm from "@/pages/admin/AdminProductForm";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminCategories from "@/pages/admin/AdminCategories";
import AdminCoupons from "@/pages/admin/AdminCoupons";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <PageTransition>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/kits" element={<Catalog />} />
              <Route path="/kits/:slug" element={<ProductDetail />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/perguntas-frequentes" element={<FAQ />} />
              <Route path="/termos-de-uso" element={<TermsOfUse />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="/carrinho" element={<Cart />} />

              {/* Auth */}
              <Route path="/entrar" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/esqueci-senha" element={<ForgotPassword />} />

              {/* Protected */}
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/minha-conta" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/meus-pedidos" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              <Route path="/meus-pedidos/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
              <Route path="/meus-enderecos" element={<ProtectedRoute><MyAddresses /></ProtectedRoute>} />

              {/* Admin */}
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/produtos" element={<AdminRoute><AdminProducts /></AdminRoute>} />
              <Route path="/admin/produtos/novo" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
              <Route path="/admin/produtos/:id/editar" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
              <Route path="/admin/pedidos" element={<AdminRoute><AdminOrders /></AdminRoute>} />
              <Route path="/admin/categorias" element={<AdminRoute><AdminCategories /></AdminRoute>} />
              <Route path="/admin/cupons" element={<AdminRoute><AdminCoupons /></AdminRoute>} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </PageTransition>
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
