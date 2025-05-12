
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemsProvider } from '@/context/ItemsContext';
import { IconManagerProvider } from '@/context/IconManager';
import { HandednessProvider } from '@/context/HandednessContext';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a new query client with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HandednessProvider>
        <IconManagerProvider>
          <ItemsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ItemsProvider>
        </IconManagerProvider>
      </HandednessProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
