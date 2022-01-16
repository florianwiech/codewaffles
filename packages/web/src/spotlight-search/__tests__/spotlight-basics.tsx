import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Fuse from "fuse.js";
import { Spotlight, SPOTLIGHT_LABEL } from "../Spotlight";
import { Layout } from "../../ui";
import { ScriptList } from "../../scripts";

export const scriptsMock = [
  { key: "one", label: "one" },
  { key: "two", label: "two" },
  { key: "three", label: "three" },
] as unknown as ScriptList;

export const setupOpenSpotlight = async () => {
  const utils = render(
    <Layout>
      <Spotlight scripts={scriptsMock} />
    </Layout>,
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

const defaultFuseSearchMock = [
  { item: scriptsMock[0] },
  { item: scriptsMock[1] },
] as Fuse.FuseResult<unknown>[];

export const createFuseSearchSpy = (returnValue = defaultFuseSearchMock) =>
  jest.spyOn(Fuse.prototype, "search").mockReturnValue(returnValue);

it("hidden by default", () => {
  render(<Spotlight scripts={scriptsMock} />);

  expect(
    screen.queryByPlaceholderText(SPOTLIGHT_LABEL),
  ).not.toBeInTheDocument();
});

it("open via keyboard shortcut", async () => await setupOpenSpotlight());
