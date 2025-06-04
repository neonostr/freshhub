
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HandednessProvider } from '@/context/HandednessContext';
import { ItemsProvider } from '@/context/ItemsContext';
import { IconManagerProvider } from '@/context/IconManager';
import { Toaster } from "@/components/ui/toaster";
import { SubscriptionProvider } from '@/context/SubscriptionContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HandednessProvider>
        <SubscriptionProvider>
          <ItemsProvider>
            <IconManagerProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/app" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </BrowserRouter>
            </IconManagerProvider>
          </ItemsProvider>
        </SubscriptionProvider>
      </HandednessProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
