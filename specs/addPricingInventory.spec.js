const { test, expect } = require("@wordpress/e2e-test-utils-playwright");
const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");
const {addPricingInventory} = require('../utils/e2eUtils/productInventoryUtils');

test.describe('Test should check the Pricing and Inventory feature', () => {
	test('It should add the pricing and inventory', async({admin, page})=>{
		await addNewProduct(admin, page);

		await addPricingInventory(admin, page);

		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]')).toBeVisible();

	})
})
