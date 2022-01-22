#!/usr/bin/env node
// import { readFile } from "fs/promises";
// import { build, Plugin } from "esbuild";
// import type { Template } from "@svgr/babel-plugin-transform-svg-component";
// import { transform } from "@svgr/core";
const { build } = require("esbuild");
const svgrPlugin = require("esbuild-plugin-svgr");
const { getFiles } = require("./buildUtils.cjs");

// export const template: Template = (variables, { tpl }) => {
//   return tpl`
// ${variables.imports};
//
// ${variables.interfaces};
//
// export const ${variables.componentName} = (${variables.props}) => (
//   ${variables.jsx}
// );
//
// ${variables.exports};
// `;
// };
//
// const svgrPlugin = (options = {}): Plugin => ({
//   name: "svgr",
//   setup(build) {
//     build.onLoad({ filter: /\.svg$/ }, async (args) => {
//       const svg = await readFile(args.path, "utf8");
//       const contents = await transform(
//         svg,
//         { template: template, ...options },
//         {
//           filePath: args.path,
//         },
//       );
//       return {
//         contents,
//         loader: "jsx",
//       };
//     });
//   },
// });

const extensions = [".js", ".ts", ".jsx", ".tsx"];
const excludeExtensions = [".spec.ts", ".spec.ts", ".spec.jsx", ".spec.tsx"];

build({
  entryPoints: [...getFiles("./src", extensions, excludeExtensions)],
  // jsx: "",
  format: "esm",
  outdir: "dist",
  // outfile: "dist/index.js",
  sourcemap: "external",
  // external: ["react", "react-dom", "styled-components"],
  plugins: [svgrPlugin({ exportType: "named" })],
}).catch(() => process.exit(1));
