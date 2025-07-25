import { AyraHeader } from "@/components/AyraHeader";
import { AyraHero } from "@/components/AyraHero";
import { AyraFeatures } from "@/components/AyraFeatures";
import { AyraHowItWorks } from "@/components/AyraHowItWorks";
import { AyraWhyChoose } from "@/components/AyraWhyChoose";
import { AyraTestimonials } from "@/components/AyraTestimonials";
import { AyraTalkDemo } from "@/components/AyraTalkDemo";
import { AyraContact } from "@/components/AyraContact";
import { AyraFooter } from "@/components/AyraFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background ayra-scrollbar">
      <AyraHeader />
      
      <main>
        <AyraHero />
        
        <section id="features">
          <AyraFeatures />
        </section>
        
        <section id="how-it-works">
          <AyraHowItWorks />
        </section>
        
        <AyraWhyChoose />
        
        <section id="testimonials">
          <AyraTestimonials />
        </section>
        
        <AyraTalkDemo />
        
        <section id="contact">
          <AyraContact />
        </section>
      </main>
      
      <AyraFooter />
    </div>
  );
};

export default Index;
