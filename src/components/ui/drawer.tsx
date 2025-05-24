
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Drawer = ({
  shouldScaleBackground = false,
  // Changed default to false
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />;
Drawer.displayName = "Drawer";
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>>(({
  className,
  ...props
}, ref) => {
  // Add state to track if PWA has stabilized
  const [isStable, setIsStable] = React.useState(false);
  
  React.useEffect(() => {
    // Wait for PWA to stabilize after installation
    const timer = setTimeout(() => {
      setIsStable(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DrawerPrimitive.Overlay 
      ref={ref} 
      className={cn("fixed inset-0 z-50 bg-black/60", className)} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        touchAction: 'none',
        // Prevent any layout shifts during PWA init
        transform: isStable ? 'none' : 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }} 
      {...props} 
    />
  );
});
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const sheetVariants = cva("fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
    }
  },
  defaultVariants: {
    side: "right"
  }
});

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>, VariantProps<typeof sheetVariants> {}

const DrawerContent = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Content>, SheetContentProps>(({
  side = "bottom",
  className,
  children,
  ...props
}, ref) => {
  // Add state to handle PWA stabilization
  const [isPWAReady, setIsPWAReady] = React.useState(false);
  
  React.useEffect(() => {
    // Check if we're in PWA mode and wait for stabilization
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                  (window.navigator as any).standalone === true ||
                  document.referrer.includes('android-app://');
    
    if (isPWA) {
      // Wait longer for PWA to stabilize
      const timer = setTimeout(() => {
        setIsPWAReady(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsPWAReady(true);
    }
  }, []);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content 
        ref={ref} 
        className={cn(sheetVariants({ side }), className)} 
        style={{
          position: 'fixed',
          touchAction: 'none',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          // Enhanced PWA stability
          transform: isPWAReady ? 'none' : 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          // Ensure proper positioning in PWA
          zIndex: 51,
          willChange: 'auto'
        }} 
        {...props}
      >
        <div 
          className="p-6"
          style={{
            touchAction: 'pan-y',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            // Prevent content from jumping
            minHeight: '200px',
            position: 'relative'
          }}
        >
          {children}
        </div>
        <DrawerPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          
          <span className="sr-only">Close</span>
        </DrawerPrimitive.Close>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = DrawerPrimitive.Content.displayName;

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />;
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />;
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>>(({
  className,
  ...props
}, ref) => <DrawerPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>>(({
  className,
  ...props
}, ref) => <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />);
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription };
