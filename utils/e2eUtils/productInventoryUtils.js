const addPricingInventory = async (admin, page) => {
	const generalOptionsTab = page.locator('//li[contains(@class,"general_options")]//a');
		await generalOptionsTab.click();

		const regularPriceField = page.locator('//input[@id="_regular_price"]');
		await regularPriceField.fill("100");

		const salePriceField = page.locator('//input[@id="_sale_price"]');
		await salePriceField.fill('80');

		const inventoryOptionsTab = page.locator('//li[contains(@class,"inventory_options")]//a');
		await inventoryOptionsTab.click();

		const manageStockCheckBox = page.locator('//input[@id="_manage_stock"]');
		await manageStockCheckBox.check();

		const stockQuantityField = page.locator('//input[@id="_stock"]');
		await stockQuantityField.fill('2');

		const updateButton = page.locator('//input[@id="publish"]');
		await updateButton.click();
}

module.exports = {
	addPricingInventory,
}
