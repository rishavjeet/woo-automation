const { test, expect } = require("@wordpress/e2e-test-utils-playwright");

const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");

test.describe('Test should verify the chekcout workflow', ()=>{
	test('It should be add product to cart, checkout and place order',async({admin, page})=>{
		await addNewProduct(admin, page);

		const viewProductLink = page.locator('//div[@id="message" and contains(@class,"notice-success")]//a');
		await viewProductLink.click();

		const addToCartButton = page.locator('//button[contains(@class,"single_add_to_cart_button") and @name="add-to-cart"]');
		await addToCartButton.click();

		
	})
})
