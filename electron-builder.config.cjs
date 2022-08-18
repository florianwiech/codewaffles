/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  productName: "CodeWaffle",
  appId: "io.github.florianwiech.codewaffle",
  copyright: "Copyright © 2022 Florian Wiech",
  asar: false,

  afterSign: "./tools/notarize.cjs",

  files: ["package.json", "build/**/*"],

  mac: {
    artifactName: "${productName}-${version}-${os}-${arch}.${ext}",
    icon: "static/icons/mac/icon.icns",
    category: "public.app-category.developer-tools",

    target: [
      { target: "dmg", arch: ["x64", "arm64"] },
      { target: "zip", arch: ["x64", "arm64"] },
    ],

    darkModeSupport: true,
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: "./static/entitlements.plist",
    entitlementsInherit: "./static/entitlements.plist",
  },

  dmg: {
    contents: [
      { type: "link", path: "/Applications", x: 410, y: 240 },
      { type: "file", x: 130, y: 240 },
    ],
  },

  publish: [
    {
      provider: "github",
      owner: "florianwiech",
      repo: "codewaffle",
      releaseType: "release",
    },
  ],
};
