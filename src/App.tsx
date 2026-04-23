import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import LoginPage from "@/pages/LoginPage";
import ProfilePage from '@/pages/ProfilePage';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import BulkOrdersPage from "@/pages/BulkOrdersPage";
import CompanyPage from "@/pages/CompanyPage";
import StoresPage from "@/pages/StoresPage";
import ContactPage from "@/pages/ContactPage";
import CheckoutPage from "@/pages/CheckoutPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
     <AuthProvider> 
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CartDrawer />
          <Routes>
            <Route element={<Layout />}>
              
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/bulk-orders" element={<BulkOrdersPage />} />
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/stores" element={<StoresPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
    </AuthProvider> 
  </QueryClientProvider>
);

export default App;
