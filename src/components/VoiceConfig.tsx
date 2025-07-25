import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Key, Volume2 } from "lucide-react";

interface VoiceConfigProps {
  onApiKeySet?: (apiKey: string) => void;
  hasApiKey?: boolean;
  apiKey?: string;
  onApiKeyChange?: (key: string) => void;
}

export const VoiceConfig = ({ onApiKeySet, hasApiKey, apiKey: externalApiKey, onApiKeyChange }: VoiceConfigProps) => {
  const [apiKey, setApiKey] = useState(externalApiKey || "");
  
  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    onApiKeyChange?.(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet?.(apiKey.trim());
    }
  };

  if (hasApiKey || (apiKey && !onApiKeySet)) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Volume2 className="w-4 h-4 text-green-500" />
        <span>Ayra's voice is ready!</span>
      </div>
    );
  }

  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50/50">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-yellow-600" />
          <h3 className="font-semibold text-foreground">Enable Ayra's Voice</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          To hear Ayra speak, please enter your ElevenLabs API key. Get one free at{" "}
          <a 
            href="https://elevenlabs.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            elevenlabs.io
          </a>
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="apiKey" className="sr-only">
              ElevenLabs API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your ElevenLabs API key..."
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="border-yellow-300 focus:border-secondary"
            />
          </div>
          <Button type="submit" variant="ayra-secondary" disabled={!apiKey.trim()}>
            Enable Voice
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};