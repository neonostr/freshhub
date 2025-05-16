
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HandednessProvider } from '@/context/HandednessContext';
import { ItemsProvider } from '@/context/ItemsContext';
import { IconManagerProvider } from '@/context/IconManager';
import { PaymentProvider } from '@/context/PaymentContext';
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HandednessProvider>
        <PaymentProvider>
          <ItemsProvider>
            <IconManagerProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </BrowserRouter>
            </IconManagerProvider>
          </ItemsProvider>
        </PaymentProvider>
      </HandednessProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
