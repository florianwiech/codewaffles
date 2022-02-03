#!/usr/bin/env node
import yargs, { Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import { build, BuildOptions } from "../src/build.js";

yargs(hideBin(process.argv))
  .command<BuildOptions>("build", "bundle package", buildArgs, build)
  .demandCommand(1)
  .help("h")
  .alias("h", "help")
  .parse();

function buildArgs(args: Argv) {
  return args.option("i", {
    alias: "input",
    describe: "the URL to make an HTTP request to",
    default: "./src/index.ts",
  });
}
