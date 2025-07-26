import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, Send, X, MicOff } from "lucide-react";
import { useAyraVoice } from "@/hooks/useAyraVoice";
import ayraHeroImage from "@/assets/ayra-hero.jpg";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  text: string;
  sender: 'user' | 'ayra';
  timestamp: Date;
  language?: 'en' | 'ta';
}

interface AyraFullPageChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AyraFullPageChat: React.FC<AyraFullPageChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm Ayra, your caring health assistant. How can I help you today? வணக்கம்! நான் அய்ரா, உங்கள் அக்கறையுள்ள சுகாதார உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
      sender: 'ayra',
      timestamp: new Date(),
      language: 'en'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  const recognitionRef = useRef<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { speak, isPlaying } = useAyraVoice();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLanguage === 'en' ? 'en-US' : 'ta-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        // Auto-send after speech recognition
        setTimeout(() => handleSendMessage(transcript), 100);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [currentLanguage]);

  const detectLanguage = (text: string): 'en' | 'ta' => {
    // Simple language detection based on Tamil Unicode range
    const tamilRegex = /[\u0B80-\u0BFF]/;
    return tamilRegex.test(text) ? 'ta' : 'en';
  };

  const getAyraResponse = (userMessage: string, detectedLang: 'en' | 'ta'): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (detectedLang === 'ta') {
      if (lowerMessage.includes('வலி') || lowerMessage.includes('நோய்')) {
        return "உங்கள் அறிகுறிகளைப் பற்றி மேலும் சொல்லுங்கள். எந்த வகையான வலி? எப்போதிலிருந்து இந்த பிரச்சனை இருக்கிறது?";
      } else if (lowerMessage.includes('மருத்துவர்') || lowerMessage.includes('அப்பாய்ன்ட்மென்ட்')) {
        return "நான் உங்களுக்கு மருத்துவ நியமனம் பதிவு செய்ய உதவ முடியும். எந்த மருத்துவமனையில் அல்லது எந்த வகை மருத்துவரிடம் செல்ல விரும்புகிறீர்கள்?";
      } else {
        return "நான் உங்களுக்கு உதவ இங்கு இருக்கிறேன். உங்கள் சுகாதாரம் குறித்து எதையும் கேட்கலாம்.";
      }
    } else {
      if (lowerMessage.includes('pain') || lowerMessage.includes('hurt') || lowerMessage.includes('sick')) {
        return "I understand you're experiencing discomfort. Can you tell me more about your symptoms? Where exactly is the pain located, and how long have you been feeling this way?";
      } else if (lowerMessage.includes('doctor') || lowerMessage.includes('appointment')) {
        return "I can help you book a doctor's appointment. Which hospital or type of specialist would you like to see? I can find nearby options and help with scheduling.";
      } else if (lowerMessage.includes('medicine') || lowerMessage.includes('medication')) {
        return "I can help you with medication reminders and information. What specific medication questions do you have, or would you like me to set up reminders for you?";
      } else {
        return "I'm here to help with all your health concerns. Feel free to ask me about symptoms, appointments, medications, or any health-related questions you might have.";
      }
    }
  };

  const handleSendMessage = (messageText: string = inputText) => {
    if (!messageText.trim()) return;

    const detectedLang = detectLanguage(messageText);
    setCurrentLanguage(detectedLang);

    // Add user message
    const userMessage: Message = {
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      language: detectedLang
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate and add Ayra's response
    setTimeout(() => {
      const ayraResponse = getAyraResponse(messageText, detectedLang);
      const ayraMessage: Message = {
        text: ayraResponse,
        sender: 'ayra',
        timestamp: new Date(),
        language: detectedLang
      };

      setMessages(prev => [...prev, ayraMessage]);

      // Speak the response automatically
      speak(ayraResponse, {
        apiKey: '',
        voiceId: '9BWtsMINqrJLrRacOk9x', // Aria voice
        model: 'eleven_multilingual_v2'
      });
    }, 1000);

    setInputText('');
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.lang = currentLanguage === 'en' ? 'en-US' : 'ta-IN';
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={ayraHeroImage} alt="Ayra" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-foreground">Ayra</h2>
            <p className="text-sm text-muted-foreground">
              {isPlaying ? 'Speaking...' : 'Your health assistant'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ayra' && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarImage src={ayraHeroImage} alt="Ayra" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-2xl px-4 py-3 max-w-[70%] ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {message.sender === 'user' && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentLanguage === 'en' ? "Type your message..." : "உங்கள் செய்தியை தட்டச்சு செய்யுங்கள்..."}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={isListening ? stopListening : startListening}
            className={isListening ? 'bg-destructive text-destructive-foreground' : ''}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button onClick={() => handleSendMessage()} disabled={!inputText.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          {currentLanguage === 'en' 
            ? "Ayra responds in the language you speak • Press mic to talk" 
            : "நீங்கள் பேசும் மொழியில் அய்ரா பதிலளிக்கிறார் • பேச மைக் பட்டனை அழுத்தவும்"
          }
        </p>
      </div>
    </div>
  );
};