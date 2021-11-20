import { fireEvent, screen, waitFor } from "@testing-library/react";
import {
  createFuseSearchSpy,
  scriptsMock,
  setupOpenSpotlight,
} from "./spotlight-basics";

describe("search navigation", () => {
  let spotlightInput: HTMLElement;
  beforeEach(async () => {
    const { inputElement } = await setupOpenSpotlight();
    spotlightInput = inputElement;

    const searchSpy = createFuseSearchSpy();

    fireEvent.change(spotlightInput, {
      target: { value: scriptsMock[1].label },
    });

    expect(spotlightInput).toHaveValue(scriptsMock[1].label);
    await waitFor(() => expect(searchSpy).toHaveBeenCalled());

    await waitFor(() => {
      expect(screen.getByText(scriptsMock[1].label)).toBeInTheDocument();
    });
  });

  it("should default select first search result", async () => {
    expect(screen.getByText(scriptsMock[0].label)).toHaveClass("active");
  });

  it("should navigate with arrow keys", () => {
    fireEvent.keyDown(spotlightInput, { key: "ArrowDown" });

    expect(screen.getByText(scriptsMock[0].label)).not.toHaveClass("active");
    expect(screen.getByText(scriptsMock[1].label)).toHaveClass("active");

    fireEvent.keyDown(spotlightInput, { key: "ArrowUp" });

    expect(screen.getByText(scriptsMock[0].label)).toHaveClass("active");
    expect(screen.getByText(scriptsMock[1].label)).not.toHaveClass("active");
  });

  it("shouldn't navigate outside top range", () => {
    fireEvent.keyDown(spotlightInput, { key: "ArrowUp" });

    expect(screen.getByText(scriptsMock[0].label)).toHaveClass("active");
    expect(screen.getByText(scriptsMock[1].label)).not.toHaveClass("active");
  });

  it("shouldn't navigate outside bottom range", () => {
    fireEvent.keyDown(spotlightInput, { key: "ArrowDown" });
    fireEvent.keyDown(spotlightInput, { key: "ArrowDown" });

    expect(screen.getByText(scriptsMock[0].label)).not.toHaveClass("active");
    expect(screen.getByText(scriptsMock[1].label)).toHaveClass("active");
  });

  it("should navigate with tab (+shift) key", () => {
    fireEvent.keyDown(spotlightInput, { key: "Tab" });

    expect(screen.getByText(scriptsMock[0].label)).not.toHaveClass("active");
    expect(screen.getByText(scriptsMock[1].label)).toHaveClass("active");

    fireEvent.keyDown(spotlightInput, { key: "Tab", shiftKey: true });

    expect(screen.getByText(scriptsMock[0].label)).toHaveClass("active");
    expect(screen.getByText(scriptsMock[1].label)).not.toHaveClass("active");
  });
});
