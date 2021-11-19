import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { scriptList } from "../transforms/scripts";
import { Spotlight, SPOTLIGHT_LABEL } from "./Spotlight";
import { Layout } from "../ui";

describe("Spotlight", () => {
  it("hidden by default", () => {
    render(<Spotlight scripts={scriptList} />);

    expect(screen.queryByText(SPOTLIGHT_LABEL)).not.toBeInTheDocument();
  });

  it("open via keyboard shortcut", async () => {
    const { baseElement } = render(
      <Layout>
        <Spotlight scripts={scriptList} />
      </Layout>
    );

    fireEvent.keyDown(baseElement, { key: "k", ctrlKey: true, metaKey: true });

    await waitFor(() => {
      expect(screen.getByText(SPOTLIGHT_LABEL)).toBeInTheDocument();
    });
  });
});
