/**
 * Installs and activates the "Astra" theme on a WordPress site.
 * 
 * This function automates the following steps:
 * 1. Navigates to the "Appearance" section in the WordPress admin dashboard.
 * 2. Searches for the "Astra" theme in the WordPress theme repository.
 * 3. Installs the "Astra" theme.
 * 4. Activates the "Astra" theme after installation.
 * 
 * @param {object} page - The Playwright `page` object that represents the browser page.
 * 
 * @example
 * await installActivateTheme(page);
 */

const installActivateTheme = async ( page ) => {

	// Navigate to the "Appearance" section in the WordPress admin dashboard
	await page.getByRole('link', { name: 'Appearance' }).click();
	
	// Click on "Add New Theme"
	await page.getByRole('link', { name: 'Add New Theme', exact: true }).click();
	
	// Search for the "Astra" theme
	await page.getByLabel('Search Themes').click();
	await page.getByLabel('Search Themes').fill('astra');

	// Directly navigate to the search results page for the "Astra" theme
	await page.goto('https://rishav.rt.gw/wp-admin/theme-install.php?search=astra');
	
	// Click the "Install Astra" button
	await page.getByLabel('Install Astra', { exact: true }).click();
	
	// Wait for the installation to complete (20 seconds)
	await page.waitForTimeout(20000);
	
	// Activate the "Astra" theme
	await page.getByLabel('Activate Astra').click();
}


// Export the function for use in other modules
module.exports = {
	installActivateTheme
}