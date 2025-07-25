import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Margaret Chen",
    role: "Retired Teacher, Age 72",
    avatar: "MC",
    content: "Ayra feels like having a caring granddaughter who happens to be a medical expert. She explains everything in simple terms and never makes me feel rushed. The voice is so soothing!",
    rating: 5,
    location: "Rural Oregon"
  },
  {
    name: "Arjun Patel", 
    role: "College Student, Age 20",
    avatar: "AP",
    content: "Between classes and work, I barely have time for doctor visits. Ayra helps me understand my symptoms and even booked my appointment. It's like having a health buddy 24/7.",
    rating: 5,
    location: "University of California"
  },
  {
    name: "Maria Santos",
    role: "Mother of Three, Age 34", 
    avatar: "MS",
    content: "Living in a small town with limited medical facilities, Ayra has been a lifesaver. She helped me understand my daughter's fever and connected us with the right specialist.",
    rating: 5,
    location: "Rural Texas"
  }
];

export const AyraTestimonials = () => {
  return (
    <section className="py-20 ayra-gradient-soft">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            What People Say About <span className="ayra-gradient-accent bg-clip-text text-transparent">Ayra</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real stories from people whose lives have been touched by Ayra's caring presence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="ayra-shadow-soft hover:ayra-shadow-warm ayra-transition hover:scale-105 border-primary/20 group"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 ayra-gradient-primary">
                    <AvatarFallback className="text-foreground font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground/70">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground italic">
            Join thousands of people who trust Ayra with their health and wellbeing
          </p>
        </div>
      </div>
    </section>
  );
};