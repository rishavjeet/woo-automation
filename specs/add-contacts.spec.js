/**
 * @file Test to validate the "Add a New Contact" feature on the application.
 *
 * This script uses Playwright to automate testing the process of adding a new contact record.
 * It generates random test data to ensure unique inputs and verifies the contact is successfully added.
 */

import 'dotenv/config';

const { test, expect } = require('@playwright/test');

const { loginToAccount } = require('../utils/e2eUtils/userLogin');
const { generateTestCode } = require('../utils/e2eUtils/generateRandomCode');

/**
 * Test: Add a New Contact Record
 *
 * Validates that a user can successfully add a new contact by filling out the required fields
 * and submitting the form. Ensures the newly created contact is displayed in the contact list.
 */

test('Test the adding contact records feature', async({page})=>{

	// Log in to the application using the predefined utility function.
	await loginToAccount(page);

	// Generate a unique code for test data to ensure no duplicates.
	const testCode = generateTestCode();

	// Define test data for the new contact.
	const firstName = `testfname${testCode}`;
	const lastName = `testlname${testCode}`;
	const testEmail = `test${testCode}@test.com`;

	// Navigate to "Add a New Contact" form and fill in the required fields.
	await page.getByRole('button', { name: 'Add a New Contact' }).click();
	await page.getByPlaceholder('First Name').click();
	await page.getByPlaceholder('First Name').fill(firstName);
	await page.getByPlaceholder('Last Name').click();
	await page.getByPlaceholder('Last Name').fill(lastName);
	await page.getByPlaceholder('yyyy-MM-dd').click();
	await page.getByPlaceholder('yyyy-MM-dd').fill('2001-08-03');
	await page.getByPlaceholder('example@email.com').click();
	await page.getByPlaceholder('example@email.com').fill(testEmail);
	await page.getByPlaceholder('8005551234').click();
	await page.getByPlaceholder('8005551234').fill('1234567890');
	await page.getByPlaceholder('Address 1').click();
	await page.getByPlaceholder('Address 1').fill('Kolkata');
	await page.getByPlaceholder('Address 2').click();
	await page.getByPlaceholder('Address 2').fill('Jaipur');
	await page.getByPlaceholder('City').click();
	await page.getByPlaceholder('City').fill('Uttarpara');
	await page.getByPlaceholder('State or Province').click();
	await page.getByPlaceholder('State or Province').fill('Andhra Pradesh');
	await page.getByPlaceholder('Postal Code').click();
	await page.getByPlaceholder('Postal Code').fill('123456');
	await page.getByPlaceholder('Country').click();
	await page.getByPlaceholder('Country').fill('USA');

	// Submit the form.
	await page.getByRole('button', { name: 'Submit' }).click();

	// Verify that the newly added contact appears in the contact list.
	await expect(page.getByRole('cell', { name: `${firstName} ${lastName}` })).toBeVisible();

});