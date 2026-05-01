import { toValue } from "vue";
export function useAacSpeech(lang = "es-ES", pitch = 1, rate = 1) {
  const isSupported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined";

  const speak = (text: string) => {
    const phrase = text.trim();
    if (!isSupported || !phrase) {
      return false;
    }

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = toValue(lang);
    utterance.pitch = toValue(pitch);
    utterance.rate = toValue(rate);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  };

  const speakAs = (text: string, langOverride: string) => {
    const phrase = text.trim();
    if (!isSupported || !phrase) {
      return false;
    }

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = langOverride;
    utterance.pitch = toValue(pitch);
    utterance.rate = toValue(rate);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  };

  return {
    isSupported,
    speak,
    speakAs,
  };
}
