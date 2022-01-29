import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import typescript from "@rollup/plugin-typescript";
import filesize from "rollup-plugin-filesize";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx", ".svg"];

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
    peerDepsExternal(),
    commonjs(),
    nodeResolve({ extensions }),
    babel({ extensions, exclude: "node_modules/**", runtimeHelpers: true }),
    typescript({ tsconfig: "./tsconfig.json" }),
    filesize(),
  ],
};

export default config;
