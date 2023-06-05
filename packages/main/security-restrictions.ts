import { URL } from "url";
import type { Session, WebContents, Event } from "electron";
import { shell } from "electron";

// Based on:
// https://www.electronjs.org/docs/latest/tutorial/security
// https://github.com/reZach/secure-electron-template/tree/e2a7df9f8eef30a57c137616a8f69d37186f0c24
// https://github.com/cawa-93/vite-electron-builder
//
// Checks are done via electronegravity. Although it seems that LIMIT_NAVIGATION_GLOBAL_CHECK is not resolved.
// Not sure if there is still a problem with the setup or if it's a false positive as marked in the quote:
// > Note - there are limitations of AST/DOM parsing (which the package uses) to verify secure practices. Some results of the report are false positives (ie. `LIMIT_NAVIGATION_GLOBAL_CHECK` and `PERMISSION_REQUEST_HANDLER_GLOBAL_CHECK`).
// https://github.com/reZach/secure-electron-template/blob/e2a7df9f8eef30a57c137616a8f69d37186f0c24/docs/scripts.md#audit-your-application

/**
 * Union for all existing permissions in electron
 */
type Permission = Parameters<Exclude<Parameters<Session["setPermissionRequestHandler"]>[0], null>>[1];

/**
 * List of origins that you allow open INSIDE the application and permissions for each of them.
 *
 * In development mode you need allow open `VITE_DEV_SERVER_URL` for each window
 */
const ALLOWED_ORIGINS_AND_PERMISSIONS = new Map<string, Set<Permission>>(
  import.meta.env.DEV &&
  import.meta.env.VITE_HOME_DEV_SERVER_URL &&
  import.meta.env.VITE_EDITOR_DEV_SERVER_URL &&
  import.meta.env.VITE_SETTINGS_DEV_SERVER_URL
    ? [
        [new URL(import.meta.env.VITE_HOME_DEV_SERVER_URL).origin, new Set()],
        [new URL(import.meta.env.VITE_EDITOR_DEV_SERVER_URL).origin, new Set()],
        [new URL(import.meta.env.VITE_SETTINGS_DEV_SERVER_URL).origin, new Set()],
      ]
    : [],
);

/**
 * List of origins that you allow open IN BROWSER.
 * Navigation to origins below is possible only if the link opens in a new window
 *
 * @example
 * <a
 *   target="_blank"
 *   href="https://github.com/"
 * >
 */
const ALLOWED_EXTERNAL_ORIGINS = new Set<`https://${string}`>([]);

export const securityRestrictions = (_: Event, contents: WebContents) => {
  /**
   * Block navigation to origins not on the allowlist.
   *
   * Navigation is a common attack vector. If an attacker can convince the app to navigate away
   * from its current page, they can possibly force the app to open web sites on the Internet.
   *
   * @see https://www.electronjs.org/docs/latest/tutorial/security#13-disable-or-limit-navigation
   */
  contents.on("will-navigate", (event, url) => {
    const { origin } = new URL(url);

    if (ALLOWED_ORIGINS_AND_PERMISSIONS.has(origin)) {
      return;
    }

    // Prevent navigation
    event.preventDefault();

    if (import.meta.env.DEV) {
      console.warn(
        `The application tried to navigate to the following address: '${url}'. This origin is not allow-listed and the attempt to navigate was blocked.`,
      );
    }
  });

  contents.on("will-redirect", (event, url) => {
    const { origin } = new URL(url);

    if (ALLOWED_ORIGINS_AND_PERMISSIONS.has(origin)) {
      return;
    }

    // Prevent navigation
    event.preventDefault();

    if (import.meta.env.DEV) {
      console.warn(`The application tried to redirect to the following address: '${url}'. This attempt was blocked.`);
    }
  });

  /**
   * Block requested forbidden permissions.
   * By default, Electron will automatically approve all permission requests.
   *
   * @see https://www.electronjs.org/docs/latest/tutorial/security#5-handle-session-permission-requests-from-remote-content
   */
  contents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    const { origin } = new URL(webContents.getURL());

    const permissionGranted = !!ALLOWED_ORIGINS_AND_PERMISSIONS.get(origin)?.has(permission);
    callback(permissionGranted);

    if (!permissionGranted && import.meta.env.DEV) {
      console.warn(
        `The '${origin}' origin tried to request permission for '${permission}'. This permission was not allow-listed and has been blocked.`,
      );
    }
  });

  /**
   * Hyperlinks to allowed sites open in the default browser.
   *
   * The creation of new `webContents` is a common attack vector. Attackers attempt to convince the app to create new windows,
   * frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.
   * You should deny any unexpected window creation.
   *
   * @see https://www.electronjs.org/docs/latest/tutorial/security#14-disable-or-limit-creation-of-new-windows
   * @see https://www.electronjs.org/docs/latest/tutorial/security#15-do-not-use-openexternal-with-untrusted-content
   * @see https://github.com/electron/electron/pull/24517#issue-447670981
   */
  contents.setWindowOpenHandler(({ url }) => {
    const { origin } = new URL(url);

    // @ts-expect-error Type checking is performed in runtime
    if (ALLOWED_EXTERNAL_ORIGINS.has(origin)) {
      // Open default browser
      shell.openExternal(url).catch(console.error);
    } else if (import.meta.env.DEV) {
      console.warn(
        `The application tried to open a new window at the following address: '${url}'. This attempt was blocked.`,
      );
    }

    // Prevent creating new window in application
    return { action: "deny" };
  });

  /**
   * Verify webview options before creation
   *
   * Strip away preload scripts, disable Node.js integration, and ensure origins are on the allowlist.
   *
   * @see https://www.electronjs.org/docs/latest/tutorial/security#12-verify-webview-options-before-creation
   */
  contents.on("will-attach-webview", (event, webPreferences, params) => {
    const { origin } = new URL(params.src);
    if (!ALLOWED_ORIGINS_AND_PERMISSIONS.has(origin)) {
      if (import.meta.env.DEV) {
        console.warn(`A webview tried to attach ${params.src}, but was blocked.`);
      }

      event.preventDefault();
      return;
    }

    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload;
    // @ts-expect-error `preloadURL` exists - see https://www.electronjs.org/docs/latest/api/web-contents#event-will-attach-webview
    delete webPreferences.preloadURL;

    // Disable Node.js integration
    webPreferences.nodeIntegration = false;
  });
};
