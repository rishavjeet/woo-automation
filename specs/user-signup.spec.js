import 'dotenv/config';

const { test, expect } = require('@playwright/test');

const { generateTestCode } = require('../utils/generateRandomCode');

/**
 * Test suite for verifying the user sign-up functionality.
 * 
 * This test case performs the following:
 * 1. Generates a unique identifier to ensure the user data is unique for testing.
 * 2. Navigates to the sign-up page of the application.
 * 3. Fills out the sign-up form with the generated user data.
 * 4. Submits the form to create a new user account.
 * 5. Verifies that the sign-up was successful by checking the visibility of the "Name" cell in the resulting page.
 * 
 * Environment Variables:
 * - `TEST_WEBSITE_URL`: The base URL of the application under test.
 * 
 * Prerequisites:
 * - The application's sign-up page must have placeholders for "First Name", "Last Name", "Email", and "Password".
 * - The "Submit" button should be accessible by its role and name.
 * - Upon successful sign-up, the application should display a cell with the name "Name".
 * 
 * Dependencies:
 * - Playwright's testing framework (`@playwright/test`) for browser automation and assertions.
 * - Utility function `generateTestCode` for creating unique test identifiers.
 * 
 * @function
 * @name TestUserSignUpFeature
 * @async
 * @param {Object} page - The Playwright page object representing a browser page.
 * @returns {void}
 */

test('Tests User Sign-up feature', async({page})=>{

	// Generate a unique code for test user data
	const testRandomCode = generateTestCode();

	// Define unique user data for testing
	const userFirstName = `testfname${testRandomCode}`;
	const userLastName = `testfname${testRandomCode}`;
	const userEmail = `test${testRandomCode}@trial.com`;
	const userPassword = `test${testRandomCode}`;

	// Navigate to the application's base URL
	await page.goto(process.env.TEST_WEBSITE_URL);

	// Click the "Sign up" button to open the sign-up form
	await page.getByRole('button', { name: 'Sign up' }).click();

	// Fill out the sign-up form with test data
	await page.getByPlaceholder('First Name').click();
	await page.getByPlaceholder('First Name').fill(userFirstName);
	await page.getByPlaceholder('Last Name').click();
	await page.getByPlaceholder('Last Name').fill(userLastName);
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill(userEmail);
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill(userPassword);

	// Submit the form to create a new user account
	await page.getByRole('button', { name: 'Submit' }).click();

	// Verify that the user is redirected to the expected page and the "Name" cell is visible
	await expect(page.getByRole('cell', {name: "Name"})).toBeVisible();
	
})