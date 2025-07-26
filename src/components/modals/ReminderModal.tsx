import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pill, Clock, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReminderModal = ({ isOpen, onClose }: ReminderModalProps) => {
  const [medicineName, setMedicineName] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const { toast } = useToast();

  const handleSetReminder = () => {
    // Save reminder to localStorage for demo
    const reminder = {
      id: Date.now(),
      medicine: medicineName,
      time,
      frequency,
      duration,
      created: new Date().toISOString()
    };
    
    const existingReminders = JSON.parse(localStorage.getItem('ayra_reminders') || '[]');
    existingReminders.push(reminder);
    localStorage.setItem('ayra_reminders', JSON.stringify(existingReminders));
    
    toast({
      title: "Reminder set! 💊",
      description: `Ayra will remind you to take ${medicineName} at ${time} ${frequency}`,
    });
    
    // Simulate immediate reminder
    setTimeout(() => {
      toast({
        title: "🔔 Medicine Reminder",
        description: `Time to take your ${medicineName}!`,
        action: (
          <Button size="sm" variant="outline">
            <Bell className="h-4 w-4 mr-1" />
            Taken
          </Button>
        ),
      });
    }, 5000);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Medicine Reminder
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Medicine Name</label>
            <Input
              placeholder="e.g., Metformin, Aspirin, Vitamin D"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Time</label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Frequency</label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="How often?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once-daily">Once daily</SelectItem>
                <SelectItem value="twice-daily">Twice daily</SelectItem>
                <SelectItem value="three-times">Three times daily</SelectItem>
                <SelectItem value="as-needed">As needed</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Duration</label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="For how long?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7-days">7 days</SelectItem>
                <SelectItem value="14-days">14 days</SelectItem>
                <SelectItem value="30-days">30 days</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Smart Reminders</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Ayra will send notifications, track missed doses, and remind family if you don't respond.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSetReminder} className="flex-1" disabled={!medicineName || !time}>
              Set Reminder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};