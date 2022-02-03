// I did not install @types/rollup-plugin-peer-deps-external because it depends on rollup@0.63.4
// The rollup Plugin type does not match between rollup@0.63.4 and rollup@2.
// So we use the types here and rely on the rollup@2 Plugin type alias.
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/rollup-plugin-peer-deps-external/index.d.ts

declare module "rollup-plugin-peer-deps-external" {
  import { Plugin } from "rollup";

  declare namespace PeerDepsExternalPlugin {
    interface PluginPeerDepsExternalOptions {
      packageJsonPath?: string | undefined;
      includeDependencies?: boolean | undefined;
    }
  }

  declare function PeerDepsExternalPlugin(options?: PeerDepsExternalPlugin.PluginPeerDepsExternalOptions): Plugin;

  export = PeerDepsExternalPlugin;
}
