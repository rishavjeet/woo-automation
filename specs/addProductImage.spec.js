const { test, expect } = require("@wordpress/e2e-test-utils-playwright");
const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");


test.describe('Test the Product Image Feature', ()=>{
	test('It should be able to upload product image', async({admin,page})=>{
		await addNewProduct(admin, page);

		await page.getByRole('link', { name: 'Set product image' }).click();
		await page.getByLabel('Select Files').click();
		await page.getByLabel('Select Files').setInputFiles('/Users/rishavdutta/Documents/qa-idp/WP-e2e-utls/TestAutomation-Hands-on/assets/product_test_image.png');
		await page.getByRole('button', { name: 'Set product image' }).click();



	});
})