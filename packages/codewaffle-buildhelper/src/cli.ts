#!/usr/bin/env node
import yargs, { Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import { build, BuildOptions } from "./build.js";
import { test, TestOptions } from "./test.js";

yargs(hideBin(process.argv))
  .command<BuildOptions>("build", "bundle package", buildArgs, build)
  .command<TestOptions>("test", "test source code", testArgs, test)
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

function testArgs(args: Argv) {
  return args.option("env", {
    describe: 'choose an environment',
    default: "react",
    choices:["node", "react"]
  })
}
