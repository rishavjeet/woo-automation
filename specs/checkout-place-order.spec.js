/**
 * @fileoverview E2E test to verify the checkout workflow in WooCommerce.
 * 
 * This script covers the entire workflow of adding a product to the cart, performing checkout, and verifying the order.
 * It also includes creation and cleanup of test data such as products and users.
 */

const { test, expect, logout, login } = require("@wordpress/e2e-test-utils-playwright");

const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");

const {addPricingInventory} = require('../utils/e2eUtils/productInventoryUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

const {removeTestUserRecord} = require('../utils/e2eUtils/testUserDeletion');

const { addCustomerUser } = require('../utils/e2eUtils/createCustomerUtils');

const {customerUserLogin} = require('../utils/e2eUtils/customerLoginUtils');

const {checkoutPlaceOrder} = require('../utils/e2eUtils/checkoutPlaceOrderUtils');

const {adminLogin} = require('../utils/e2eUtils/adminLoginUtils');

const { consumers } = require("stream");

require("dotenv").config();

/**
 * Test suite to verify the checkout workflow in WooCommerce.
 */
test.describe('Test should verify the chekcout workflow', ()=>{

	/**
     * Unique identifier for test data, ensuring uniqueness across tests.
     * @type {number}
     */
	let testCode = 0;

	/**
     * Title of the test product.
     * @type {string}
     */
	let productTitle = '';

	/**
     * Description of the test product.
     * @type {string}
     */
	let productDescription = '';

	/**
     * Customer user details.
     * @type {string}
     */
	let userName = '';
	let userEmail = '';
	let firstName = '';
	let lastName = '';
	let password = '';

	/**
     * ID of the created customer user.
     * @type {number}
     */
	let customerUserId = 0;

	/**
     * Hook that runs before each test in this suite.
     * 
     * It generates unique product and user details, creates a new product with pricing and inventory,
     * and registers a new customer user via API.
     * 
     * @param {object} context - Test context containing admin, page, and requestUtils objects.
     */
	test.beforeEach( async ({admin,  page, requestUtils})=>{

		// Generate a unique test code for the product and user
		testCode = generateTestCode();

		// Set the product title and description
		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

		// Add a new product with pricing and inventory
		await addNewProduct(admin, page, productTitle, productDescription);
		await addPricingInventory(admin, page);

		// Set customer user details
		userName = `TestUserName-${testCode}`;
		userEmail = `test${testCode}@trial.com`;
		firstName = `TestFirstName-${testCode}`;
		lastName = `TestLastName-${testCode}`;
		password = `TestPassword${testCode}*`;

		// await addCustomerUser(admin, page, userName, userEmail, firstName, lastName, password);

		// Create a new customer user via API and capture the user ID
		const customerUserData = await requestUtils.createUser({
			username: userName,
			email: userEmail,
			first_name: firstName,
			last_name: lastName,
			password,
			roles: ['customer']
		});

		customerUserId = customerUserData.id

		console.log(customerUserId);

		// Log out of the admin account
		await page.goto(`${process.env.WP_BASE_URL}wp-login.php?action=logout`);
		const logoutLink = page.locator('//div[contains(@class,"wp-die-message")]//p[2]//a');
		await logoutLink.click();
		

	});

	/**
     * Test case to verify the checkout workflow.
     * 
     * It logs in as the customer, adds the product to the cart, performs checkout,
     * and verifies the order confirmation.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test('It should be add product to cart, checkout and place order',async({admin, page})=>{
		
		// Log in as the customer user
		await customerUserLogin(page, userName, password);

		// Perform checkout and place the order
		await checkoutPlaceOrder(page, firstName, lastName, productTitle)

		// Verify the order confirmation page title
		await expect(page).toHaveTitle('Order Confirmation');
		
	});

	/**
     * Hook that runs after each test in this suite.
     * 
     * It removes all test users and the test product created during the test.
     * 
     * @param {object} context - Test context containing admin, page, and requestUtils objects.
     */
	test.afterEach(async ({admin, page, requestUtils})=>{

		// Delete all test users via API
		await requestUtils.deleteAllUsers();

		// await requestUtils.login({
		// 	username: process.env.WP_USERNAME,
		// 	password: process.env.WP_PASSWORD
		// });

		// Log in as the admin user
		await adminLogin(page);

		// Remove the test product using the utility function
		await removeTestProductRecord(admin, page, productTitle);

		// await removeTestUserRecord(admin, page, userName);
	
	})
})
