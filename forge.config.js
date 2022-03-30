const packageJson = require("./package.json");

const { version } = packageJson;

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
  packagerConfig: {
    name: "CodeWaffle",
    executableName: "codewaffle",
    appBundleId: "app.codewaffle",
    asar: true,
    appCategoryType: "public.app-category.developer-tools",
    protocols: [
      {
        name: "CodeWaffle Launch Protocol",
        schemes: ["codewaffle", "cw"],
      },
    ],
    osxSign: {
      identity: "Developer ID Application: Florian Wiech (28563WWU78)",
      hardenedRuntime: true,
      "gatekeeper-assess": false,
      entitlements: "static/entitlements.plist",
      "entitlements-inherit": "static/entitlements.plist",
      "signature-flags": "library",
    },
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      platforms: ["win32"],
      config: (arch) => {
        return {
          name: "codewaffle",
          authors: "Florian Wiech",
          exe: "codewaffle.exe",
          noMsi: true,
          setupExe: `codewaffle-${version}-win32-${arch}-setup.exe`,
        };
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      platforms: ["linux"],
      config: {
        mimeType: ["x-scheme-handler/codewaffle"],
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      platforms: ["linux"],
      config: {
        mimeType: ["x-scheme-handler/codewaffle"],
      },
    },
  ],
  plugins: [
    //
    ["@electron-forge/plugin-webpack", webpackConfig],
    ["@electron-forge/plugin-electronegativity", { isSarif: true }],
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "florianwiech",
          name: "codewaffle",
        },
      },
    },
  ],
};

function notarizeMaybe() {
  if (process.platform !== "darwin") {
    return;
  }

  if (!process.env.CI) {
    console.log(`Not in CI, skipping notarization`);
    return;
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
    console.warn("Should be notarizing, but environment variables APPLE_ID or APPLE_ID_PASSWORD are missing!");
    return;
  }

  config.packagerConfig.osxNotarize = {
    appBundleId: "app.codewaffle",
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
    ascProvider: "28563WWU78",
  };
}

notarizeMaybe();

module.exports = config;
