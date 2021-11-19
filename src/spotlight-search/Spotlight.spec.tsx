import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Fuse from "fuse.js";
import { Layout } from "../ui";
import { TransformDefinition, TransformList } from "../transforms";
import { Spotlight, SPOTLIGHT_LABEL } from "./Spotlight";

const scriptsMock: TransformList = [
  { key: "one", label: "one", version: 1, handler: () => "" },
  { key: "two", label: "two", version: 1, handler: () => "" },
  { key: "three", label: "three", version: 1, handler: () => "" },
];

describe("Spotlight", () => {
  const setupOpenSpotlight = async () => {
    const utils = render(
      <Layout>
        <Spotlight scripts={scriptsMock} />
      </Layout>
    );

    fireEvent.keyDown(utils.baseElement, {
      key: "k",
      ctrlKey: true,
      metaKey: true,
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(SPOTLIGHT_LABEL)).toBeInTheDocument();
    });

    const inputElement = screen.getByPlaceholderText(SPOTLIGHT_LABEL);
    return {
      inputElement,
      ...utils,
    };
  };

  it("hidden by default", () => {
    render(<Spotlight scripts={scriptsMock} />);

    expect(
      screen.queryByPlaceholderText(SPOTLIGHT_LABEL)
    ).not.toBeInTheDocument();
  });

  it("open via keyboard shortcut", async () => await setupOpenSpotlight());

  describe("cancel search", () => {
    let spotlightInput: HTMLElement;
    beforeEach(async () => {
      const { inputElement } = await setupOpenSpotlight();
      spotlightInput = inputElement;
    });

    it("should close search with no input on escape", async () => {
      fireEvent.keyDown(spotlightInput, { key: "Escape" });

      await waitFor(() => {
        expect(
          screen.queryByPlaceholderText(SPOTLIGHT_LABEL)
        ).not.toBeInTheDocument();
      });
    });

    it("should reset search input without results", async () => {
      const searchTerm = "zzzz";

      const searchSpy = jest
        .spyOn(Fuse.prototype, "search")
        .mockImplementation(() => []);

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
        searchSpy = jest
          .spyOn(Fuse.prototype, "search")
          .mockReturnValue([
            { item: scriptsMock[0] },
            { item: scriptsMock[1] },
          ] as Fuse.FuseResult<unknown>[]);

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
        expect(
          screen.queryByText(scriptsMock[0].label)
        ).not.toBeInTheDocument();
      });

      it("should reset active search result", async () => {
        fireEvent.keyDown(spotlightInput, { key: "ArrowDown" });

        expect(screen.getByText(scriptsMock[0].label)).not.toHaveClass(
          "active"
        );
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
        expect(screen.getByText(scriptsMock[1].label)).not.toHaveClass(
          "active"
        );
      });
    });
  });

  describe("search navigation", () => {
    let spotlightInput: HTMLElement;
    beforeEach(async () => {
      const { inputElement } = await setupOpenSpotlight();
      spotlightInput = inputElement;

      const searchSpy = jest
        .spyOn(Fuse.prototype, "search")
        .mockImplementation(
          () =>
            [
              { item: scriptsMock[0] },
              { item: scriptsMock[1] },
            ] as Fuse.FuseResult<TransformDefinition>[]
        );

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
});
