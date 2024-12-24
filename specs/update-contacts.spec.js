import 'dotenv/config';

const { test, expect } = require('@playwright/test');

const { loginToAccount } = require('../utils/userLogin');
const { generateTestCode } = require('../utils/generateRandomCode');
const { addContactRecord } = require('../utils/addContact');

test('Test Update Contact records', async({page, request}) => {


	// Generate a unique code for test data to avoid duplication.
	const testCode = generateTestCode();

	// Define test data for the new contact.
	const firstName = `firstname${testCode}`;
	const lastName = `lastname${testCode}`;
	const email = `${firstName}@test.com`;

	// Generate the updated code
	const testUpdatedCode = generateTestCode()

	// Make an API call to add a new contact.
	const response = await addContactRecord(request, firstName, lastName, email);

	// Log in to the application using the predefined utility function.
	await loginToAccount(page);

	await page.getByRole('cell', { name: `${firstName} ${lastName}` }).click();
	await page.getByRole('button', { name: 'Edit Contact' }).click();
	await page.getByLabel('First Name:').click();
	await page.getByLabel('First Name:').fill(`${firstName}${testUpdatedCode}`);
	await page.getByLabel('Last Name:').click();
	await page.getByLabel('Last Name:').fill(`${lastName}${testUpdatedCode}`);
	await page.getByRole('button', { name: 'Submit' }).click();
	await page.getByRole('button', { name: 'Return to Contact List' }).click();

	await expect(page.getByRole('cell', {name: `${firstName}${testUpdatedCode} ${lastName}${testUpdatedCode}`})).toBeVisible();

})