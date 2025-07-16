import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Examinations from "./pages/Examinations";
import Prescriptions from "./pages/Prescriptions";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Telehealth from "./pages/Telehealth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/patients" element={<Layout><Patients /></Layout>} />
          <Route path="/appointments" element={<Layout><Appointments /></Layout>} />
          <Route path="/examinations" element={<Layout><Examinations /></Layout>} />
          <Route path="/prescriptions" element={<Layout><Prescriptions /></Layout>} />
          <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/users" element={<Layout><Users /></Layout>} />
          <Route path="/telehealth" element={<Layout><Telehealth /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
