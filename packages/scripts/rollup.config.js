import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

/**
 * @type {import("rollup").RollupOptions}
 */
const config = {
  input: ["./src/index.ts"],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    //
    commonjs(),
    nodeResolve(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
};

export default config;
