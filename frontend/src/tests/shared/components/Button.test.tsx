import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../../../shared/components/Button";

describe("Button component", () => {
  it("renders the button", () => {
    const { getByRole } = render(<Button />);

    expect(getByRole("button")).toBeInTheDocument();
  });

  it("renders the button with the given text", () => {
    const { getByRole } = render(<Button>Hello</Button>);

    expect(getByRole("button")).toHaveTextContent("Hello");
  });

  test("handles onClick event", async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Button onClick={handleClick} />);

    fireEvent.click(getByRole("button"));

    expect(handleClick).toHaveBeenCalled();
  });
});
