const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {addNewProduct} = require('../utils/e2eUtils/createProductUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

const {createTaxonomy} = require('../utils/e2eUtils/addTaxonomyUtils');

const {deleteTestTaxonomy} = require('../utils/e2eUtils/removeTestTaxonomtyUtils');

const {assignTagCategory} = require('../utils/e2eUtils/assignPrdtTagCategory');

require("dotenv").config();

test.describe('It should assign category and tag to the product', ()=>{

	/**
     * Unique identifier for the test product, used to ensure uniqueness across tests.
     * @type {number}
     */
	let testCode = 0;

	/**
     * Title of the product to be created in the test.
     * @type {string}
     */
	let productTitle = '';

	/**
     * Description of the product to be created in the test.
     * @type {string}
     */
	let productDescription = '';


	let tagName = '';
	let tagDescription = '';

	let catName = ''; // Category name
	let catDescription = ''; // Category description

	/**
     * Hook that runs before each test in this suite.
     * 
     * It generates unique product details and creates a new product using the utility function.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test.beforeEach( async ({admin,  page})=>{

		// Generate a unique test code for the product
		testCode = generateTestCode();

		// Set the product title and description with the unique test code
		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

		tagName = `Test Tag ${testCode}`; // Create unique tag name
		tagDescription = `This is tag description for ${tagName}`; // Create unique tag description

		catName = `Test Tag ${testCode}`;
		catDescription = `This is tag description for ${catName}`;

		// Create a new taxonomy (tag) using the provided utility function
		await createTaxonomy(admin, page, 'Tag', tagName, tagDescription);

		// Create a new taxonomy (category) using the provided utility function
		await createTaxonomy(admin, page, 'Category', catName, catDescription);

	});

	/**
	 * Test case for testing the feature for assigning categories and tags to the product
	 */
	test('It should add tag and category to the product', async({admin, page})=>{

		// Add a new product using the utility function
		await addNewProduct(admin, page, productTitle, productDescription);

		await assignTagCategory(page, catName, tagName);

		// await expect(categoryCheckBox).toBeChecked();

		// await expect(page.locator(`//ul[@class="tagchecklist"]//li`)).toBeVisible();

		// Verify success message is visible
		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]')).toBeVisible();

	});

	/**
	 * Hook that runs after each of the test block
	 * 
	 * 1. Removes the test product record
	 * 2. Removes the test category and tag created
	 */
	test.afterEach( async({admin, page})=>{

		
		// Remove the test product using the utility function
		await removeTestProductRecord(admin, page, productTitle);
		
		// Delete the test tag using the provided utility function
		await admin.visitAdminPage("edit-tags.php", `taxonomy=product_tag&post_type=product`);
		await deleteTestTaxonomy(page, tagName);

		// Delete the test category using the provided utility function
		await admin.visitAdminPage( "edit-tags.php", `taxonomy=product_cat&post_type=product`);
		await deleteTestTaxonomy(page, catName);

	})
})