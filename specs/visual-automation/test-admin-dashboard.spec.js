const { test, expect } = require('@playwright/test');

// Import utility function for user login
const { userLogin } = require('../../utils/visualUtils/loginUtils');

/**
 * Test suite for verifying the Admin Dashboard functionality.
 */
test.describe('Admin Dashboard Verification', ()=>{

	/**
	 * Setup function executed before each test.
	 * Ensures user is logged in before proceeding with tests.
	 */
	test.beforeEach(async({page})=>{
		await userLogin(page); // Perform user login
	})

	/**
	 * Test to validate the visual appearance of the Admin Dashboard after logging in.
	 * Captures and compares a screenshot with the baseline image.
	 */
	test('It should Validate the visual appearance of the Admin Dashboard after logging in', async ({ page }) => {

		await page.waitForTimeout(3000); // Wait for the dashboard to load completely
	
		// Capture the screenshot and compare with the baseline
		await expect(page).toHaveScreenshot('admin-dashboard.png',{
			timeout: 2000, // Set the timeout for the screenshot action
			fullPage: true, // Capture a full-page screenshot
			// stylePath: path.join(__dirname, 'assets/style.css'),
		});
	});
})

