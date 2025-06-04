
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/usePWA';
import PWAInstallInstructions from './PWAInstallInstructions';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
}) => {
  const { isRunningAsPwa, isInstallable, promptInstall } = usePWA();
  const [showInstructions, setShowInstructions] = useState(false);

  // Don't render if already running as PWA
  if (isRunningAsPwa) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await promptInstall();
      if (!success) {
        // If user declined or prompt failed, show instructions
        setShowInstructions(true);
      }
    } else {
      // If not installable via prompt, show instructions
      setShowInstructions(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleInstallClick}
        variant={variant}
        size={size}
        className={className}
      >
        Install App
      </Button>

      <PWAInstallInstructions
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </>
  );
};

export default PWAInstallButton;
