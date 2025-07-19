# Jest Example

This project is a boilerplate setup for API testing using [Jest](https://jestjs.io/), `supertest`, and `axios-mock-adapter`. It includes coverage reporting and HTML test reports.

---

## 📦 Project Structure

```
├── __tests__/          # Contains all Jest test files
│   └── auth/           # Example test group (auth.test.js)
├── utils/              # Helper functions for tests
├── .env                # Environment variables for test setup
├── jest.config.js      # Centralized Jest configuration
├── package.json        # NPM scripts and dependencies
├── coverage/           # Auto-generated test coverage
├── jest-html-reporters-attach/ # Attachments for HTML report
├── jest_html_reporters.html    # Test result HTML report
└── README.md
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run tests

```bash
npm test
```

### 3. Run specific tests (with HTML reporter)

```bash
npm run test:only
```

### 4. Run tests with coverage

```bash
npm run test:coverage
```

### 5. Run tests in watch mode (for development)

```bash
npm run test:watch
```

---

## 📊 Test Reports

* **Coverage**: Generated in the `coverage/` directory (`lcov-report/index.html` for visual view).
* **HTML Test Report**: Generated at `jest_html_reporters.html`.

To open the HTML test report, run:

```bash
open jest_html_reporters.html
# or
xdg-open jest_html_reporters.html
```

---

## 💠 Tech Stack

* [Jest](https://jestjs.io/)
* [Supertest](https://github.com/visionmedia/supertest)
* [Axios](https://axios-http.com/)
* [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter)
* [jest-html-reporters](https://www.npmjs.com/package/jest-html-reporters)

---

## 📁 Environment Variables

Set environment variables in a `.env` file. Example:

```
BASE_URL=https://api.example.com
```

---

## ✅ Best Practices

* Use descriptive test names.
* Keep test data isolated.
* Use `.env` and `dotenv/config` for environment setup.
* Collect coverage to monitor test quality.

---
