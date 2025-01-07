/**
 * @fileoverview Utility function for logging in as an admin to a WordPress site.
 *
 * This module provides a reusable function for programmatically logging in
 * as an administrator using Playwright, leveraging credentials stored in
 * environment variables.
 */

require("dotenv").config();

/**
 * Logs in as an administrator to the WordPress admin dashboard.
 *
 * This function navigates to the WordPress login page, fills in the admin
 * credentials (username and password), and submits the login form.
 *
 * @async
 * @param {object} page - The Playwright `Page` object representing a browser tab.
 * @throws Will throw an error if the login process fails due to incorrect credentials or page navigation issues.
 */
const adminLogin = async (page) => {
  // Navigate to the WordPress login page
  await page.goto(`${process.env.WP_BASE_URL}wp-login.php`);

  // Locate the username field and input the admin username from environment variables
  const userNameField = page.locator('//input[@id="user_login"]');
  await userNameField.fill(`${process.env.WP_USERNAME}`);

  // Locate the password field and input the admin password from environment variables
  const passwordField = page.locator('//input[@id="user_pass"]');
  await passwordField.fill(`${process.env.WP_PASSWORD}`);

  // Locate the login button and click it to submit the login form
  const loginBtn = page.locator('//input[@id="wp-submit"]');
  await loginBtn.click();
};

module.exports = {
  adminLogin,
};
