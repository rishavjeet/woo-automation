/**
 * @fileoverview E2E test to verify the checkout workflow in WooCommerce.
 * 
 * This script tests the end-to-end process of adding a product to the cart, performing checkout, and verifying the order.
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

require("dotenv").config();

/**
 * Test suite to verify the checkout workflow in WooCommerce.
 */
test.describe('Test should verify the chekcout workflow', ()=>{

	/**
     * Unique identifier for the test product and user, ensuring uniqueness across tests.
     * @type {number}
     */
	let testCode = 0;

	/**
     * Title of the product to be created in the test.
     * @type {string}
     */
	let productTitle = '';

	/**
     * Description of the product to be created in the test.
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
     * Hook that runs before each test in this suite.
     * 
     * It generates unique product and user details, creates a new product with pricing and inventory,
     * and registers a new customer user.
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

		// Create a new customer user via API
		await requestUtils.createUser({
			username: userName,
			email: userEmail,
			first_name: firstName,
			last_name: lastName,
			password,
			roles: ['customer']
		});

		// Log out of the admin account
		await page.goto(`${process.env.WP_BASE_URL}wp-login.php?action=logout`);
		const logoutLink = page.locator('//div[contains(@class,"wp-die-message")]//p[2]//a');
		await logoutLink.click();
		

	});

	/**
     * Test case to verify the checkout workflow.
     * 
     * It logs in as the customer, adds the product to the cart, performs checkout,
     * verifies the order, and checks the order in the admin panel.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test('It should be add product to cart, checkout and place order',async({admin, page})=>{
		
		// Log in as the customer user
		await customerUserLogin(page, userName, password);

		// Perform checkout and place the order
		await checkoutPlaceOrder(page, firstName, lastName, productTitle);

		// Retrieve the order number from the order confirmation page
		const orderNumberField = page.locator('//span[contains(text(),"Order #:")]/following-sibling::*[1]');
		const orderNumber = await  orderNumberField.textContent();

		// Log out from the customer account
		await page.goto(`${process.env.WP_BASE_URL}my-account`);
		const logoutLink = page.locator('//li//a[contains(text(),"Log out")]');
		await logoutLink.click();

		// Log in as the admin user
		await adminLogin(page);

		// Verify the order in the WooCommerce admin orders panel
		await page.goto(`${process.env.WP_BASE_URL}wp-admin/admin.php?page=wc-orders`);

		const searchCouponField = page.locator('//input[@id="orders-search-input-search-input"]');
		await searchCouponField.fill(orderNumber);

		const searchBtn = page.locator('//input[@id="search-submit"]');

		await page.keyboard.press('Enter');

		const orderRecordData = page.locator('//td[contains(@class,"order_number")]//a[@class="order-view"]//strong');

		await expect(orderRecordData).toContainText(orderNumber);


		
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

		// Remove the test product using the utility function
		await removeTestProductRecord(admin, page, productTitle);
	
	})
})
