
require("dotenv").config();

const adminLogin = async (page) => {
  await page.goto(`${process.env.WP_BASE_URL}wp-login.php`);

  const userNameField = page.locator('//input[@id="user_login"]');
  await userNameField.fill(`${process.env.WP_USERNAME}`);

  const passwordField = page.locator('//input[@id="user_pass"]');
  await passwordField.fill(`${process.env.WP_PASSWORD}`);

  const loginBtn = page.locator('//input[@id="wp-submit"]');
  await loginBtn.click();
};

module.exports = {
	adminLogin
}
