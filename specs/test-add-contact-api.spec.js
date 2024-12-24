
/**
 * @file Test to validate various API and UI functionalities.
 *
 * This script uses Playwright to test API interactions,
 * including creating contact records
 */

import 'dotenv/config';

const {test, expect} = require('@playwright/test');

const { generateTestCode } = require('../utils/generateRandomCode');

const { addContactRecord } = require('../utils/addContact');

/**
 * Test: Add Contact API
 *
 * This test validates the "Add Contact" API functionality by sending a POST request to create a new contact.
 * It generates test data dynamically, including a unique first name, last name, and email address,
 * then verifies that the contact creation is successful with a status code of 201.
 */

test('Test Add contact API', async({request})=>{

	// Generate a unique code for test data to avoid duplication.
	const testCode = generateTestCode();

	// Define test data for the new contact.
	const firstName = `firstname${testCode}`;
	const lastName = `lastname${testCode}`;
	const email = `${firstName}@test.com`;

	// Make an API call to add a new contact.
	const response = await addContactRecord(request, firstName, lastName, email);

	// Log the response data for debugging purposes.
	console.log(await response.json());

	// Assert that the API response status code is 201 (Created).
	await expect(response.status()).toBe(201);
})