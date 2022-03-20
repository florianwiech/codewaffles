import { app, session } from "electron";

// Based on:
// https://www.electronjs.org/docs/latest/tutorial/security
// and
// https://github.com/reZach/secure-electron-template/tree/e2a7df9f8eef30a57c137616a8f69d37186f0c24
//
// Check are done via electrongravity. Although it seems that LIMIT_NAVIGATION_GLOBAL_CHECK is not resolved.
// Not sure if there is still a problem with the setup or if it's a false positive as marked in the quote:
// > Note - there are limitations of AST/DOM parsing (which the package uses) to verify secure practices. Some results of the report are false positives (ie. `LIMIT_NAVIGATION_GLOBAL_CHECK` and `PERMISSION_REQUEST_HANDLER_GLOBAL_CHECK`).
// https://github.com/reZach/secure-electron-template/blob/e2a7df9f8eef30a57c137616a8f69d37186f0c24/docs/scripts.md#audit-your-application
export function setupSecurityHandlers() {
  const partition = "default";
  session.fromPartition(partition).setPermissionRequestHandler((webContents, permission, permCallback) => {
    const allowedPermissions: string[] = []; // Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest

    if (allowedPermissions.includes(permission)) {
      permCallback(true); // Approve permission request
    } else {
      // eslint-disable-next-line no-console
      console.error(
        `The application tried to request permission for '${permission}'. This permission was not whitelisted and has been blocked.`,
      );

      permCallback(false); // Deny
    }
  });

  // https://www.electronjs.org/docs/latest/tutorial/security#13-disable-or-limit-navigation
  app.on("web-contents-created", (event, contents) => {
    contents.on("will-navigate", (contentsEvent, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);
      const validOrigins: string[] = [];

      // Log and prevent the app from navigating to a new page if that page's origin is not whitelisted
      if (!validOrigins.includes(parsedUrl.origin)) {
        // eslint-disable-next-line no-console
        console.error(
          `The application tried to navigate to the following address: '${parsedUrl}'. This origin is not whitelisted and the attempt to navigate was blocked.`,
        );

        contentsEvent.preventDefault();
      }
    });

    contents.on("will-redirect", (contentsEvent, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);
      const validOrigins: string[] = [];

      // Log and prevent the app from redirecting to a new page
      if (!validOrigins.includes(parsedUrl.origin)) {
        // eslint-disable-next-line no-console
        console.error(
          `The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`,
        );

        contentsEvent.preventDefault();
      }
    });

    // https://www.electronjs.org/docs/latest/tutorial/security#12-verify-webview-options-before-creation
    contents.on("will-attach-webview", (contentsEvent, webPreferences, params) => {
      // Strip away preload scripts if unused or verify their location is legitimate
      delete webPreferences.preload;
      // @ts-ignore
      delete webPreferences.preloadURL;

      // Disable Node.js integration
      webPreferences.nodeIntegration = false;

      event.preventDefault();
    });

    // https://www.electronjs.org/docs/latest/tutorial/security#14-disable-or-limit-creation-of-new-windows
    // This code replaces the old "new-window" event handling;
    // https://github.com/electron/electron/pull/24517#issue-447670981
    contents.setWindowOpenHandler(({ url }) => {
      const parsedUrl = new URL(url);
      const validOrigins: string[] = [];

      // Log and prevent opening up a new window
      if (!validOrigins.includes(parsedUrl.origin)) {
        // eslint-disable-next-line no-console
        console.error(
          `The application tried to open a new window at the following address: '${url}'. This attempt was blocked.`,
        );

        return {
          action: "deny",
        };
      }

      return {
        action: "allow",
      };
    });
  });
}
