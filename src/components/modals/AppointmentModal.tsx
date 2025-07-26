import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Phone, MapPin, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal = ({ isOpen, onClose }: AppointmentModalProps) => {
  const [hospitalName, setHospitalName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const { toast } = useToast();

  const handleBookAppointment = () => {
    // Demo booking logic
    toast({
      title: "Appointment request sent!",
      description: `Ayra is contacting ${hospitalName} for ${specialty} appointment on ${preferredDate}`,
    });
    
    // Simulate booking confirmation
    setTimeout(() => {
      toast({
        title: "Appointment confirmed! 🎉",
        description: "Tomorrow 2:30 PM - Dr. Smith at City Hospital. Pay ₹500 consultation fee.",
        action: (
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <CreditCard className="h-4 w-4 mr-1" />
            Pay Now
          </Button>
        ),
      });
    }, 3000);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Book Hospital Appointment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Hospital Name</label>
            <Input
              placeholder="e.g., City Hospital, Apollo, etc."
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Specialty</label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Choose specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Medicine</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="orthopedic">Orthopedic</SelectItem>
                <SelectItem value="gynecology">Gynecology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Preferred Date</label>
            <Input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
            />
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">How it works:</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Ayra will call the hospital, check availability, and confirm your appointment. 
              You'll get SMS confirmation + payment link.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleBookAppointment} className="flex-1" disabled={!hospitalName || !specialty}>
              Book Appointment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};