import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MedicalHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicalHistoryModal = ({ isOpen, onClose }: MedicalHistoryModalProps) => {
  const [medicalHistory, setMedicalHistory] = useState("");
  const [allergies, setAllergies] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    // Save to localStorage for demo
    localStorage.setItem('ayra_medical_history', JSON.stringify({
      history: medicalHistory,
      allergies: allergies,
      timestamp: new Date().toISOString()
    }));
    
    toast({
      title: "Medical history saved!",
      description: "Ayra will use this information to provide better health advice.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical History
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Previous Medical Conditions</label>
            <Textarea
              placeholder="Diabetes, hypertension, surgeries, etc."
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              rows={3}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Allergies & Medications</label>
            <Textarea
              placeholder="Food allergies, drug reactions, current medications..."
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Upload medical reports (PDF/Images)</p>
            <p className="text-xs text-muted-foreground mt-1">Coming soon - AI will analyze your reports</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save History
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};