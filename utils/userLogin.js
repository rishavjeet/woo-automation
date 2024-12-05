import 'dotenv/config';

/**
 * Utility function for logging into the WordPress admin dashboard.
 * 
 * This function automates the login process for a WordPress admin user by navigating to the
 * login page, filling in the credentials, and submitting the login form. 
 * The credentials and site URL are securely fetched from environment variables.
 * 
 * @param {object} page - The Playwright `page` object representing the browser page context.
 * 
 * Environment Variables:
 * - `TEST_WEBSITE_URL`: The base URL of the WordPress test website (e.g., "https://example.com").
 * - `USERNAME`: The admin username or email address used for login.
 * - `PASSWORD`: The admin password used for login.
 */
const adminLogin = async (page) =>{
	
	 // Navigate to the WordPress admin login page using the URL from environment variables
	await page.goto(`${process.env.TEST_WEBSITE_URL}/wp-login.php`);

	// Fill in the username or email field
	await page.getByLabel('Username or Email Address').click();
	await page.getByLabel('Username or Email Address').fill(`${process.env.USERNAME}`);

	// Fill in the password field
	await page.getByLabel('Password', { exact: true }).click();
	await page.getByLabel('Password', { exact: true }).fill(`${process.env.PASSWORD}`);
	
	// Click the 'Log In' button to submit the login form
	await page.getByRole('button', { name: 'Log In' }).click();
}

// Export the adminLogin function for use in other test scripts
module.exports = {
	adminLogin
}