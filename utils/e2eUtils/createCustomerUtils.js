/**
 * addCustomerUser - Automates the creation of a new customer user in WordPress admin.
 *
 * @param {object} admin - The admin object used to perform admin-specific operations.
 * @param {object} page - The Playwright page object for interacting with the browser.
 * @param {string} userName - The username for the new customer user.
 * @param {string} userEmail - The email address of the new customer user.
 * @param {string} firstName - The first name of the new customer user.
 * @param {string} lastName - The last name of the new customer user.
 * @param {string} password - The password for the new customer user.
 *
 * @description
 * This function automates the process of creating a new customer user in the WordPress admin dashboard by:
 * - Navigating to the "Add New User" page.
 * - Filling in the required fields such as username, email, first name, last name, and password.
 * - Setting the user role as "Customer".
 * - Clicking the "Add New User" button to create the user.
 *
 * This utility is particularly useful for testing and managing customer-related functionality in WordPress and WooCommerce environments.
 *
 * @example
 * const { addCustomerUser } = require('./createCustomerUtils');
 * await addCustomerUser(admin, page, 'john_doe', 'john@example.com', 'John', 'Doe', 'securePassword123');
 */

const addCustomerUser = async (
  admin,
  page,
  userName,
  userEmail,
  firstName,
  lastName,
  password
) => {
  // Navigate to the "Add New User" page in the WordPress admin dashboard
  await admin.visitAdminPage("user-new.php");

  // Fill in the username field with the provided value
  const userNameField = page.locator('//input[@id="user_login"]');
  await userNameField.fill(userName);

  // Fill in the email field with the provided value
  const emailField = page.locator('//input[@id="email"]');
  await emailField.fill(userEmail);

  // Fill in the first name field with the provided value
  const firstNameField = page.locator('//input[@id="first_name"]');
  await firstNameField.fill(firstName);

  // Fill in the last name field with the provided value
  const lastNameField = page.locator('//input[@id="last_name"]');
  await lastNameField.fill(lastName);

  // Fill in the password field with the provided value
  const passwordField = page.locator('//input[@id="pass1"]');
  await passwordField.fill(password);

  // Set the user role to "Customer" in the dropdown
  const userRoleField = page.locator('//select[@id="role"]');
  await userRoleField.selectOption("customer");

  // Click the "Add New User" button to create the user
  const addUserButton = page.locator('//input[@id="createusersub"]');
  await addUserButton.click();
};

module.exports = {
  addCustomerUser,
};
