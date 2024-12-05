import 'dotenv/config';

// Utility function for user admin login to the site dashboard
const adminLogin = async (page) =>{
	
	// Redirecting to the admin login page.
	await page.goto(`${process.env.TEST_WEBSITE_URL}/wp-login.php`);

	// Filling out the user credentials.
	await page.getByLabel('Username or Email Address').click();
	await page.getByLabel('Username or Email Address').fill(`${process.env.USERNAME}`);
	await page.getByLabel('Password', { exact: true }).click();
	await page.getByLabel('Password', { exact: true }).fill(`${process.env.PASSWORD}`);
	await page.getByRole('button', { name: 'Log In' }).click();
}

module.exports = {
	adminLogin
}