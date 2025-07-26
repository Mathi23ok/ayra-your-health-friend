import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Check, X } from "lucide-react";

interface OfflineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineModal = ({ isOpen, onClose }: OfflineModalProps) => {
  const features = [
    {
      name: "Emergency Voice Calls",
      offline: true,
      description: "Call emergency contacts even without internet"
    },
    {
      name: "Medicine Reminders",
      offline: true,
      description: "Local notifications work offline"
    },
    {
      name: "Saved Medical History",
      offline: true,
      description: "Access previously saved health data"
    },
    {
      name: "Basic Health Tips",
      offline: true,
      description: "Pre-loaded wellness advice"
    },
    {
      name: "Hospital Appointments",
      offline: false,
      description: "Requires internet to call hospitals"
    },
    {
      name: "Live Wearable Sync",
      offline: false,
      description: "Real-time data needs connectivity"
    },
    {
      name: "AI Chat Responses",
      offline: false,
      description: "Advanced AI requires internet"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Offline & Online Features
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-3">
                <WifiOff className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-700 dark:text-green-300">Offline Mode</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">
                Essential health features work even in remote areas without internet.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-3">
                <Wifi className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-700 dark:text-blue-300">Online Mode</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Full AI power, real-time sync, and hospital connections.
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Feature Availability</h4>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{feature.name}</span>
                    <Badge variant={feature.offline ? "secondary" : "outline"} className="text-xs">
                      {feature.offline ? (
                        <><Check className="h-3 w-3 mr-1" />Offline</>
                      ) : (
                        <><X className="h-3 w-3 mr-1" />Online Only</>
                      )}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button onClick={onClose} className="w-full">
              Got it!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};