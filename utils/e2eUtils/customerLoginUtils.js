/**
 * customerUserLogin - Automates the login process for a customer user on a WooCommerce site.
 *
 * @param {object} page - The Playwright page object used for browser interactions.
 * @param {string} userName - The username of the customer user to log in.
 * @param {string} password - The password of the customer user.
 *
 * @description
 * This function automates the login process for a customer user by:
 * - Navigating to the "My Account" page of the WooCommerce site.
 * - Filling in the username and password fields with the provided credentials.
 * - Clicking the "Log in" button to submit the login form.
 *
 * It is designed for use in end-to-end tests where customer interactions with the WooCommerce site are tested, such as placing orders, viewing account details, and interacting with products.
 *
 * @example
 * const { customerUserLogin } = require('./customerLoginUtils');
 * await customerUserLogin(page, 'testUser', 'testPassword123');
 */

const customerUserLogin = async (page, userName, password) => {
  // Navigate to the WooCommerce "My Account" login page
  await page.goto(`${process.env.WP_BASE_URL}my-account`);

  // Locate the username field and fill it with the provided username
  const userNameField = page.locator('//input[@id="username"]');
  await userNameField.fill(userName);

  // Locate the password field and fill it with the provided password
  const passwordField = page.locator('//input[@id="password"]');
  await passwordField.fill(password);

  // Locate the login button and click it to submit the login form
  const loginBtn = page.locator('//button[@value="Log in"]');
  await loginBtn.click();
};

module.exports = {
  customerUserLogin,
};
