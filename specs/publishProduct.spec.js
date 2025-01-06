const { test, expect } = require("@wordpress/e2e-test-utils-playwright");

const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

require("dotenv").config();

test.describe('It should verify the verify the visibility of products', ()=>{

	let testCode = 0;
	let productTitle = '';
	let productDescription = '';

	test.beforeEach( async ({admin,  page})=>{

		testCode = generateTestCode();

		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

		await addNewProduct(admin, page, productTitle, productDescription);

	})

	test('It should publish and then verify the visibility of the products', async({admin, page})=>{

		const viewProductLink = page.locator('//div[@id="message" and contains(@class,"notice-success")]//a');
		await viewProductLink.click();

		await expect(page).toHaveTitle(`${productTitle} – rishav.rt.gw`);

	})

	test.afterEach(async ({admin, page})=>{
		await removeTestProductRecord(admin, page, productTitle);
	});
})
