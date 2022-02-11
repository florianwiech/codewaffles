/**
 * @type {import("@electron-forge/plugin-webpack").WebpackPluginConfig}
 */
const webpackConfig = {
  mainConfig: "./webpack.main.config.js",
  renderer: {
    config: "./webpack.renderer.config.js",
    entryPoints: [
      {
        html: "./static/index.html",
        js: "./src/renderer/app.tsx",
        name: "main_window",
      },
      {
        html: "./static/index.html",
        js: "./src/renderer/settings.tsx",
        name: "settings_window",
      },
    ],
  },
};

const config = {
  packagerConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "codewaffle",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    //
    ["@electron-forge/plugin-webpack", webpackConfig],
  ],
};

module.exports = config;
