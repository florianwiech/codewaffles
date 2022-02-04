#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { build } from "../scripts/build.mjs";
import { test } from "../scripts/test.mjs";

yargs(hideBin(process.argv))
  .command("build", "bundle package", buildArgs, build)
  .command("test", "test source code", testArgs, test)
  .demandCommand(1)
  .help("h")
  .alias("h", "help")
  .parse();

/**
 * @param {import("yargs").Argv} args
 */
function buildArgs(args) {
  return args.option("i", {
    alias: "input",
    describe: "the URL to make an HTTP request to",
    default: "./src/index.ts",
  });
}

/**
 * @param {import("yargs").Argv} args
 */
function testArgs(args) {
  return args.option("env", {
    describe: "choose an environment",
    default: "react",
    choices: ["node", "react"],
  });
}
