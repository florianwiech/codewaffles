import { fireEvent, screen, waitFor } from "@testing-library/react";
import Fuse from "fuse.js";
import { createFuseSearchSpy, scriptsMock, setupOpenSpotlight } from "./spotlight-basics";

describe("cancel search", () => {
  let spotlightInput: HTMLElement;
  let onSearchCloseMock = jest.fn();

  beforeEach(async () => {
    onSearchCloseMock = jest.fn();

    const { inputElement } = await setupOpenSpotlight({
      onClose: onSearchCloseMock,
    });
    spotlightInput = inputElement;
  });

  it("should close search with no input on escape", async () => {
    fireEvent.keyDown(spotlightInput, { key: "Escape" });

    await waitFor(() => {
      expect(onSearchCloseMock).toHaveBeenCalled();
    });
  });

  it("should reset search input without results", async () => {
    const searchTerm = "foobar";

    const searchSpy = createFuseSearchSpy([]);

    fireEvent.change(spotlightInput, {
      target: { value: searchTerm },
    });

    expect(spotlightInput).toHaveValue(searchTerm);

    await waitFor(() => expect(searchSpy).toHaveBeenCalled());

    fireEvent.keyDown(spotlightInput, { key: "Escape" });

    expect(spotlightInput).toHaveValue("");
  });

  describe("should reset search", () => {
    let searchSpy: jest.SpyInstance<Fuse.FuseResult<unknown>[]>;
    beforeEach(async () => {
      searchSpy = createFuseSearchSpy();

      fireEvent.change(spotlightInput, {
        target: { value: scriptsMock[0].label },
      });

      expect(spotlightInput).toHaveValue(scriptsMock[0].label);
      await waitFor(() => expect(searchSpy).toHaveBeenCalled());

      await waitFor(() => {
        expect(screen.getByText(scriptsMock[0].label)).toBeInTheDocument();
      });
      expect(screen.getByText(scriptsMock[0].label)).toHaveClass("active");
    });

    it("should reset search results", async () => {
      fireEvent.keyDown(spotlightInput, { key: "Escape" });

      expect(spotlightInput).toHaveValue("");
      expect(screen.queryByText(scriptsMock[0].label)).not.toBeInTheDocument();
    });

    it("should reset active search result", async () => {
      fireEvent.keyDown(spotlightInput, { key: "ArrowDown" });

      expect(screen.getByText(scriptsMock[0].label)).not.toHaveClass("active");
      expect(screen.getByText(scriptsMock[1].label)).toHaveClass("active");

      fireEvent.keyDown(spotlightInput, { key: "Escape" });
      expect(spotlightInput).toHaveValue("");

      fireEvent.change(spotlightInput, {
        target: { value: "foobar" },
      });
      expect(spotlightInput).toHaveValue("foobar");
      await waitFor(() => expect(searchSpy).toHaveBeenCalled());

      await waitFor(() => {
        expect(screen.getByText(scriptsMock[0].label)).toBeInTheDocument();
      });

      expect(screen.getByText(scriptsMock[0].label)).toHaveClass("active");
      expect(screen.getByText(scriptsMock[1].label)).not.toHaveClass("active");
    });
  });
});
