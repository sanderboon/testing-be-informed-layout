module.exports = {
  testURL: "http://localhost",
  rootDir: "./src",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: "General Layout Unit Tests",
        outputDirectory: "./jest",
        outputName: "test-result.xml"
      }
    ]
  ],
  collectCoverage: true,
  coverageDirectory: "../coverage",
  coverageReporters: ["lcov", "html"],
  verbose: false,
  automock: false
};
