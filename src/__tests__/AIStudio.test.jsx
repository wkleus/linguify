/**
 * AI Studio Modal - Quick Actions Tests
 * - verifying that AI Studio's quick action buttons and custom input
 * correctly trigger the translation improvement API with the right parameters
 * - testing user interaction, not the API itself.
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AIStudioModal from "../components/AIStudioModal";

/* Mocking custom hook */
// instead of calling real DeepSeek API during tests create "fake" version of useImproveTranslation hook to keep tests fast and free of API costs

const mockImprove = jest.fn(); // fake function replacing useImproveTranslation

jest.mock("../hooks/useImproveTranslation", () => ({
  useImproveTranslation: () => ({
    improveTranslation: mockImprove, // fake function
    isImproving: false, // always "not loading" for these tests
  }),
}));

/* TEST SUITE */

describe("AI Studio Quick Actions", () => {
  // test data (props that the modal receives) that the real AIStudioModal component would receive from TranslatorPage

  const mockProps = {
    isOpen: true, // modal is visible
    onClose: jest.fn(), // fake close function
    currentTranslation: "Hello world", // text to improve
    setCurrentTranslation: jest.fn(), // fake state setter
    sourceLanguage: "English", // original language
    targetLanguage: "German", // target language
    originalText: "Hello world", // original source text
  };

  /* Setup before each test */
  // run before every individual test to prevent tests from interfering with each other for a clean state

  beforeEach(() => {
    mockImprove.mockClear(); // remove previous calls to the fake function
    mockImprove.mockResolvedValue({ improvedTranslation: "Hallo Welt" });
    // tell fake function to return successful result
    // -> simulate API returning: { improvedTranslation: 'Hallo Welt' }
  });

  /* Individual Tests */

  // TEST 1: "More formal" button
  // -> verify that clicking "Make more formal" button sends correct instruction to improvement API

  test('sends correct instruction to improvement API when "Make more formal" button is clicked', async () => {
    // RENDER: mount component with test props
    render(<AIStudioModal {...mockProps} />);

    // INTERACT: find button by its text content (case-insensitive) and click it
    fireEvent.click(screen.getByText(/Make more formal/i));

    // ASSERT: wait for mock function to be called, then check its arguments
    await waitFor(() => {
      expect(mockImprove).toHaveBeenCalledWith(
        expect.objectContaining({
          // fields that must be present in the call
          originalText: "Hello world",
          translatedText: "Hello world",
          sourceLang: "English",
          targetLang: "German",
          // custom instruction must contain "more formal"
          customInstruction: expect.stringContaining("more formal"),
        }),
      );
    });
  });

  // TEST 2: custom user input
  // -> verify that when user types their own instruction, it is sent to API instead of a predefined quick action.

  test("Uses user-defined input as the prompt", async () => {
    render(<AIStudioModal {...mockProps} />);

    // FIND: custom instruction input
    const customInput = screen.getByPlaceholderText(
      /Enter custom instruction/i,
    );

    // TYPE: simulate user typing custom instruction
    fireEvent.change(customInput, {
      target: { value: "Make it sound like Shakespeare" },
    });

    // CLICK: the "Apply" button to submit custom instruction
    fireEvent.click(screen.getByText(/Apply/i));

    // VERIFY: mock was called with custom instruction
    await waitFor(() => {
      expect(mockImprove).toHaveBeenCalledWith(
        expect.objectContaining({
          customInstruction: expect.stringContaining("Shakespeare"),
        }),
      );
    });
  });
});

// WHAT THESE TESTS ACTUALLY PROVE

// TEST 1: "More formal" button triggers API with "more formal"
// TEST 2: custom user input is sent to API correctly

// These tests ensure that AI Studio's core functionality works:
// - quick action buttons (here "More formal" button) are properly wired up
// - custom input field works as expected
// - improvement API receives the correct parameters

// NOTE: the API itself is NOT tested (-> backend's question)
// -> here only tested is that FRONTEND sends the right data

// TO RUN THIS TEST - Options:
// npm test -- AIStudio
// npm test -- --watch AIStudio
