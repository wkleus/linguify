import { render, screen, fireEvent } from "@testing-library/react";
import TranslateButton from "../components/TranslateButton";

// render()     – mounts the component into a virtual DOM (jsdom)
// screen       – lets us query what's visible, the same way a user would see it
// fireEvent    – simulates real user interactions like clicks

describe("TranslateButton", () => {
  test("is enabled and shows no loading indicator when not translating", () => {
    // isTranslating={false} is the default idle state
    render(<TranslateButton isTranslating={false} onClick={() => {}} />);

    const button = screen.getByRole("button");

    // The button must be clickable when idle
    expect(button).toBeEnabled();

    // queryByText returns null if the element doesn't exist – safer than getByText
    // which throws. We use it here because we're asserting absence.
    expect(screen.queryByText("...")).toBeNull();
  });

  test("is disabled and shows loading dots while translating", () => {
    // isTranslating={true} means an API call is in flight
    render(<TranslateButton isTranslating={true} onClick={() => {}} />);

    const button = screen.getByRole("button");

    // Disabled prevents accidental double-submissions during loading
    expect(button).toBeDisabled();

    // The "..." text replaces the arrow icon to signal activity
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  test("calls onClick exactly once when clicked in idle state", () => {
    // jest.fn() creates a spy function – it records how many times it was called
    const handleClick = jest.fn();
    render(<TranslateButton isTranslating={false} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));

    // toHaveBeenCalledTimes(1) catches both "never called" and "called too often"
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick when the button is disabled", () => {
    // A disabled HTML button ignores click events natively.
    // This test confirms that behavior isn't accidentally bypassed.
    const handleClick = jest.fn();
    render(<TranslateButton isTranslating={true} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
