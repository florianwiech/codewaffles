import { render, screen } from "@testing-library/react";
import { Dummy } from "./Dummy";

describe("Dummy", () => {
  it("should render", async () => {
    render(<Dummy />);

    const heading = await screen.findByText("Dummy");

    expect(heading).not.toBeNull();
  });
});
