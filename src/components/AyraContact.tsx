import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Heart, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AyraContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent! 💜",
      description: "Thank you for reaching out. The Ayra team will get back to you soon.",
    });
    setFormData({ name: "", email: "", issue: "", message: "" });
  };

  return (
    <section className="py-20 ayra-gradient-soft">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get in <span className="ayra-gradient-accent bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about Ayra? Need support? We're here to help with the same care and empathy that Ayra provides.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="ayra-shadow-warm border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Send us a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      className="border-primary/30 focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="border-primary/30 focus:border-secondary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="issue" className="text-foreground">
                    How can we help?
                  </Label>
                  <Input
                    id="issue"
                    name="issue"
                    value={formData.issue}
                    onChange={handleInputChange}
                    placeholder="e.g., General inquiry, Technical support, Partnership"
                    className="border-primary/30 focus:border-secondary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about how we can help you..."
                    rows={6}
                    required
                    className="border-primary/30 focus:border-secondary resize-none"
                  />
                </div>
                
                <Button type="submit" variant="ayra" size="lg" className="w-full">
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="ayra-shadow-soft border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl ayra-gradient-primary flex items-center justify-center">
                    <Mail className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email Us</h4>
                    <p className="text-muted-foreground">hello@ayra.health</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  For general inquiries, support, or partnership opportunities
                </p>
              </CardContent>
            </Card>

            <Card className="ayra-shadow-soft border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl ayra-gradient-accent flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Our Mission</h4>
                    <p className="text-muted-foreground">Global Healthcare Access</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Making quality healthcare accessible to everyone, everywhere - from bustling cities to remote villages
                </p>
              </CardContent>
            </Card>

            <Card className="ayra-shadow-soft border-primary/20 ayra-gradient-primary">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-foreground mx-auto mb-4 fill-current" />
                <h4 className="font-semibold text-foreground mb-2">
                  Built with Love
                </h4>
                <p className="text-foreground/80 text-sm">
                  Every feature of Ayra is designed with empathy, care, and the belief that 
                  everyone deserves compassionate healthcare support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};