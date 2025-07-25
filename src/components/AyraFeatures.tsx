import { Card, CardContent } from "@/components/ui/card";
import { 
  Mic, 
  Wifi, 
  WifiOff, 
  FileText, 
  Calendar, 
  Watch, 
  AlertTriangle,
  Heart
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice-First AI",
    description: "Natural conversations with Ayra's warm, caring voice - just like talking to a trusted friend who understands your health concerns.",
    gradient: "ayra-gradient-primary"
  },
  {
    icon: Wifi,
    title: "Online & Offline",
    description: "Ayra works everywhere - from remote villages without internet to busy city hospitals. Your health companion never leaves your side.",
    gradient: "ayra-gradient-accent"
  },
  {
    icon: FileText,
    title: "Medical History Analysis",
    description: "Smart analysis of your health records, symptoms, and patterns to provide personalized insights and recommendations.",
    gradient: "ayra-gradient-primary"
  },
  {
    icon: Calendar,
    title: "Hospital Appointments",
    description: "Ayra speaks directly with hospitals to book your appointments, handle scheduling, and ensure you get the care you need.",
    gradient: "ayra-gradient-accent"
  },
  {
    icon: Watch,
    title: "Wearable Integration",
    description: "Seamlessly connects with your smartwatch and health devices to monitor vitals and provide real-time health insights.",
    gradient: "ayra-gradient-primary"
  },
  {
    icon: AlertTriangle,
    title: "Emergency Alerts",
    description: "Instant alerts to family members and emergency contacts when critical health situations are detected.",
    gradient: "ayra-gradient-accent"
  }
];

export const AyraFeatures = () => {
  return (
    <section className="py-20 bg-background">
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
                className="ayra-shadow-soft hover:ayra-shadow-warm ayra-transition hover:scale-105 border-primary/20 group"
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
    </section>
  );
};