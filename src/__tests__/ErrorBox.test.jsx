import { render, screen } from "@testing-library/react";
import ErrorBox from "../layout/ErrorBox";

// render()  – mounts the component into a virtual DOM
// screen    – queries what's visible, the same way a user would see it

describe("ErrorBox", () => {
  test("is invisible (opacity-0) when error is null", () => {
    // the box stays in the DOM to avoid layout shift – visibility is
    // controlled via opacity, not by mounting/unmounting
    const { container } = render(<ErrorBox error={null} />);

    expect(container.firstChild).toHaveClass("opacity-0");
  });

  test("is invisible (opacity-0) when error is an empty string", () => {
    const { container } = render(<ErrorBox error="" />);

    expect(container.firstChild).toHaveClass("opacity-0");
  });

  test("is visible (opacity-100) and shows the error message", () => {
    const { container } = render(<ErrorBox error="Something went wrong" />);

    expect(container.firstChild).toHaveClass("opacity-100");
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  test("shows the updated message when the error prop changes", () => {
    // Scenario: user gets error A, fixes something, gets error B.
    // rerender simulates the parent passing a new prop value.
    const { rerender } = render(<ErrorBox error="First error" />);
    expect(screen.getByText("First error")).toBeInTheDocument();

    rerender(<ErrorBox error="Second error" />);

    // New message must appear
    expect(screen.getByText("Second error")).toBeInTheDocument();
    // Old message must be gone – no duplicate errors visible at once
    expect(screen.queryByText("First error")).toBeNull();
  });
});
