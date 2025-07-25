import { Heart, Mail, Twitter, Github, Linkedin } from "lucide-react";

export const AyraFooter = () => {
  return (
    <footer className="ayra-gradient-soft border-t border-primary/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl ayra-gradient-primary flex items-center justify-center">
                <Heart className="w-6 h-6 text-foreground fill-current" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Ayra</h3>
                <p className="text-sm text-muted-foreground -mt-1">Health. Heard. Handled.</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Your caring AI companion for healthcare - understanding, empathetic, and always there 
              when you need support. Making quality healthcare accessible to everyone, everywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-secondary ayra-transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-secondary ayra-transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-secondary ayra-transition">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-secondary ayra-transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@ayra.health</span>
              </div>
              <p className="text-sm">
                Available 24/7 for support and inquiries
              </p>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg ayra-gradient-accent flex items-center justify-center hover:scale-110 ayra-transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-foreground" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg ayra-gradient-accent flex items-center justify-center hover:scale-110 ayra-transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-foreground" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg ayra-gradient-accent flex items-center justify-center hover:scale-110 ayra-transition"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-foreground" />
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-muted-foreground text-sm">
                © 2024 Ayra Health. Built with{" "}
                <Heart className="w-4 h-4 inline text-secondary fill-current" />{" "}
                for better healthcare accessibility.
              </p>
              <p className="text-muted-foreground/70 text-xs mt-1">
                Privacy Policy • Terms of Service • Accessibility
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};