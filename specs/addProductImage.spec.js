const { test, expect } = require("@wordpress/e2e-test-utils-playwright");
const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

const { extractPrdtSlug } = require('../utils/e2eUtils/getProductSlug');


test.describe('Test the Product Image Feature', ()=>{

	let testCode = 0;
	let productTitle = '';
	let productDescription = '';

	/**
	 * Generates a unique test code and sets up product details before all tests in this suite.
	 */
	test.beforeAll(()=>{

		// Generate random test code for product details
		testCode = generateTestCode();

		/**
		 * Product Details
		 * @type {string}
		 */
		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

	});

	/**
	 * Tests the ability to upload and set a product image.
	 * This test performs the following:
	 * 1. Uploads a test image to the media library.
	 * 2. Creates a new product with a unique title and description.
	 * 3. Sets the uploaded image as the product's featured image.
	 * 4. Verifies that the image is visible on the editor screen.
	 *
	 * @param {Object} admin - Admin object for managing WordPress admin panel actions.
	 * @param {Object} page - Page object for interacting with the browser.
	 * @param {Object} requestUtils - Utility object for handling requests (e.g., file uploads).
	 */
	test('It should be able to upload product image', async({admin,page, requestUtils})=>{

		// Upload a test image to the media library
		await requestUtils.uploadMedia('assets/product_test_image.png');

		// Add a new product with the generated title and description
		await addNewProduct(admin, page, productTitle, productDescription);

		// Store the current product edit screen URL for later navigation
		const prdtEditScreen = page.url();

		await page.getByRole('link', { name: 'Set product image' }).click();

		// Switch to media Library
		const mediaLibraryTab = await page.locator('//a[text()="Media Library"]');
		await mediaLibraryTab.click();

		// Click the 'Use as Product Imagw' button
		const usePrdtImgBtn = await page.locator('//a[text()="Use as product image"]');
		await usePrdtImgBtn.click();

		// Switch to editor screen
		await page.goto(prdtEditScreen);

		// Locate the 'Update' button and click it to save the changes
		const updateButton = page.locator('//input[@id="publish"]');
		await updateButton.click();

		// Asserts the image is visible on editor screen
		const thumbnailImage = page.locator('//a[@id="set-post-thumbnail"]//img');
		await expect(thumbnailImage).toBeVisible();

	});

	/**
     * Hook that runs after each test in this suite.
     * 
     * It removes the test product created during the test.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test.afterEach( async ({admin, page, requestUtils})=>{

		// Remove the test product using the utility function
		await removeTestProductRecord(admin, page, productTitle);

		// Remove Test Media
		await requestUtils.deleteAllMedia();
		

	})
})