const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {addNewProduct} = require('../utils/e2eUtils/createProductUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

test.describe('It should test the Simple Product Functionality', ()=>{

	let testCode = 0;
	let productTitle = '';
	let productDescription = '';

	test.beforeAll(()=>{

		testCode = generateTestCode();

		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

	})

	test('It should test the creation of simple product', async({admin, page})=>{
		await addNewProduct(admin, page, productTitle, productDescription);
	
		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]//p')).toContainText('Product published.');
	
	});
})