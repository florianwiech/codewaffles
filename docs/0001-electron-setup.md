# Electron Bundle & Dev Setup

- Status: accepted
- Deciders: Florian Wiech
- Date: 2022-08

## Context and Problem Statement

There are two bundling options for electron: electron-forge & electron-builder.
Which one should I use to bundle my app?

## Considered Options

- electron-forge
- electron-builder + Vite

## Decision Outcome

Chosen option: "electron-builder + Vite", because I have more configurations & technology options.
It seems to me that there are more open-source apps that use the electron-builder.
That means I have more resources to learn from others.

## Pros and Cons of the Options

### electron-forge

- [Electron Forge](https://www.electronforge.io/): A complete tool for building modern Electron applications.

Up to [Version 0.5.0](https://github.com/florianwiech/codewaffle/tree/v0.5.0) CodeWaffle used electron-forge.

- Good, because it provides ready to use dev & bundle setup.
- Good, because one config for everything.
- Bad, because electrons own auto-updater needs a dedicated release server (additional infrastructure necessary).
- Bad, because for quite some time in beta now. Question is when it is fully ready and maintained.
- Bad, because not possible to set ESM default in the `package.json`.

### electron-builder + Vite

- [electron-builder](https://github.com/electron-userland/electron-builder): A complete solution to package and build a ready for distribution Electron app with “auto update” support out of the box
- [Vite](https://github.com/vitejs/vite) is a new breed of frontend build tooling that significantly improves the frontend development experience.
- [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder/): Good working electron setup. I do have to adapt it that it can handle multiple windows.

* Good, because electron-builder brings its own auto-updater that works on every major platform.
* Good, because seems to be used more often (nearly all the open-source projects I looked at used electron-builder).
* Good, because I have more configuration options and free to choose different technology for dev setup.
* Good, because I can embrace ESM.
* Bad, because electron-builder is only a builder, you have to do the dev setup yourself.
* Bad, because more project setup must be done on my side.
