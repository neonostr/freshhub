
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useIconManager } from '@/context/IconManager';
import { IconOptionExtended } from '@/types/iconTypes';

interface ItemIconProps {
  iconId: string;
}

const ItemIcon: React.FC<ItemIconProps> = ({ iconId }) => {
  const { allIcons } = useIconManager();
  
  const renderIcon = () => {
    // Try to get the icon from our icon manager
    if (iconId in allIcons) {
      const iconData = allIcons[iconId];
      
      // For custom products, we need to create the icon from the stored name
      // Check if iconData is of type IconOptionExtended (which has iconName)
      if ('iconName' in iconData && (iconData as IconOptionExtended).iconName) {
        // Get icon name from the iconData object
        const iconName = (iconData as IconOptionExtended).iconName;
        
        // Convert to PascalCase for Lucide component lookup
        const pascalCaseName = iconName.charAt(0).toUpperCase() + 
          iconName.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
        
        // Get the component from Lucide
        const IconComponent = (LucideIcons as any)[pascalCaseName];
        if (IconComponent) {
          return <IconComponent size={20} />;
        }
      }
      
      // If it's not a custom product or we couldn't find the icon by name
      if (React.isValidElement(iconData.icon)) {
        return React.cloneElement(iconData.icon as React.ReactElement, { size: 20 });
      }
    }
    
    // If the icon isn't found, show a placeholder
    return <div className="flex items-center justify-center w-5 h-5">?</div>;
  };

  return (
    <div className="p-2 bg-gray-100 rounded-full flex items-center justify-center w-9 h-9">
      {renderIcon()}
    </div>
  );
};

export default ItemIcon;
