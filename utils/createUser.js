/**
 * Creates a new user on a WordPress site via the admin interface.
 * 
 * This function automates the process of adding a new user by:
 * 1. Navigating to the "Users" section in the WordPress admin dashboard.
 * 2. Filling in the required fields (username, email, first name, last name, and password).
 * 3. Assigning the user a role (default: Administrator).
 * 4. Submitting the form to add the new user.
 * 
 * @param {object} page - The Playwright `page` object that represents the browser page.
 * 
 * @example
 * await createWpSiteUser(page);
 * 
 * // This assumes the `testUserName` and `testUserEmail` variables are defined
 * // in the context where this function is called.
 */

const createWpSiteUser = async ( page, testUserName, testUserEmail ) => {

	// Navigate to the "Users" section in the WordPress admin dashboard
	await page.getByRole('link', { name: 'Users', exact: true }).click();
	
	// Click the "Add New User" link
	await page.locator('#wpbody-content').getByRole('link', { name: 'Add New User' }).click();
	
	// Fill in the required fields for the new user
	await page.getByLabel('Username (required)').click();
	await page.getByLabel('Username (required)').fill(testUserName);
	
	await page.getByLabel('Email (required)').click();
	await page.getByLabel('Email (required)').fill(testUserEmail);
	
	 // Fill in optional fields for the user
	await page.getByLabel('First Name').click();
	await page.getByLabel('First Name').fill('testfname');
	await page.getByLabel('Last Name').click();
	await page.getByLabel('Last Name').fill('testlname');
	
	// Set a password for the user
	await page.getByLabel('Password (required)', { exact: true }).click();
	await page.getByLabel('Password (required)', { exact: true }).press('ControlOrMeta+a');
	await page.getByLabel('Password (required)', { exact: true }).fill('testpwd123*');
	
	// Assign the "Administrator" role to the new user
	await page.getByLabel('Role').selectOption('administrator');
	
	// Submit the form to add the new user
	await page.getByRole('button', { name: 'Add New User' }).click();
}


// Export the function for use in other modules
module.exports = {
	createWpSiteUser
}