require("dotenv").config();

const userLogin = async (page) => {
  await page.goto(process.env.TEST_SITE_URL);

  const usernameField = page.locator(
    '//input[@name="username" and contains(@class,"oxd-input")]'
  );
  await usernameField.fill(process.env.TEST_USERNAME);

  const passwordField = page.locator(
    '//input[@name="password" and contains(@class,"oxd-input")]'
  );
  await passwordField.fill(process.env.TEST_PASSWORD);

  const loginBtn = page.locator(
    '//button[@type="submit" and contains(@class,"oxd-button")]'
  );
  await loginBtn.click();
};

module.exports = {
	userLogin
}
