const config = {
  transform: {},
  testTimeout: 15000,
  globalSetup: "./test/config/globalSetup.js",
  globalTeardown: "./test/config/globalTeardown.js",
  setupFilesAfterEnv: [
    // "<rootDir>/test/setupFile.ts",
    "./test/config/setup.js",
    "./test/config/teardown.js",
  ],
};

export default config;
