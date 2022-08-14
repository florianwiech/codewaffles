import { expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Fuse from "fuse.js";
import { AppearanceState, Layout } from "../../theme";
import { SPOTLIGHT_LABEL, SpotlightProps } from "../Spotlight";
import { ExampleSpotlight } from "../demo/ExampleSpotlight";

export const scriptsMock = [
  { key: "one", label: "one" },
  { key: "two", label: "two" },
  { key: "three", label: "three" },
];

export async function setupOpenSpotlight(props?: Partial<SpotlightProps>) {
  const utils = render(
    <Layout theme={AppearanceState.DARK}>
      <ExampleSpotlight
        commands={props?.commands ?? scriptsMock}
        keys={props?.keys ?? ["label"]}
        onSubmit={props?.onSubmit ?? (() => {})}
        onClose={props?.onClose ?? vi.fn()}
      />
    </Layout>,
  );

  const button = await screen.findByText("Open Search");

  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByPlaceholderText(SPOTLIGHT_LABEL)).toBeInTheDocument();
  });

  const inputElement = screen.getByPlaceholderText(SPOTLIGHT_LABEL);
  return {
    inputElement,
    ...utils,
  };
}

const defaultFuseSearchMock = [{ item: scriptsMock[0] }, { item: scriptsMock[1] }] as Fuse.FuseResult<unknown>[];

export const createFuseSearchSpy = (returnValue = defaultFuseSearchMock) =>
  vi.spyOn(Fuse.prototype, "search").mockReturnValue(returnValue);

it("should render spotlight", async () => await setupOpenSpotlight());
