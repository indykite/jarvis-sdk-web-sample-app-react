module.exports = {
    testEnvironment: "jest-environment-jsdom",
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
    ],
    coverageReporters: [
      "clover",
      ["text", { skipFull: true }],
      "text-summary",
      "json-summary",
      "html",
    ],
    coverageThreshold: {
      global: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
    setupFilesAfterEnv: ["<rootDir>/src/setup-tests.js"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleDirectories: ["src", "node_modules"],
    moduleNameMapper: {
      "\\.css$": "<rootDir>/src/fileMock.js",
      "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/src/fileMock.js",
    },
  };
  
