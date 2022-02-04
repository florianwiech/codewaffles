import jest from "jest";
import { nodeConfig, reactConfig } from "./jest-config";

export type TestOptions = {
  env: "node" | "react";
};

export async function test(options: TestOptions) {
  const argv = [];

  if (options.env === "node") argv.push("--config", JSON.stringify(nodeConfig));
  if (options.env === "react") argv.push("--config", JSON.stringify(reactConfig));

  argv.push("--coverage");

  await jest.run(argv, ".");
}
