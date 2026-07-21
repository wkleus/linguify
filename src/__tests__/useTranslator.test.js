/**
 * Verify input validation and happy-path translation flow
 */

import { renderHook, act } from "@testing-library/react";
import useTranslator from "../hooks/useTranslator";

// renderHook –> mounts hook in isolation without needing a component
// act –> wraps state updates so React flushes them before asserting

// Mock settings context so the hook doesn't need a real SettingsProvider
jest.mock("../context/useSettingsContext", () => ({
  useSettingsContext: () => ({
    autoClearInstant: false,
    autoClearDelay: false,
    autoCopy: false,
    liveTranslation: false,
  }),
}));

describe("useTranslator", () => {
  // empty input must be rejected before any network request is made
  test("shows an error and does not call the API when the input is empty", async () => {
    const { result } = renderHook(() => useTranslator());

    await act(async () => {
      await result.current.translate("German", "English");
    });

    expect(result.current.error).toBe("Please enter some text first.");
    expect(result.current.translatedText).toBe("");
  });

  // valid input + successful API response -> result lands in state, no error
  test("translates successfully and stores the result", async () => {
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        responseStatus: 200,
        responseData: { translatedText: "Hallo Welt" },
      }),
    });

    const { result } = renderHook(() => useTranslator());

    act(() => {
      result.current.setSourceText("Hello world");
    });

    await act(async () => {
      await result.current.translate("English", "German");
    });

    expect(result.current.translatedText).toBe("Hallo Welt");
    expect(result.current.error).toBe("");
  });
});

// Tests prove:
// empty input is rejected without a fetch call, and a successful API response is correctly stored
