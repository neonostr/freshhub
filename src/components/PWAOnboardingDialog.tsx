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
      <div className="bg-white rounded-2xl shadow-xl p-5 max-w-xs w-full text-center border border-gray-100">
        <h2 className="text-lg font-bold mb-1">Get the App</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Install FreshHub on your device for the best experience
        </p>
        <button
          className="w-full py-4 rounded-xl bg-[#0E1527] text-white font-bold text-base transition hover:bg-[#1a2236] mb-4"
          onClick={onInstallClick}
        >
          Get Started
        </button>
        <ul className="text-left text-gray-500 space-y-1 text-xs mb-2 mx-auto max-w-xs">
          <li>• Persistent data storage</li>
          <li>• Native app-like experience</li>
          <li>• Faster loading and offline access</li>
          <li>• Quick access from your home screen</li>
        </ul>
        <button
          className="mt-2 text-xs text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
};

export default PWAOnboardingDialog;