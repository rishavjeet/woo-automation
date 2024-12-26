
/**
 * @file Test to validate various API and UI functionalities.
 *
 * This script uses Playwright to test API interactions and user interface operations,
 * including creating, deleting contact records, and fetching user profiles.
 */

import 'dotenv/config';

const {test, expect} = require('@playwright/test');

const { generateTestCode } = require('../utils/e2eUtils/generateRandomCode');

const { addContactRecord } = require('../utils/apiUtils/addContact');

const { loginToAccount } = require('../utils/e2eUtils/userLogin');


/**
 * Test: Delete Contact Record Feature
 *
 * This test verifies the "Delete Contact" functionality. It first creates a new contact record via an API call,
 * logs into the application, and then deletes the created contact through the UI. It also handles any dialogs that appear.
 */

test.describe('Test suite to test the delete contact records feature', ()=>{

	// Stores the testcode
	let testCode = 0;

	// Stores the first name of the contact
	let firstName = '';

	// Stores the last name of the contact
	let lastName = '';

	// Stores the email of the contact
	let email = '';

	test.beforeAll(async({request})=>{
		// Generate a unique code for test data to ensure no duplicates.
		testCode = generateTestCode();
	
		// Define test data for the contact record.
		firstName = `firstname${testCode}`;
		lastName = `lastname${testCode}`;
		email = `${firstName}@test.com`;
	
		console.log(testCode);
	
		// Create a new contact record using the API.
		const response = await addContactRecord(request, firstName, lastName, email);
	
		console.log(response);
	})

	test('Test Delete Contact Record Feature', async({request, page})=>{
	
	
		// Log into the application.
		await loginToAccount(page);
		
		// Select the created contact record in the UI.
		await page.getByRole('cell', { name: `${firstName} ${lastName}` }).click();
		
		// Handle the dialog that appears when deleting a contact.
		page.once('dialog', dialog => {
	
			// Log the dialog message to the console.
			console.log(`Dialog message: ${dialog.message()}`);
	
			// Dismiss the dialog.
			dialog.dismiss().catch(() => {});
		});
	
		// Click the "Delete Contact" button to delete the selected contact.
		await page.getByRole('button', { name: 'Delete Contact' }).click();
	
		await page.goto(`${process.env.TEST_WEBSITE_URL}/contactList`);
	
		await expect(page.getByRole('cell', { name: `${firstName} ${lastName}` })).toHaveCount(0);
	
	})
})
