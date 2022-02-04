import jest from "jest";
import { nodeConfig, reactConfig } from "./jest-config.mjs";

/**
 * @typedef {Object} TestOptions
 * @property {"node" | "react"} env
 */

/**
 * @param {TestOptions} options
 */
export async function test(options) {
  const argv = [];

  if (options.env === "node") argv.push("--config", JSON.stringify(nodeConfig));
  if (options.env === "react") argv.push("--config", JSON.stringify(reactConfig));

  argv.push("--coverage");

  await jest.run(argv, ".");
}
