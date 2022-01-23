/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
};

module.exports = config;
