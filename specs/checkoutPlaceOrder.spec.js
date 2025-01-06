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

	test.beforeEach( async ({admin,  page})=>{

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

		await addCustomerUser(admin, page, userName, userEmail, firstName, lastName, password);

		await page.goto(`${process.env.WP_BASE_URL}wp-login.php?action=logout`);

		const logoutLink = page.locator('//div[contains(@class,"wp-die-message")]//p[2]//a');
		await logoutLink.click();
		

	});

	test('It should be add product to cart, checkout and place order',async({admin, page})=>{
		
		await customerUserLogin(page, userName, password);

		await checkoutPlaceOrder(page, firstName, lastName, productTitle)

		await expect(page).toHaveTitle('Order Confirmation');
		
	});

	test.afterEach(async ({admin, page, requestUtils})=>{

		await page.goto(`${process.env.WP_BASE_URL}my-account`);

		const logoutLink = page.locator('//li//a[contains(text(),"Log out")]');
		await logoutLink.click();

		// await requestUtils.login({
		// 	username: process.env.WP_USERNAME,
		// 	password: process.env.WP_PASSWORD
		// });

		// await removeTestProductRecord(admin, page, productTitle);

		// await removeTestUserRecord(admin, page, userName);
	
	})
})
