const nextJest = require("next/jest");

const createJestConfig = nextJest();

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
