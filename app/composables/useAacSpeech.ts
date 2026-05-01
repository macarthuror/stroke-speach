export function useAacSpeech(lang = "es-ES") {
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
    utterance.lang = lang;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  };

  return {
    isSupported,
    speak,
  };
}
