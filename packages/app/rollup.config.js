import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import svgr from "@svgr/rollup";
import visualizer from "rollup-plugin-visualizer";

/**
 * @type {import("rollup").RollupOptions}
 */
const config = {
  input: ["./src/index.ts"],
  output: {
    dir: "build",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
  plugins: [
    external(),
    svgr({ exportType: "named" }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "build",
    }),
    visualizer({
      filename: "artifacts/stats.html",
    }),
  ],
  external: ["react", "react-dom", "styled-components"],
};

export default config;
