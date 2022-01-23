import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dummy } from "./Dummy";

export default {
  title: "Components/Dummy",
  component: Dummy,
} as ComponentMeta<typeof Dummy>;

const Template: ComponentStory<typeof Dummy> = (args) => <Dummy {...args} />;

export const ShowDummy = Template.bind({});
