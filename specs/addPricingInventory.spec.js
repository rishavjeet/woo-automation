const { test, expect } = require("@wordpress/e2e-test-utils-playwright");
const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");
const {addPricingInventory} = require('../utils/e2eUtils/productInventoryUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

test.describe('Test should check the Pricing and Inventory feature', () => {

	let testCode = 0;
	let productTitle = '';
	let productDescription = '';

	test.beforeAll(()=>{

		testCode = generateTestCode();

		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

	});

	test('It should add the pricing and inventory', async({admin, page})=>{
		await addNewProduct(admin, page, productTitle, productDescription);

		await addPricingInventory(admin, page);

		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]')).toBeVisible();

	})
})
