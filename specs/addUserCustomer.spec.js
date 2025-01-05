const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestUserRecord} = require('../utils/e2eUtils/testUserDeletion');

const { addCustomerUser } = require('../utils/e2eUtils/createCustomerUtils');

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

		await addCustomerUser(admin, page, userName, userEmail, firstName, lastName, password);

		await expect(page.getByRole('cell',{name: `${userName} Edit | Delete | View`})).toBeVisible();

	});

	test.afterEach(async ({admin, page})=>{

		await removeTestUserRecord(admin, page, userName);

	})
})