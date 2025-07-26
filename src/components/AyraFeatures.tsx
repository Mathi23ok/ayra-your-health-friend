import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mic, 
  Wifi, 
  FileText, 
  Calendar, 
  Watch, 
  AlertTriangle,
  Heart,
  Brain,
  Utensils,
  Pill
} from "lucide-react";
import { AyraChat } from "@/components/AyraChat";
import { MedicalHistoryModal } from "@/components/modals/MedicalHistoryModal";
import { AppointmentModal } from "@/components/modals/AppointmentModal";
import { WearableModal } from "@/components/modals/WearableModal";
import { ReminderModal } from "@/components/modals/ReminderModal";
import { OfflineModal } from "@/components/modals/OfflineModal";
import { EmergencyContacts } from "@/components/EmergencyContacts";

const features = [
  {
    icon: Mic,
    title: "Voice-First AI",
    description: "Natural conversations with Ayra's warm, caring voice - just like talking to a trusted friend who understands your health concerns.",
    gradient: "ayra-gradient-primary",
    action: "chat"
  },
  {
    icon: Wifi,
    title: "Online & Offline",
    description: "Ayra works everywhere - from remote villages without internet to busy city hospitals. Your health companion never leaves your side.",
    gradient: "ayra-gradient-accent",
    action: "offline"
  },
  {
    icon: FileText,
    title: "Medical History Analysis",
    description: "Smart analysis of your health records, symptoms, and patterns to provide personalized insights and recommendations.",
    gradient: "ayra-gradient-primary",
    action: "medical-history"
  },
  {
    icon: Calendar,
    title: "Hospital Appointments",
    description: "Ayra speaks directly with hospitals to book your appointments, handle scheduling, and ensure you get the care you need.",
    gradient: "ayra-gradient-accent",
    action: "appointment"
  },
  {
    icon: Watch,
    title: "Wearable Integration",
    description: "Seamlessly connects with your smartwatch and health devices to monitor vitals and provide real-time health insights.",
    gradient: "ayra-gradient-primary",
    action: "wearable"
  },
  {
    icon: AlertTriangle,
    title: "Emergency Alerts",
    description: "Instant alerts to family members and emergency contacts when critical health situations are detected.",
    gradient: "ayra-gradient-accent",
    action: "emergency"
  },
  {
    icon: Brain,
    title: "AI Health Assistant",
    description: "Advanced AI trained on medical knowledge to answer health questions and provide personalized wellness guidance.",
    gradient: "ayra-gradient-primary",
    action: "chat"
  },
  {
    icon: Utensils,
    title: "Custom Diet Plans",
    description: "Personalized nutrition plans based on your health conditions, preferences, and goals for optimal wellness.",
    gradient: "ayra-gradient-accent",
    action: "diet"
  },
  {
    icon: Pill,
    title: "Medicine Reminders",
    description: "Never miss a dose with smart medication reminders and tracking for better treatment adherence.",
    gradient: "ayra-gradient-primary",
    action: "reminder"
  }
];

export const AyraFeatures = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [medicalHistoryOpen, setMedicalHistoryOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [wearableOpen, setWearableOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [offlineOpen, setOfflineOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const handleFeatureClick = (action: string) => {
    switch (action) {
      case "chat":
        setIsChatOpen(true);
        break;
      case "medical-history":
        setMedicalHistoryOpen(true);
        break;
      case "appointment":
        setAppointmentOpen(true);
        break;
      case "wearable":
        setWearableOpen(true);
        break;
      case "reminder":
        setReminderOpen(true);
        break;
      case "offline":
        setOfflineOpen(true);
        break;
      case "emergency":
        setEmergencyOpen(true);
        break;
      case "diet":
        // Future implementation
        alert("Diet planning feature coming soon! 🥗");
        break;
      default:
        break;
    }
  };

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            What Can <span className="ayra-gradient-primary bg-clip-text text-transparent">Ayra</span> Do?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ayra combines cutting-edge AI technology with genuine empathy to transform how you experience healthcare.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="ayra-shadow-soft hover:ayra-shadow-warm ayra-transition hover:scale-105 border-primary/20 group cursor-pointer"
                onClick={() => handleFeatureClick(feature.action)}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${feature.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 ayra-transition`}>
                    <Icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 ayra-transition">
                    Click to try →
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Heart className="w-5 h-5 text-secondary fill-current" />
            <span className="italic">Built with love for better healthcare accessibility</span>
            <Heart className="w-5 h-5 text-secondary fill-current" />
          </div>
        </div>
      </div>

      {/* Modals */}
      <AyraChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <MedicalHistoryModal isOpen={medicalHistoryOpen} onClose={() => setMedicalHistoryOpen(false)} />
      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <WearableModal isOpen={wearableOpen} onClose={() => setWearableOpen(false)} />
      <ReminderModal isOpen={reminderOpen} onClose={() => setReminderOpen(false)} />
      <OfflineModal isOpen={offlineOpen} onClose={() => setOfflineOpen(false)} />
      
      {/* Emergency Contact inline */}
      {emergencyOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
            <EmergencyContacts />
            <button 
              onClick={() => setEmergencyOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};