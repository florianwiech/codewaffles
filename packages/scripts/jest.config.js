/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
};

module.exports = config;
