const { test, expect } = require('@playwright/test');

// Utility function for user login
const { userLogin } = require('../../utils/visualUtils/loginUtils');

// Utiliy function for employee search
const { searchEmployee } = require('../../utils/visualUtils/searchEmployeeUtils');

test.describe('Employee Search Results',()=>{

	test.beforeEach(async ({page})=>{
		
		await userLogin(page);

		await searchEmployee(page, "Amy");
	});

	test('It should Verify the UI consistency of the Employee List page after performing a search.', async({page})=>{

		await page.waitForTimeout(3000);
		
		// Capture the screenshot and compare with the baseline
		await expect(page).toHaveScreenshot('employee-searchlist.png',{
			timeout: 3000, // Set the timeout for the screenshot action
			fullPage: true, // Capture a full-page screenshot
		});

	});
})