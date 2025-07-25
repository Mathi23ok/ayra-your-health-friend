import { Button } from "@/components/ui/button";
import { Heart, Mic, Phone } from "lucide-react";
import ayraHeroImage from "@/assets/ayra-hero.jpg";

export const AyraHero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center ayra-gradient-soft relative overflow-hidden">
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Meet <span className="ayra-gradient-primary bg-clip-text text-transparent">Ayra</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
            Health. Heard. Handled.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Your caring AI companion for healthcare - understanding, empathetic, and always there when you need support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="ayra" size="lg" className="text-lg px-8 py-6">
              <Mic className="w-5 h-5" />
              Talk to Ayra
            </Button>
            <Button variant="ayra-soft" size="lg" className="text-lg px-8 py-6">
              <Phone className="w-5 h-5" />
              Learn More
            </Button>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="ayra-shadow-glow rounded-3xl overflow-hidden ayra-float">
              <img 
                src={ayraHeroImage} 
                alt="Ayra - Your caring AI health assistant" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 ayra-pulse-glow">
              <div className="w-16 h-16 rounded-full ayra-gradient-accent flex items-center justify-center">
                <Heart className="w-8 h-8 text-foreground fill-current" />
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 ayra-pulse-glow animation-delay-1000">
              <div className="w-20 h-20 rounded-full ayra-gradient-primary flex items-center justify-center">
                <Mic className="w-10 h-10 text-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary/20 blur-2xl"></div>
    </section>
  );
};