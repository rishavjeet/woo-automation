const { test, expect, logout, login } = require("@wordpress/e2e-test-utils-playwright");

const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");

const {addPricingInventory} = require('../utils/e2eUtils/productInventoryUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

const {removeTestUserRecord} = require('../utils/e2eUtils/testUserDeletion');

const { addCustomerUser } = require('../utils/e2eUtils/createCustomerUtils');

const {customerUserLogin} = require('../utils/e2eUtils/customerLoginUtils');

const {checkoutPlaceOrder} = require('../utils/e2eUtils/checkoutPlaceOrderUtils');

require("dotenv").config();

test.describe('Test should verify the chekcout workflow', ()=>{

	let testCode = 0;
	let productTitle = '';
	let productDescription = '';

	let userName = '';
	let userEmail = '';
	let firstName = '';
	let lastName = '';
	let password = '';

	test.beforeEach( async ({admin,  page, requestUtils})=>{

		testCode = generateTestCode();

		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

		await addNewProduct(admin, page, productTitle, productDescription);

		await addPricingInventory(admin, page);

		userName = `TestUserName-${testCode}`;
		userEmail = `test${testCode}@trial.com`;
		firstName = `TestFirstName-${testCode}`;
		lastName = `TestLastName-${testCode}`;
		password = `TestPassword${testCode}*`;

		// await addCustomerUser(admin, page, userName, userEmail, firstName, lastName, password);

		await requestUtils.createUser({
			username: userName,
			email: userEmail,
			first_name: firstName,
			last_name: lastName,
			password,
			roles: ['customer']
		});

		await page.goto(`${process.env.WP_BASE_URL}wp-login.php?action=logout`);

		const logoutLink = page.locator('//div[contains(@class,"wp-die-message")]//p[2]//a');
		await logoutLink.click();
		

	});

	test('It should be add product to cart, checkout and place order',async({admin, page})=>{
		
		await customerUserLogin(page, userName, password);

		await checkoutPlaceOrder(page, firstName, lastName, productTitle);

		const orderNumberField = page.locator('//span[contains(text(),"Order #:")]/following-sibling::*[1]');
		const orderNumber = await  orderNumberField.textContent();

		await page.goto(`${process.env.WP_BASE_URL}my-account`);

		const logoutLink = page.locator('//li//a[contains(text(),"Log out")]');
		await logoutLink.click();

		await page.goto(`${process.env.WP_BASE_URL}wp-login.php`);

		const userNameField = page.locator('//input[@id="user_login"]');
		await userNameField.fill(`${process.env.WP_USERNAME}`);

		const passwordField = page.locator('//input[@id="user_pass"]');
		await passwordField.fill(`${process.env.WP_PASSWORD}`);

		const loginBtn = page.locator('//input[@id="wp-submit"]');
		await loginBtn.click();

		await page.goto(`${process.env.WP_BASE_URL}wp-admin/admin.php?page=wc-orders`);

		const searchCouponField = page.locator('//input[@id="orders-search-input-search-input"]');
		await searchCouponField.fill(orderNumber);

		const searchBtn = page.locator('//input[@id="search-submit"]');

		await page.keyboard.press('Enter');

		const orderRecordData = page.locator('//td[contains(@class,"order_number")]//a[@class="order-view"]//strong');

		await expect(orderRecordData).toContainText(orderNumber);


		
	});

	test.afterEach(async ({admin, page, requestUtils})=>{

		await requestUtils.deleteAllUsers();

		await removeTestProductRecord(admin, page, productTitle);
	
	})
})
