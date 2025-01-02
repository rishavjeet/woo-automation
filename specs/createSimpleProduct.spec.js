const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {addNewProduct} = require('../utils/e2eUtils/createProductUtils');

test.describe('It should test the Simple Product Functionality', ()=>{

	test('It should test the creation of simple product', async({admin, page})=>{
		await addNewProduct(admin, page);
	
		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]//p')).toContainText('Product published.');
	
	});
})