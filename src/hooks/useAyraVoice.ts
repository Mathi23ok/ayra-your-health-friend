import { useState, useCallback } from "react";

export interface VoiceSettings {
  apiKey: string;
  voiceId: string; // Sarah's voice ID for a caring female voice
  model: string;
}

export const useAyraVoice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string, settings: VoiceSettings) => {
    if (!settings.apiKey || !text) return;

    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    setIsLoading(true);
    setIsPlaying(false);

    try {
      const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + settings.voiceId, {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": settings.apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: settings.model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.6,
            use_speaker_boost: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      setCurrentAudio(audio);

      audio.onloadstart = () => setIsLoading(true);
      audio.oncanplaythrough = () => setIsLoading(false);
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsLoading(false);
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error("Error playing speech:", error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [currentAudio]);

  const stopSpeaking = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentAudio]);

  return {
    speak,
    stopSpeaking,
    isLoading,
    isPlaying
  };
};