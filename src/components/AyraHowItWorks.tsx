import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Brain, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "You Talk",
    description: "Share your health concerns, symptoms, or questions with Ayra in natural conversation - just like talking to a caring friend."
  },
  {
    number: "02", 
    icon: Brain,
    title: "Ayra Responds",
    description: "Ayra analyzes your input using advanced AI, considers your medical history, and provides empathetic, personalized guidance."
  },
  {
    number: "03",
    icon: Zap,
    title: "Ayra Acts",
    description: "From booking appointments to alerting family members, Ayra takes action to ensure you get the care and support you need."
  }
];

export const AyraHowItWorks = () => {
  return (
    <section className="py-20 ayra-gradient-soft">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How <span className="ayra-gradient-accent bg-clip-text text-transparent">Ayra</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Simple, intuitive, and designed with care - getting help has never been easier.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="ayra-shadow-soft hover:ayra-shadow-warm ayra-transition hover:scale-105 border-primary/20 h-full">
                  <CardContent className="p-8 text-center relative">
                    <div className="text-6xl font-bold text-primary/20 absolute top-4 right-6">
                      {step.number}
                    </div>
                    <div className="ayra-gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ayra-shadow-soft">
                      <Icon className="w-8 h-8 text-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center ayra-shadow-soft">
                      <div className="w-4 h-4 border-t-2 border-r-2 border-foreground/40 transform rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm ayra-shadow-soft">
            <div className="w-12 h-12 rounded-full ayra-gradient-accent flex items-center justify-center">
              <Zap className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-foreground">Available 24/7</h4>
              <p className="text-sm text-muted-foreground">Ayra is always here when you need support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};