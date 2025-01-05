const customerUserLogin = async (page, userName, password) => {
  await page.goto(`${process.env.WP_BASE_URL}my-account`);

  const userNameField = page.locator('//input[@id="username"]');
  await userNameField.fill(userName);

  const passwordField = page.locator('//input[@id="password"]');
  await passwordField.fill(password);

  const loginBtn = page.locator('//button[@value="Log in"]');
  await loginBtn.click();
};

module.exports = {
	customerUserLogin
}
