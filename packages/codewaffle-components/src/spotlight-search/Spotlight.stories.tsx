import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useDarkMode } from "storybook-dark-mode";
import { AppearanceState, Layout } from "../theme";
import { ExampleSpotlight } from "./demo/ExampleSpotlight";

const scriptsMock = [
  { key: "one", label: "one" },
  { key: "two", label: "two" },
  { key: "three", label: "three" },
  { key: "test", label: "test" },
  { key: "example", label: "example" },
  { key: "dummy", label: "dummy" },
  { key: "lorem-ipsum", label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
  { key: "dolor-sit", label: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore" },
  { key: "amet-consectetur", label: "Lorem ipsum dolor sit amet, ut enim ad minim veniam" },
];

export default {
  title: "Components/Spotlight",
  component: ExampleSpotlight,
  args: {
    commands: scriptsMock,
  },
  decorators: [
    (Story) => (
      <Layout theme={useDarkMode() ? AppearanceState.DARK : AppearanceState.LIGHT}>
        <Story />
      </Layout>
    ),
  ],
} as ComponentMeta<typeof ExampleSpotlight>;

export const Spotlight: ComponentStory<typeof ExampleSpotlight> = (args) => <ExampleSpotlight {...args} />;
