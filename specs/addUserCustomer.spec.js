/**
 * @fileoverview E2E test to verify the customer user creation feature in WordPress.
 * 
 * This script creates a new customer user and validates its creation by checking the visibility
 * of the user in the admin panel. After the test, the user is deleted to clean up test data.
 */

const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestUserRecord} = require('../utils/e2eUtils/testUserDeletion');

const { addCustomerUser } = require('../utils/e2eUtils/createCustomerUtils');

/**
 * Test suite to validate the customer user creation functionality.
 */
test.describe('It should customer user creation feature', () => {

	/**
     * Unique identifier for test data, ensuring uniqueness across tests.
     * @type {number}
     */
	let testCode = 0;

	/**
     * Details of the test user to be created.
     * @type {string}
     */
	let userName = '';
	let userEmail = '';
	let firstName = '';
	let lastName = '';
	let password = '';

	/**
     * Hook that runs before all tests in this suite.
     * 
     * It generates unique test user details.
     */
	test.beforeAll(()=>{
		testCode = generateTestCode();

		userName = `TestUserName-${testCode}`;
		userEmail = `test${testCode}@trial.com`;
		firstName = `TestFirstName-${testCode}`;
		lastName = `TestLastName-${testCode}`;
		password = `TestPassword${testCode}*`;	

	})

	/**
     * Test case to create a customer user and validate its presence in the admin panel.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test('It should create a customer user', async({admin, page})=>{

		// Create a new customer user
		await addCustomerUser(admin, page, userName, userEmail, firstName, lastName, password);

		// Verify the user is visible in the admin panel
		await expect(page.getByRole('cell',{name: `${userName} Edit | Delete | View`})).toBeVisible();

	});

	/**
     * Hook that runs after each test in this suite.
     * 
     * It removes the test user created during the test.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test.afterEach(async ({admin, page})=>{

		await removeTestUserRecord(admin, page, userName);

	})
})