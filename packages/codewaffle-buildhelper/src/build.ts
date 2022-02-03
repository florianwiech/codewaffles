import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import * as fs from "fs";
import { dirname, join } from "path";
import { OutputAsset, OutputChunk, rollup, RollupBuild } from "rollup";
import dts from "rollup-plugin-dts";
import filesize from "rollup-plugin-filesize";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export type BuildOptions = {
  input: string;
};

const extensions = [".js", ".jsx", ".ts", ".tsx", ".svg"];

const babelrc = {
  presets: ["@babel/preset-typescript", "@babel/preset-react"],
  plugins: ["babel-plugin-styled-components", "babel-plugin-inline-react-svg"],
};

export async function build(options: BuildOptions) {
  const src = dirname(options.input),
    root = dirname(src),
    dist = join(root, "dist");

  const bundle = await rollup({
    input: options.input,
    plugins: [
      peerDepsExternal(),
      commonjs(),
      nodeResolve({ extensions }),
      babel({
        extensions,
        exclude: "node_modules/**",
        babelHelpers: "bundled",
        ...babelrc
      }),
      filesize(),
    ],
  });

  await emit(bundle, {
    format: "cjs",
    file: join(dist, "index.cjs"),
    sourcemap: true,
  });

  await emit(bundle, {
    format: "esm",
    file: join(dist, "index.js"),
    sourcemap: true,
  });

  const tscBundle = await rollup({
    input: options.input,
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  });

  await emit(tscBundle, {
    format: "esm",
    file: join(dist, "index.d.ts"),
  });
}

async function emit(bundle: RollupBuild, conf: any) {
  let result = await bundle.generate(conf);
  let dir = dirname(conf.file);
  await fs.promises.mkdir(dir, { recursive: true }).catch(() => null);
  for (let file of result.output) {
    let content = isOutputChunk(file) ? file.code : file.source;

    if (isOutputChunk(file) && file.map) {
      content = content + `//# sourceMappingURL=${file.fileName}.map\n`;
      await fs.promises.writeFile(join(dir, file.fileName + ".map"), file.map.toString());
    }

    await fs.promises.writeFile(join(dir, file.fileName), content);
  }
}

const isOutputChunk = (output: OutputChunk | OutputAsset): output is OutputChunk => output.type === "chunk";
