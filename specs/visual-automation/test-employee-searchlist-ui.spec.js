const { test, expect } = require('@playwright/test');

// Utility function for user login
const { userLogin } = require('../../utils/visualUtils/loginUtils');

// Utiliy function for employee search
const { searchEmployee } = require('../../utils/visualUtils/searchEmployeeUtils');

/**
 * Test suite for verifying the UI consistency of the Employee List page after searching.
 */
test.describe('Employee Search Results',()=>{

	/**
	 * Setup function executed before each test.
	 * Ensures user is logged in and performs a search for "Amy".
	 */
	test.beforeEach(async ({page})=>{
		
		await userLogin(page); // Perform user login

		await searchEmployee(page, "Amy"); // Perform search operation
	});

	/**
	 * Test to verify the UI consistency of the Employee List page after performing a search.
	 * Captures and compares a screenshot with the baseline image.
	 */
	test('It should Verify the UI consistency of the Employee List page after performing a search.', async({page})=>{

		await page.waitForTimeout(3000); // Wait for UI elements to load fully
		
		// Capture the screenshot and compare with the baseline
		await expect(page).toHaveScreenshot('employee-searchlist.png',{
			timeout: 3000, // Set the timeout for the screenshot action
			fullPage: true, // Capture a full-page screenshot
		});

	});
})