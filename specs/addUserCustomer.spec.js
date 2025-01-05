const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

test.describe('It should customer user creation feature', () => {

	let testCode = 0;
	let userName = '';
	let userEmail = '';
	let firstName = '';
	let lastName = '';
	let password = '';

	test.beforeAll(()=>{
		testCode = generateTestCode();

		userName = `TestUserName-${testCode}`;
		userEmail = `test${testCode}@trial.com`;
		firstName = `TestFirstName-${testCode}`;
		lastName = `TestLastName-${testCode}`;
		password = `TestPassword${testCode}*`;	

	})

	test('It should create a customer user', async({admin, page})=>{

		await admin.visitAdminPage('user-new.php');
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
		await userRoleField.selectOption('customer');
		const addUserButton = page.locator('//input[@id="createusersub"]');

		await addUserButton.click();

		await expect(page.getByRole('cell',{name: `${userName} Edit | Delete | View`})).toBeVisible();

	});
})