import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAacSpeech } from "../../app/composables/useAacSpeech";

class MockSpeechSynthesisUtterance {
  lang = "";
  text: string;

  constructor(text: string) {
    this.text = text;
  }
}

describe("useAacSpeech", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("speaks the provided phrase in Spanish", () => {
    const cancel = vi.fn();
    const speak = vi.fn();

    vi.stubGlobal("speechSynthesis", { cancel, speak });
    vi.stubGlobal("SpeechSynthesisUtterance", MockSpeechSynthesisUtterance);

    const { speak: speakPhrase, isSupported } = useAacSpeech("es-ES");
    const result = speakPhrase("Agua");

    expect(isSupported).toBe(true);
    expect(result).toBe(true);
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(speak).toHaveBeenCalledTimes(1);

    const utterance = speak.mock.calls[0][0] as MockSpeechSynthesisUtterance;
    expect(utterance.text).toBe("Agua");
    expect(utterance.lang).toBe("es-ES");
  });

  it("does not speak empty phrases", () => {
    const cancel = vi.fn();
    const speak = vi.fn();

    vi.stubGlobal("speechSynthesis", { cancel, speak });
    vi.stubGlobal("SpeechSynthesisUtterance", MockSpeechSynthesisUtterance);

    const { speak: speakPhrase } = useAacSpeech("es-ES");
    const result = speakPhrase("   ");

    expect(result).toBe(false);
    expect(cancel).not.toHaveBeenCalled();
    expect(speak).not.toHaveBeenCalled();
  });
});
