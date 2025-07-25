import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, MapPin, Shield } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Empathy First",
    description: "Ayra doesn't just process data - she understands emotions, listens with care, and responds with genuine compassion to your health concerns.",
    color: "text-red-400"
  },
  {
    icon: Users,
    title: "Accessibility for All", 
    description: "Designed for everyone - from elderly grandparents to busy college students. Ayra speaks your language and adapts to your needs.",
    color: "text-blue-400"
  },
  {
    icon: MapPin,
    title: "Rural Health Impact",
    description: "Bringing expert healthcare guidance to remote areas where medical facilities are scarce. No one should be left behind.",
    color: "text-green-400"
  },
  {
    icon: Shield,
    title: "Privacy & Trust",
    description: "Your health data is sacred. Ayra uses advanced encryption and follows strict privacy protocols to keep your information secure.",
    color: "text-purple-400"
  }
];

export const AyraWhyChoose = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why Choose <span className="ayra-gradient-primary bg-clip-text text-transparent">Ayra</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            More than technology - Ayra represents a revolution in compassionate healthcare, 
            where human touch meets artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card 
                key={index}
                className="ayra-shadow-soft hover:ayra-shadow-warm ayra-transition hover:scale-102 border-primary/20 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="ayra-gradient-accent w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 ayra-transition">
                      <Icon className={`w-7 h-7 ${reason.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <div className="max-w-4xl mx-auto p-8 rounded-3xl ayra-gradient-primary ayra-shadow-warm">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Healthcare shouldn't be complicated
            </h3>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Ayra simplifies healthcare by combining advanced AI with human empathy, 
              making quality healthcare accessible, understandable, and caring for everyone, everywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};