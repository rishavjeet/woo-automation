const addCustomerUser = async (
  admin,
  page,
  userName,
  userEmail,
  firstName,
  lastName,
  password,
) => {
  await admin.visitAdminPage("user-new.php");
  const userNameField = page.locator('//input[@id="user_login"]');
  await userNameField.fill(userName);
  const emailField = page.locator('//input[@id="email"]');
  await emailField.fill(userEmail);
  const firstNameField = page.locator('//input[@id="first_name"]');
  await firstNameField.fill(firstName);
  const lastNameField = page.locator('//input[@id="last_name"]');
  await lastNameField.fill(lastName);
  const passwordField = page.locator('//input[@id="pass1"]');
  await passwordField.fill(password);
  const userRoleField = page.locator('//select[@id="role"]');
  await userRoleField.selectOption("customer");
  const addUserButton = page.locator('//input[@id="createusersub"]');

  await addUserButton.click();
};

module.exports = {
	addCustomerUser
}
