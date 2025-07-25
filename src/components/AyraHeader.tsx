import { Button } from "@/components/ui/button";
import { Heart, Menu } from "lucide-react";
import { useState } from "react";

export const AyraHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20 ayra-shadow-soft">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl ayra-gradient-primary flex items-center justify-center">
              <Heart className="w-6 h-6 text-foreground fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ayra</h1>
              <p className="text-xs text-muted-foreground -mt-1">Health. Heard. Handled.</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-foreground hover:text-secondary ayra-transition font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-foreground hover:text-secondary ayra-transition font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-foreground hover:text-secondary ayra-transition font-medium"
            >
              Stories
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-secondary ayra-transition font-medium"
            >
              Contact
            </button>
            <Button variant="ayra" size="sm">
              Talk to Ayra
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-primary/20 animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-left text-foreground hover:text-secondary ayra-transition font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-foreground hover:text-secondary ayra-transition font-medium"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-left text-foreground hover:text-secondary ayra-transition font-medium"
              >
                Stories
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground hover:text-secondary ayra-transition font-medium"
              >
                Contact
              </button>
              <Button variant="ayra" size="sm" className="w-fit">
                Talk to Ayra
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};