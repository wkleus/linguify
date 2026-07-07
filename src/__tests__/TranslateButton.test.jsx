import { render, screen, fireEvent } from "@testing-library/react";
import TranslateButton from "../components/TranslateButton";

// render()     – mounts the component into a virtual DOM (jsdom)
// screen       – lets us query what's visible, the same way a user would see it
// fireEvent    – simulates real user interactions like clicks

describe("TranslateButton", () => {
  test("is enabled and shows no loading indicator when not translating", () => {
    // isTranslating={false} is the default idle state
    const { container } = render(
      <TranslateButton isTranslating={false} onClick={() => {}} />,
    );

    const button = screen.getByRole("button");

    // The button must be clickable when idle
    expect(button).toBeEnabled();

    // arrow is visible (opacity-100), spinner is hidden (opacity-0)
    const [arrowSpan, spinnerSpan] = container.querySelectorAll("button > *");
    expect(arrowSpan).toHaveClass("opacity-100");
    expect(spinnerSpan).toHaveClass("opacity-0");
  });

  test("is disabled and shows spinner while while translating", () => {
    // isTranslating={true} means an API call is in flight
    const { container } = render(
      <TranslateButton isTranslating={true} onClick={() => {}} />,
    );

    const button = screen.getByRole("button");

    // Disabled prevents accidental double-submissions during loading
    expect(button).toBeDisabled();

    // The arrow icon fades out (opacity-0) and the spinner fades in (opacity-100)
    // when translating – both stay mounted to avoid a hard visual jump.
    const [arrowSpan, spinnerSpan] = container.querySelectorAll("button > *");
    expect(arrowSpan).toHaveClass("opacity-0");
    expect(spinnerSpan).toHaveClass("opacity-100");

    // "..." text must no longer exist – it was replaced by the spinner
    expect(screen.queryByText("...")).toBeNull();
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
