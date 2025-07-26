import { AyraHeader } from "@/components/AyraHeader";
import { AyraHero } from "@/components/AyraHero";
import { AyraFeatures } from "@/components/AyraFeatures";
import { AyraHowItWorks } from "@/components/AyraHowItWorks";
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
      </main>
      
      <AyraFooter />
    </div>
  );
};

export default Index;
