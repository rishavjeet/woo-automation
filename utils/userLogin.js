

// Utility function for user admin login to the site dashboard
const adminLogin = async (page) =>{
	
	// Redirecting to the admin login page.
	await page.goto('https://rishav.rt.gw/wp-login.php');

	// Filling out the user credentials.
	await page.getByLabel('Username or Email Address').click();
	await page.getByLabel('Username or Email Address').fill('rishav');
	await page.getByLabel('Password', { exact: true }).click();
	await page.getByLabel('Password', { exact: true }).fill('Dutta#July2023');
	await page.getByRole('button', { name: 'Log In' }).click();
}

module.exports = {
	adminLogin
}