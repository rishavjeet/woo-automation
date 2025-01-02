const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

test.describe('It should customer user creation feature', () => {
	test('It should create a customer user', async({admin, page})=>{
		await admin.visitAdminPage('user-new.php');
		const userNameField = page.locator('//input[@id="user_login"]');
		await userNameField.fill('TestUserName');
		const emailField = page.locator('//input[@id="email"]');
		await emailField.fill('test@trial.com');
		const firstNameField = page.locator('//input[@id="first_name"]');
		await firstNameField.fill('TestFirstName');
		const lastNameField = page.locator('//input[@id="last_name"]');
		await lastNameField.fill('TestLastNameField');
		const passwordField = page.locator('//input[@id="pass1"]');
		await passwordField.fill('TestPassword1234*');
		const userRoleField = page.locator('//select[@id="role"]');
		await userRoleField.selectOption('customer');
		const addUserButton = page.locator('//input[@id="createusersub"]');

		await addUserButton.click();

		await expect(page.getByRole('cell',{name: 'TestUserName Edit | Delete | View'})).toBeVisible();

	})
})