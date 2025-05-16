
import React from 'react';
import { Button } from '@/components/ui/button';
import { useInstallPrompt } from '@/context/InstallPromptContext';
import { useToast } from '@/hooks/use-toast';

interface InstallButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export const InstallButton: React.FC<InstallButtonProps> = ({ 
  variant = "outline",
  className
}) => {
  const { 
    deferredPrompt, 
    promptInstall, 
    isPlatformIOS, 
    isAppInstalled
  } = useInstallPrompt();
  const { toast } = useToast();

  // If already installed or no install prompt available and not iOS, don't show the button
  if (isAppInstalled || (!deferredPrompt && !isPlatformIOS)) {
    return null;
  }

  const handleClick = () => {
    if (isPlatformIOS) {
      // For iOS, show instructions in a toast
      toast({
        title: "Install on iOS",
        description: "Tap the share icon and then 'Add to Home Screen' to install the app.",
        duration: 5000,
      });
    } else if (deferredPrompt) {
      // For other platforms with available prompt
      promptInstall();
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleClick}
      title="Install app"
    >
      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L8 8M12 4L16 8M12 4V16M6 12H18M5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Install App
    </Button>
  );
};
