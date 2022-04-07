import { dialog } from "electron";
import { autoUpdater } from "electron-updater";
import { getOrCreateMainWindow } from "./windows/main-window";
import { setupMenu } from "./menu/setup-menu";

autoUpdater.autoDownload = false;
let isSilent: boolean;
let updateDownloaded = false;

export let checkUpdateMenuItemLabel = "Check for Updates";
export let checkUpdateMenuItemEnabled = false;

export const setupAutoUpdateHandlers = () => {
  autoUpdater.on("checking-for-update", () => {
    sendStatusToWindow("Checking for Update...");
  });

  autoUpdater.on("error", (error) => {
    sendStatusToWindow(`Error in autoUpdater. ${error}`);
    changeUpdaterMenu({ label: "Check for Updates", enabled: true });
    if (isSilent) return;
    dialog.showErrorBox("Error during the update", `Application couldn't be updated. Please try again.`);
  });

  autoUpdater.on("update-available", () => {
    sendStatusToWindow("Update available.");
    if (isSilent) {
      autoUpdater.downloadUpdate().then();
      return;
    }
    dialog
      .showMessageBox({
        type: "info",
        title: "Found Updates",
        message: "New updates are available, do you want install now?",
        defaultId: 0,
        cancelId: 1,
        buttons: ["Yes", "No"],
      })
      .then(({ response: buttonIndex }) => {
        if (buttonIndex === 0) {
          autoUpdater.downloadUpdate().then();
        } else {
          changeUpdaterMenu({ label: "Check for Updates", enabled: true });
        }
      });
  });

  autoUpdater.on("update-not-available", () => {
    sendStatusToWindow("Update not available.");
    changeUpdaterMenu({ label: "Check for Updates", enabled: true });
    if (isSilent) return;
    dialog
      .showMessageBox({
        title: "No Updates",
        message: "Current version is up-to-date.",
      })
      .then();
  });

  autoUpdater.on("update-downloaded", () => {
    sendStatusToWindow("Updates downloaded.");
    updateDownloaded = true;
    changeUpdaterMenu({ label: "Updates available", enabled: true });
    if (isSilent) return;
    dialog
      .showMessageBox({
        title: "Install Updates",
        message: "Updates are ready to be installed.",
        defaultId: 0,
        cancelId: 1,
        buttons: ["Install and restart", "Close"],
      })
      .then(({ response: buttonIndex }) => {
        if (buttonIndex === 0) {
          setImmediate(() => autoUpdater.quitAndInstall());
        } else {
          changeUpdaterMenu({ label: "Updates available", enabled: true });
        }
      });
  });
};

export function checkForUpdates({ silent }: { silent: boolean }) {
  isSilent = silent;
  changeUpdaterMenu({ label: "Checking for Updates...", enabled: false });
  if (updateDownloaded) {
    dialog
      .showMessageBox({
        title: "Available Updates",
        message: "New updates are available and ready to be installed.",
        defaultId: 0,
        cancelId: 1,
        buttons: ["Install and restart", "Close"],
      })
      .then(({ response: buttonIndex }) => {
        if (buttonIndex === 0) {
          setImmediate(() => autoUpdater.quitAndInstall());
        } else {
          changeUpdaterMenu({ label: "Updates available", enabled: true });
        }
      });
  } else {
    autoUpdater.checkForUpdates().then();
  }
}

const changeUpdaterMenu = ({ label, enabled }: { label: string; enabled: boolean }) => {
  sendStatusToWindow(`changeUpdaterMenu, ${label}, ${enabled}`);

  checkUpdateMenuItemLabel = label;
  checkUpdateMenuItemEnabled = enabled;

  setupMenu();
};

const sendStatusToWindow = (text: string) => {
  getOrCreateMainWindow().webContents.send("DEBUG_ON_AUTO_UPDATE", text);
};
