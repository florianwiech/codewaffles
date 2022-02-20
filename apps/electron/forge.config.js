/**
 * @type {import("@electron-forge/plugin-webpack").WebpackPluginConfig}
 */
const webpackConfig = {
  devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
  mainConfig: "./webpack.main.config.js",
  port: "3030",
  renderer: {
    config: "./webpack.renderer.config.js",
    entryPoints: [
      {
        html: "./static/index.html",
        js: "./src/renderer/pages/app.tsx",
        preload: {
          js: "./src/preload/app-preload.ts",
        },
        name: "main_window",
      },
      {
        html: "./static/index.html",
        js: "./src/renderer/pages/settings.tsx",
        preload: {
          js: "./src/preload/settings-preload.ts",
        },
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
    ["@electron-forge/plugin-electronegativity", { isSarif: true }],
  ],
};

module.exports = config;
