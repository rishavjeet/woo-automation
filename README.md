# WordPress WooCommerce E2E Testing with Playwright

This repository contains a set of end-to-end (E2E) test scripts designed to automate various processes in WordPress. The tests are written using the **wp-e2e-utils-playwright** framework functions, providing a powerful and flexible solution for testing WordPress websites.

The test scripts in this repository cover the following areas:

- **Product Management**
  - Create a simple product.
  - Add product categories and tags.
  - Upload product images.
  - Set pricing and inventory.
  - Publish and verify product visibility.

- **Coupon Management**
  - Create different types of coupons (percentage, fixed amount).
  - Apply coupons during checkout.
  - Verify discount calculations.

- **User Management**
  - Create a customer user.
  - Customer places an order.
  - Admin/Store manager reviews the order.

### Exclusive Features

- **wp-e2e-utils-playwright Framework**: The tests are written using the **wp-e2e-utils-playwright** framework functions, which streamline the process of automating interactions with a WordPress site. This framework helps interact with the WordPress admin panel, as well as simulating user behavior on the frontend.

- **Test Data Cleanup**: Each test script includes a **data cleanup** feature to ensure that the site storage is not overpopulated with test data. After each test execution, the relevant test data (e.g., products, users, coupons) is removed, maintaining a clean environment for subsequent tests.

## Table of Contents

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Running the Tests](#running-the-tests)

## Installation

To get started, follow the steps below to set up the testing environment.

1. **Clone the repository**:

```bash
git clone https://github.com/rishavjeet/test-automation-hands-on.git
```
2. **Install the dependencies**:

This project uses npm to manage dependencies. Make sure you have Node.js and npm installed. Then, run the following command to install the required packages:

```bash
npm install
```
2. **Install the dependencies**:

Create a .env file in the root directory of the project. You will need to add your WordPress admin credentials and other relevant environment configurations.

```bash
WP_USERNAME=
WP_PASSWORD=
WP_BASE_URL=
```

## Prerequisites

Before running the test scripts, ensure that you have the following:

Node.js (version 14 or later)
npm (Node Package Manager)
Playwright (installed automatically through npm)
WordPress site setup for testing (local or staging environment)

## Running the Tests

Once the environment is set up, you can run the test scripts using Playwright’s test runner.

1. Run all tests:

```bash
npx playwright test
```
2. Run a specific test script:

```bash
npx playwright test path/to/test-script.spec.js
```
*Replace `path/to/test-script.spec.js` with the path to the specific test script you want to run*