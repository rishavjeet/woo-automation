
/**
 * @file Test to validate various API and UI functionalities.
 *
 * This script uses Playwright to test API interactions and user interface operations,
 * including creating, deleting contact records, and fetching user profiles.
 */

import 'dotenv/config';

const {test, expect} = require('@playwright/test');

const { generateTestCode } = require('../utils/generateRandomCode');

const { addContactRecord } = require('../utils/addContact');

const { loginToAccount } = require('../utils/userLogin');


/**
 * Test: Delete Contact Record Feature
 *
 * This test verifies the "Delete Contact" functionality. It first creates a new contact record via an API call,
 * logs into the application, and then deletes the created contact through the UI. It also handles any dialogs that appear.
 */

test('Test Delete Contact Record Feature', async({request, page})=>{

	// Generate a unique code for test data to ensure no duplicates.
	const testCode = generateTestCode();

	// Define test data for the contact record.
	const firstName = `firstname${testCode}`;
	const lastName = `lastname${testCode}`;
	const email = `${firstName}@test.com`;

	// Create a new contact record using the API.
	const response = await addContactRecord(request, firstName, lastName, email);

	// Log into the application.
	await loginToAccount(page);
	
	// Select the created contact record in the UI.
	await page.getByRole('cell', { name: `${process.env.firstName} ${process.env.lastName}` }).click();
	
	// Handle the dialog that appears when deleting a contact.
	page.once('dialog', dialog => {

		// Log the dialog message to the console.
		console.log(`Dialog message: ${dialog.message()}`);

		// Dismiss the dialog.
		dialog.dismiss().catch(() => {});
	});

	// Click the "Delete Contact" button to delete the selected contact.
	await page.getByRole('button', { name: 'Delete Contact' }).click();

})