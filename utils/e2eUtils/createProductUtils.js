/**
 * addNewProduct - Automates the creation of a new product in the WordPress admin.
 *
 * @param {object} admin - The admin object used for navigating and interacting with the WordPress admin panel.
 * @param {object} page - The Playwright page object used for interacting with the browser.
 * @param {string} productTitle - The title of the new product to be created.
 * @param {string} productDescription - The description of the new product to be added.
 *
 * @description
 * This function automates the process of adding a new product in WooCommerce by:
 * - Navigating to the "Add New Product" page in the WordPress admin dashboard.
 * - Filling in the product title and description fields.
 * - Publishing the product to make it available in the store.
 *
 * This utility is essential for testing WooCommerce features that involve product creation, such as inventory management, pricing updates, and user interactions with products.
 *
 * @example
 * const { addNewProduct } = require('./createProductUtils');
 * await addNewProduct(admin, page, 'Test Product', 'This is a sample product description.');
 */

const addNewProduct = async (admin, page, productTitle, productDescription) => {

	// Navigate to the "Add New Product" page in the WordPress admin dashboard
  await admin.visitAdminPage("/post-new.php", "post_type=product");

  // Locate the product title field and fill it with the provided title
  const productTitleField = page.locator('//input[@id="title"]');
  await productTitleField.fill(productTitle);

  // Locate the product description iframe and access its content
  const productDescIframe = page.frameLocator("#content_ifr");
  const productDescField = await productDescIframe.locator("body#tinymce p");

  // Click on the description field to activate it and then fill it with the provided description
  await productDescField.click();
  await productDescField.fill(productDescription);

  // Locate the "Publish" button and click it to save and publish the new product
  const submitButton = page.locator('//input[@id="publish"]');
  await submitButton.click();
  
};

module.exports = {
	addNewProduct
}
