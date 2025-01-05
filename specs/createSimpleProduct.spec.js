const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {addNewProduct} = require('../utils/e2eUtils/createProductUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

require("dotenv").config();

test.describe('It should test the Simple Product Functionality', ()=>{

	let testCode = 0;
	let productTitle = '';
	let productDescription = '';

	test.beforeEach( async ({admin,  page})=>{

		testCode = generateTestCode();

		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

		await addNewProduct(admin, page, productTitle, productDescription);

	})

	test('It should test the creation of simple product', async({admin, page})=>{
	
		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]//p')).toContainText('Product published.');
	
	});

	test.afterEach(async ({admin, page})=>{

		await removeTestProductRecord(admin, page, productTitle);
	
	})
})