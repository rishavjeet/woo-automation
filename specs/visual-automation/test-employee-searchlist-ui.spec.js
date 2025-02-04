const { test, expect } = require('@playwright/test');

const { userLogin } = require('../../utils/visualUtils/loginUtils');

require("dotenv").config();

test.describe('Employee Search Results',()=>{
	test('It should Verify the UI consistency of the Employee List page after performing a search.', async({page})=>{
		await userLogin(page);

		const pimMenuItem = page.locator('//span[contains(@class,"oxd-main-menu-item--name") and text()="PIM"]');
		await pimMenuItem.click();

		
		const employeeNameField = page.locator('.oxd-grid-item.oxd-grid-item--gutters:first-of-type input');
		await employeeNameField.click();
		
		await employeeNameField.fill('Amy');
		
		const employeeSearchBtn = page.locator('button.orangehrm-left-space');
		await employeeSearchBtn.click();


		await page.waitForTimeout(3000);
		
		// Capture the screenshot and compare with the baseline
		await expect(page).toHaveScreenshot('employee-searchlist.png',{
			timeout: 3000, // Set the timeout for the screenshot action
			fullPage: true, // Capture a full-page screenshot
		});

	});
})