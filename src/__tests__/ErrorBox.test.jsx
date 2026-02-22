import { render, screen } from "@testing-library/react";
import ErrorBox from "../layout/ErrorBox";

// render()  – mounts the component into a virtual DOM
// screen    – queries what's visible, the same way a user would see it

describe("ErrorBox", () => {
  test("renders nothing when error is null", () => {
    // The component returns null early when there's no error,
    // so the DOM should be completely empty.
    const { container } = render(<ErrorBox error={null} />);

    // container.firstChild is the root DOM node – null means nothing rendered
    expect(container.firstChild).toBeNull();
  });

  test("renders nothing when error is an empty string", () => {
    // An empty string is falsy in JavaScript, so it should behave
    // the same as null – no box, no empty placeholder visible to the user.
    const { container } = render(<ErrorBox error="" />);

    expect(container.firstChild).toBeNull();
  });

  test("renders the error message when error is provided", () => {
    render(<ErrorBox error="Something went wrong" />);

    // getByText throws if the element isn't found – that's what we want here,
    // because the absence of the error message would be a real bug.
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
