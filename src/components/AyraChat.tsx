import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, X, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAyraVoice } from "@/hooks/useAyraVoice";
import { VoiceConfig } from "@/components/VoiceConfig";

// Type declarations for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
}

interface AyraChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AyraChat = ({ isOpen, onClose }: AyraChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Ayra, your AI medical assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { speak, stopSpeaking, isLoading, isPlaying } = useAyraVoice();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguage;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, [currentLanguage]);

  const getAyraResponse = (userMessage: string): string => {
    const responses = {
      greetings: [
        "Hello! How can I assist you with your health today?",
        "Hi there! I'm here to help with any medical questions you have.",
        "Good day! What health concerns can I help you with?"
      ],
      symptoms: [
        "I understand you're experiencing some symptoms. Can you describe them in more detail? Remember, I'm here to provide information, but please consult a healthcare professional for proper diagnosis.",
        "Thank you for sharing your symptoms with me. While I can provide general information, it's important to speak with a doctor for proper medical advice.",
        "I hear your concerns about these symptoms. Let me provide some general information, but please remember to consult with a healthcare provider."
      ],
      appointment: [
        "I can help you understand what to expect during medical appointments, but you'll need to contact your healthcare provider directly to book appointments.",
        "For scheduling appointments, please contact your doctor's office directly. I can help you prepare questions to ask during your visit.",
        "While I can't book appointments directly, I can help you prepare for your medical visits and understand what information to bring."
      ],
      general: [
        "That's a great question! Let me provide you with some helpful information about that.",
        "I'm here to help with that. Here's what you should know...",
        "Thank you for asking. Based on general medical knowledge, here's some information that might help..."
      ]
    };

    const message = userMessage.toLowerCase();
    
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    } else if (message.includes("pain") || message.includes("hurt") || message.includes("sick") || message.includes("symptom")) {
      return responses.symptoms[Math.floor(Math.random() * responses.symptoms.length)];
    } else if (message.includes("appointment") || message.includes("book") || message.includes("schedule")) {
      return responses.appointment[Math.floor(Math.random() * responses.appointment.length)];
    } else {
      return responses.general[Math.floor(Math.random() * responses.general.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Get Ayra's response
    const responseText = getAyraResponse(inputText);
    const ayraMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      isUser: false,
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, ayraMessage]);
    setInputText("");

    // Speak the response if API key is available
    if (apiKey) {
      await speak(responseText, {
        apiKey,
        voiceId: "EXAVITQu4vr4xnSDxMaL", // Sarah's voice
        model: "eleven_multilingual_v2"
      });
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              Chat with Ayra
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4">
          <VoiceConfig apiKey={apiKey} onApiKeyChange={setApiKey} />
          
          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium">Language:</label>
            <select 
              value={currentLanguage} 
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="px-2 py-1 border rounded text-sm bg-background"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
            </select>
          </div>

          <ScrollArea className="flex-1 border rounded-lg p-4 bg-muted/30">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-card text-card-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {(isLoading || isPlaying) && (
                <div className="flex justify-start">
                  <div className="bg-card text-card-foreground p-3 rounded-lg flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                        <span className="text-sm">Ayra is preparing to speak...</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-sm">Ayra is speaking...</span>
                      </>
                    )}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or use voice..."
              className="flex-1"
            />
            <Button
              variant={isListening ? "destructive" : "outline"}
              size="icon"
              onClick={isListening ? stopListening : startListening}
              disabled={!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            {isPlaying && (
              <Button variant="outline" size="icon" onClick={stopSpeaking}>
                <VolumeX className="h-4 w-4" />
              </Button>
            )}
            <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};