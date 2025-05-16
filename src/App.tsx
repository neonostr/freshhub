
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HandednessProvider } from '@/context/HandednessContext';
import { ItemsProvider } from '@/context/ItemsContext';
import { IconManagerProvider } from '@/context/IconManager';
import { Toaster } from "@/components/ui/toaster";
import { InstallPromptProvider } from "@/context/InstallPromptContext";
import { InstallBanner } from "@/components/InstallBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HandednessProvider>
        <ItemsProvider>
          <IconManagerProvider>
            <InstallPromptProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <InstallBanner />
                <Toaster />
              </BrowserRouter>
            </InstallPromptProvider>
          </IconManagerProvider>
        </ItemsProvider>
      </HandednessProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
