
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useIconManager, ALL_ICONS } from '@/context/IconManagerContext';
import { ScrollArea } from "@/components/ui/scroll-area";

const IconManagerDialog: React.FC = () => {
  const { toggleIcon, isIconSelected } = useIconManager();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="absolute top-6 right-6 rounded-full">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Icons</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Select the icons you want available when adding new items.
            You must select at least one icon.
          </p>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-3 gap-2">
              {Object.values(ALL_ICONS).map((icon) => (
                <Button
                  key={icon.value}
                  type="button"
                  variant={isIconSelected(icon.value) ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 py-2"
                  onClick={() => {
                    // Prevent deselecting if it's the last selected icon
                    if (isIconSelected(icon.value)) {
                      const atLeastOneLeft = Object.keys(ALL_ICONS).some(
                        key => key !== icon.value && isIconSelected(key)
                      );
                      if (atLeastOneLeft) {
                        toggleIcon(icon.value);
                      }
                    } else {
                      toggleIcon(icon.value);
                    }
                  }}
                >
                  {icon.icon}
                  <span className="text-xs mt-1">{icon.label}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <DialogClose asChild>
          <Button type="button">Done</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default IconManagerDialog;
