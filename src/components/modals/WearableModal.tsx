import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Activity, Droplets, Thermometer } from "lucide-react";

interface WearableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WearableModal = ({ isOpen, onClose }: WearableModalProps) => {
  const [heartRate, setHeartRate] = useState(72);
  const [steps, setSteps] = useState(8234);
  const [bloodOxygen, setBloodOxygen] = useState(98);
  const [temperature, setTemperature] = useState(98.6);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setHeartRate(prev => prev + Math.floor(Math.random() * 6) - 3);
      setSteps(prev => prev + Math.floor(Math.random() * 10));
      setBloodOxygen(prev => Math.max(95, Math.min(100, prev + Math.floor(Math.random() * 2) - 1)));
      setTemperature(prev => +(prev + (Math.random() - 0.5) * 0.2).toFixed(1));
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const vitals = [
    {
      icon: Heart,
      label: "Heart Rate",
      value: `${heartRate}`,
      unit: "bpm",
      color: "text-red-500",
      normal: heartRate >= 60 && heartRate <= 100
    },
    {
      icon: Activity,
      label: "Steps Today",
      value: steps.toLocaleString(),
      unit: "steps",
      color: "text-blue-500",
      normal: steps >= 5000
    },
    {
      icon: Droplets,
      label: "Blood Oxygen",
      value: `${bloodOxygen}`,
      unit: "%",
      color: "text-teal-500",
      normal: bloodOxygen >= 95
    },
    {
      icon: Thermometer,
      label: "Body Temp",
      value: `${temperature}`,
      unit: "°F",
      color: "text-orange-500",
      normal: temperature >= 97.0 && temperature <= 99.5
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Health Vitals Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {vitals.map((vital, index) => {
              const Icon = vital.icon;
              return (
                <Card key={index} className={`border-l-4 ${vital.normal ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-4 w-4 ${vital.color}`} />
                      <span className="text-sm font-medium">{vital.label}</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {vital.value}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {vital.unit}
                      </span>
                    </div>
                    <div className={`text-xs ${vital.normal ? 'text-green-600' : 'text-red-600'}`}>
                      {vital.normal ? 'Normal' : 'Abnormal'}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">🔗 Connected Devices</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>• Apple Watch Series 9 ✅</div>
              <div>• Fitbit Charge 5 ✅</div>
              <div>• Pulse Oximeter (demo mode)</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Ayra monitors your vitals 24/7 and will alert emergency contacts if needed.
            </p>
            <Button onClick={onClose} className="w-full">
              Close Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};