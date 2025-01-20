const { test, expect } = require('@playwright/test');

const { userLogin } = require('../../utils/visualUtils/loginUtils');

require("dotenv").config();

test.describe('Admin Dashboard Verification', ()=>{

	test.beforeEach(async({page})=>{
		await userLogin(page);
	})

	test('It should Validate the visual appearance of the Admin Dashboard after logging in', async ({ page }) => {

		await page.waitForTimeout(3000);
	
		// Capture the screenshot and compare with the baseline
		await expect(page).toHaveScreenshot('admin-dashboard.png',{
			timeout: 2000, // Set the timeout for the screenshot action
			fullPage: true, // Capture a full-page screenshot
		});
	});
})

