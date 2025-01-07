/**
 * Function to add pricing and inventory details for a product on an admin page.
 * It fills in fields for regular price, sale price, stock management options, and updates the product.
 *
 * @async
 * @param {Object} admin - The admin user object (used for authentication, if needed).
 * @param {Object} page - The page object from a browser automation library (e.g., Playwright or Puppeteer).
 *
 * This function interacts with the product page to:
 * 1. Set a regular price of 100.
 * 2. Set a sale price of 80.
 * 3. Enable stock management and set the stock quantity to 2.
 * 4. Click the "Update" button to save the changes.
 */

const addPricingInventory = async (admin, page) => {

	// Navigate to the 'General Options' tab to update pricing details
	const generalOptionsTab = page.locator('//li[contains(@class,"general_options")]//a');
		await generalOptionsTab.click();

		// Locate the regular price field and fill in a value of 100
		const regularPriceField = page.locator('//input[@id="_regular_price"]');
		await regularPriceField.fill("100");

		// Locate the sale price field and fill in a value of 80
		const salePriceField = page.locator('//input[@id="_sale_price"]');
		await salePriceField.fill('80');

		// Navigate to the 'Inventory Options' tab to update inventory details
		const inventoryOptionsTab = page.locator('//li[contains(@class,"inventory_options")]//a');
		await inventoryOptionsTab.click();

		// Locate the checkbox for managing stock and check it
		const manageStockCheckBox = page.locator('//input[@id="_manage_stock"]');
		await manageStockCheckBox.check();

		// Locate the stock quantity field and set it to 2
		const stockQuantityField = page.locator('//input[@id="_stock"]');
		await stockQuantityField.fill('2');

		// Locate the 'Update' button and click it to save the changes
		const updateButton = page.locator('//input[@id="publish"]');
		await updateButton.click();
}

// Export the function for use in other modules
module.exports = {
	addPricingInventory,
}
