import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AppearanceState, Layout } from "@codewaffle/components";
import Fuse from "fuse.js";
import { SPOTLIGHT_LABEL, SpotlightProps } from "../Spotlight";
import { ExampleSpotlight } from "../demo/ExampleSpotlight";

export const scriptsMock = [
  { key: "one", label: "one" },
  { key: "two", label: "two" },
  { key: "three", label: "three" },
];

export const setupOpenSpotlight = async (props?: Partial<SpotlightProps>) => {
  const utils = render(
    <Layout theme={AppearanceState.DARK}>
      <ExampleSpotlight
        commands={props?.commands ?? scriptsMock}
        keys={props?.keys ?? ["label"]}
        onSubmit={props?.onSubmit ?? jest.fn()}
        onClose={props?.onClose ?? jest.fn()}
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
};

const defaultFuseSearchMock = [{ item: scriptsMock[0] }, { item: scriptsMock[1] }] as Fuse.FuseResult<unknown>[];

export const createFuseSearchSpy = (returnValue = defaultFuseSearchMock) =>
  jest.spyOn(Fuse.prototype, "search").mockReturnValue(returnValue);

it("should render spotlight", async () => await setupOpenSpotlight());
