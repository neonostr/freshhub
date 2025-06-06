import React from 'react';

interface PWAOnboardingDialogProps {
  open: boolean;
  onClose: () => void;
  onInstallClick: () => void;
}

const PWAOnboardingDialog: React.FC<PWAOnboardingDialogProps> = ({
  open,
  onClose,
  onInstallClick,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Get the App</h2>
        <p className="text-gray-600 mb-6">
          Install FreshHub on your device for the best experience
        </p>
   <button
  className="w-full py-4 rounded-xl bg-[#0E1527] text-white font-bold text-lg transition hover:bg-[#1a2236]"
  onClick={onInstallClick}
>
          Install App
        </button>
        <ul className="text-left text-gray-500 space-y-2 text-base">
          <li>• Persistent data storage</li>
          <li>• Native app-like experience</li>
          <li>• Faster loading and offline access</li>
          <li>• Quick access from your home screen</li>
        </ul>
        <button
          className="mt-6 text-sm text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
};

export default PWAOnboardingDialog;