import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Project from "./pages/Project";
import Faith from "./pages/Faith";
import Contact from "./pages/Contact";
import EditorialPage from "./pages/EditorialPage";
import Agenda from "./pages/Agenda";
import PrayerRequest from "./pages/PrayerRequest";
import Join from "./pages/Join";
import Donations from "./pages/Donations";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AuthProvider } from "@/hooks/use-auth";
import { PAGES } from "@/data/pages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Páginas editoriais: Sobre, Vida da Igreja e Conteúdos */}
            {PAGES.map((page) => (
              <Route key={page.path} path={page.path} element={<EditorialPage />} />
            ))}

            <Route path="/agenda" element={<Agenda />} />
            <Route path="/pedido-de-oracao" element={<PrayerRequest />} />
            <Route path="/quero-fazer-parte" element={<Join />} />
            <Route path="/doacoes" element={<Donations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/nossa-fe" element={<Faith />} />
            <Route path="/project/:id" element={<Project />} />

            {/* Área autenticada */}
            <Route path="/entrar" element={<Auth />} />
            <Route path="/painel" element={<Dashboard />} />

            {/* Rotas antigas */}
            <Route path="/about" element={<Navigate to="/sobre/quem-somos" replace />} />
            <Route path="/contato" element={<Navigate to="/contact" replace />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
