# 🚀 Automation Exercise (Playwright + TypeScript)

A full end-to-end and API automation project built using **Playwright with TypeScript**, focused on testing real-world user flows, handling flaky behavior, and structuring a scalable test framework.

---

## 📌 Overview

This project was developed over ~8 days as a complete automation solution covering:

* ✅ UI Functional Testing
* ✅ End-to-End (E2E) Flows
* ✅ API Testing
* ✅ Edge Case Detection

It includes **61 automated tests** (UI + API), with documented failures highlighting real issues in the target application.

---

## 🧠 Key Highlights

* Built a **modular test architecture** (flows, pages, utils, fixtures)
* Identified and documented **7+ real API edge case failures**
* Handled **async issues and race conditions** (missing awaits, timing issues)
* Solved **headless vs headed browser inconsistencies**
* Implemented **CI pipeline with GitHub Actions**
* Used **data-driven testing** (JSON-based test data)
* Managed **authentication state (save/load sessions)**

---

## 🗂️ Project Structure

```
tests/        # UI test specifications
e2e/          # End-to-end test scenarios

pages/        # Page Object Model (UI interactions)
components/   # Reusable UI components

flows/        # Business logic flows (multi-step actions)
utils/        # Reusable helper functions

api/          # API testing logic

fixtures/     # Shared test fixtures
data/         # Test data (auth, inputs, etc.)

downloads/    # Files downloaded during test execution
```

---

## ⚙️ Tech Stack

* **Playwright**
* **TypeScript**
* **Node.js**
* **GitHub Actions (CI)**

---

## ▶️ How to Run

1. Clone the repository:

```
git clone https://github.com/abody2k/automation-exercise.git
```

2. Install dependencies:

```
npm install
```

3. Run all tests:

```
npx playwright test tests/ e2e/
```

---

## 🧪 Test Coverage

* ✔️ 26 UI Test Cases
* ✔️ 14 API Test Cases
* ✔️ 7+ API Edge Cases (failing due to actual application issues)

### Includes:

* Functional testing (happy paths + edge cases)
* Authentication flows
* File upload handling
* Dialog/alert handling
* Timing and synchronization handling

---

## ⚠️ Known Issues (Intentional Findings)

Some tests are expected to fail due to **real bugs or inconsistent behavior** in the application under test.

These are:

* Clearly documented in test cases
* Reproducible via automation
* Not “fixed” artificially to force passing results

---

## 🧩 Notable Challenges & Solutions

### 1. Async / Missing `await`

* Caused flaky and incomplete test execution
* ✅ Fixed by enforcing proper async handling across flows

### 2. Headless Mode Failures

* Certain UI interactions failed in headless mode
* ✅ Resolved using targeted waits and synchronization

### 3. File Upload Instability

* No reliable event to wait for
* ✅ Used minimal `waitForTimeout` as a controlled fallback

### 4. Test Architecture Refactor

* Initial utility-heavy structure was hard to scale
* ✅ Refactored into **flows (business logic)** vs **utils (generic helpers)**

---

## 📈 What I Learned

* Designing scalable test frameworks
* Debugging flaky automation tests
* Structuring E2E vs API testing layers
* Handling real-world CI issues
* Writing maintainable and reusable test logic

---

## 📎 Notes

* `icon.ico` is used for file upload testing in the "Contact Us" flow

---

## 👤 Author

**Abdulrahman Alhamdani**

---
