module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-dark-mode"],
  framework: "@storybook/react",
  babel: async (options) => {
    // https://github.com/storybookjs/storybook/issues/6188#issuecomment-822924831
    options.plugins.push("babel-plugin-inline-react-svg");
    return options;
  },
};
