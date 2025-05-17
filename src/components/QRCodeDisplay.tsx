
import React from 'react';
import QRCode from 'qrcode.react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  renderAs?: 'svg' | 'canvas';
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 200,
  renderAs = 'svg'
}) => {
  if (!value) {
    return <div className="text-center text-red-500">No data to display QR code</div>;
  }

  return (
    <div className="flex justify-center">
      <QRCode
        value={value}
        size={size}
        renderAs={renderAs}
        level="M"
        includeMargin={true}
        className="border rounded p-2 bg-white"
      />
    </div>
  );
};

export default QRCodeDisplay;
