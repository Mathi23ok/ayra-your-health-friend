import { Button } from "@/components/ui/button";
import { Heart, Mic, Phone } from "lucide-react";
import { AyraFullPageChat } from "@/components/AyraFullPageChat";
import ayraHeroImage from "@/assets/ayra-hero.jpg";
import { useState } from "react";

export const AyraHero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return (
    <>
      <AyraFullPageChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
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
            <div 
              className="ayra-shadow-glow rounded-3xl overflow-hidden ayra-float cursor-pointer transition-transform duration-300 hover:scale-105 group"
              onClick={() => setIsChatOpen(true)}
            >
              <div className="relative">
                <img 
                  src={ayraHeroImage} 
                  alt="Ayra - Your caring AI health assistant" 
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-background/90 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Mic className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
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
    </>
  );
};