import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, MessageSquare } from "lucide-react";

const sampleQuestions = [
  {
    question: "Ayra, I have a headache again.",
    response: "I'm sorry to hear about your headache. Can you tell me more about it? Is it different from your usual headaches? Any specific triggers today like stress, lack of sleep, or screen time?"
  },
  {
    question: "Book an appointment at City Hospital.",
    response: "I'd be happy to help you book an appointment at City Hospital. What type of specialist do you need to see? I can check their availability and find the best time that works for your schedule."
  },
  {
    question: "How's my blood pressure today?",
    response: "Based on your recent readings from your smartwatch, your blood pressure has been within normal range this week. Your average is 118/78. Would you like me to show you the trend over the past month?"
  }
];

export const AyraTalkDemo = () => {
  const [activeDemo, setActiveDemo] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // In a real implementation, this would start/stop voice recognition
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Try Talking to <span className="ayra-gradient-primary bg-clip-text text-transparent">Ayra</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience how natural and caring conversations with Ayra feel. Click on any example below.
          </p>
        </div>

        {/* Voice Interface */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="ayra-shadow-warm border-primary/30">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Button
                  variant={isListening ? "destructive" : "ayra"}
                  size="lg"
                  onClick={handleVoiceToggle}
                  className={`w-20 h-20 rounded-full ${isListening ? 'ayra-pulse-glow' : ''}`}
                >
                  {isListening ? (
                    <MicOff className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </Button>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {isListening ? "Listening..." : "Tap to start talking"}
              </h3>
              <p className="text-muted-foreground">
                {isListening 
                  ? "Ayra is listening and ready to help with your health concerns" 
                  : "Start a voice conversation with Ayra - just like talking to a friend"
                }
              </p>
              
              {isListening && (
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-8 bg-secondary rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sample Conversations */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Sample Conversations
          </h3>
          
          <div className="space-y-6">
            {sampleQuestions.map((item, index) => (
              <div key={index} className="space-y-4">
                <Card 
                  className={`cursor-pointer ayra-transition hover:ayra-shadow-soft border-primary/20 ${
                    activeDemo === index ? 'ayra-shadow-warm border-secondary' : ''
                  }`}
                  onClick={() => setActiveDemo(activeDemo === index ? null : index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full ayra-gradient-accent flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground font-medium">
                          "{item.question}"
                        </p>
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Click to see response
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {activeDemo === index && (
                  <Card className="ayra-gradient-primary animate-fade-in-up">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full ayra-gradient-accent flex items-center justify-center flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-foreground"></div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground/80 mb-2">Ayra responds:</div>
                          <p className="text-foreground leading-relaxed">
                            {item.response}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground italic max-w-2xl mx-auto">
            These are just examples. Ayra can help with a wide range of health concerns, 
            from symptom analysis to appointment scheduling and everything in between.
          </p>
        </div>
      </div>
    </section>
  );
};