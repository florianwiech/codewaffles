import type { MenuItemConstructorOptions } from "electron";

export function getWindowMenu(): MenuItemConstructorOptions {
  const submenu: MenuItemConstructorOptions[] = [
    {
      label: "Minimize",
      accelerator: "CmdOrCtrl+M",
      role: "minimize",
    },
  ];

  if (process.platform === "darwin") {
    submenu.push(
      {
        type: "separator",
      },
      {
        label: "Bring All to Front",
        role: "front",
      },
    );
  }

  return {
    label: "Window",
    role: "window",
    submenu,
  };
}
