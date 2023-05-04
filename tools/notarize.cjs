const { notarize } = require("electron-notarize");

/**
 * @param {import("electron-builder").AfterPackContext} context
 * @returns {(Promise<any> | any)}
 */
exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== "darwin") {
    return;
  }

  if (process.env.IS_PULL_REQUEST) {
    console.log(`In PR, skipping notarization`);
    return;
  }

  if (!process.env.CI) {
    console.log(`Not in CI, skipping notarization`);
    return;
  }

  if (!process.env.TEAM_ID || !process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
    console.warn("Should be notarizing, but environment variables APPLE_ID or APPLE_ID_PASSWORD are missing!");
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId: "app.codewaffle",
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
    ascProvider: process.env.TEAM_ID,
  });
};
