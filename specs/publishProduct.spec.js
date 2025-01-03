const { test, expect } = require("@wordpress/e2e-test-utils-playwright");

const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");

test.describe('It should verify the verify the visibility of products', ()=>{
	test('It should publish and then verify the visibility of the products', async({admin, page})=>{
		
		await addNewProduct(admin, page);

		const viewProductLink = page.locator('//div[@id="message" and contains(@class,"notice-success")]//a');
		await viewProductLink.click();

		await expect(page).toHaveTitle(/Product Demo TitleNew content for the paragraph./);

	})
})
