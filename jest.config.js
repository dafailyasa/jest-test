module.exports = {
  // Use Node.js as the environment since we're testing APIs
  testEnvironment: 'node',

  // Automatically clear mock calls and instances before every test
  clearMocks: true,

  // Look for test files only inside the __tests__ folder
  testMatch: ['**/__tests__/**/*.test.js'],

  // Setup environment variables before any test runs
  setupFiles: ['dotenv/config'],

  // Set global timeout for async tests (e.g. external API requests)
  testTimeout: 10000, // 10 seconds

  // Enable code coverage collection
  collectCoverage: true,
  collectCoverageFrom: [
    '__tests__/**/*.js',
    'utils/**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/dist/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: ['/node_modules/', '/mocks/', '/config/'],

  // Use HTML reporter
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports',
        filename: 'master-report.html',
        openReport: false,
        expand: true,
      },
    ],
  ],

  // Show detailed test results
  verbose: true,

  // Disable transform unless using Babel or other compilers
  transform: {},
};
