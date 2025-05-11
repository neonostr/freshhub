
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a persistent query client with optimized caching for PWA
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (renamed from cacheTime)
      retry: 1,
    },
  },
});

const App = () => {
  const [isPwa, setIsPwa] = useState(false);
  
  // Detect if running as PWA
  useEffect(() => {
    const isPwaMode = window.matchMedia('(display-mode: standalone)').matches;
    setIsPwa(isPwaMode);
    
    // Preload critical resources for PWA
    if (isPwaMode) {
      // Register resources for fast reloads
      if ('caches' in window) {
        // Pre-warm the cache
        caches.open('fresh-tracker-v3');
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className={isPwa ? "pwa-scroll-hidden" : ""}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
