import 'dotenv/config';

const { test, expect } = require('@playwright/test');

const { loginToAccount } = require('../utils/e2eUtils/userLogin');
const { generateTestCode } = require('../utils/e2eUtils/generateRandomCode');
const { addContactRecord } = require('../utils/apiUtils/addContact');

test.describe('Test suite for testing the Update contact feature', () => {

	// Stores the random test code
	let testCode = 0;

	// Stores the firstname of the user
	let firstName = '';

	// Stores the lastname of the user
	let lastName = '';

	// Stores the email of the user
	let email = '';

	// Stores the updated test code for testing the update feature
	let testUpdatedCode = '';


	test.beforeAll(async({request})=>{
		// Generate a unique code for test data to avoid duplication.
		testCode = generateTestCode();
	
		// Define test data for the new contact.
		firstName = `firstname${testCode}`;
		lastName = `lastname${testCode}`;
		email = `${firstName}@test.com`;
	
		// Generate the updated code
		testUpdatedCode = generateTestCode()
	
		// Make an API call to add a new contact.
		const response = await addContactRecord(request, firstName, lastName, email);

		console.log(response);
	})

	test('Test Update Contact records', async({page, request}) => {
	
		// Login to the account
		await loginToAccount(page);
	
		await page.getByRole('cell', { name: `${firstName} ${lastName}` }).click();
		await page.getByRole('button', { name: 'Edit Contact' }).click();
		await page.getByLabel('First Name:').click();
		await page.getByLabel('First Name:').fill(`${firstName}${testUpdatedCode}`);
		await page.getByLabel('Last Name:').click();
		await page.getByLabel('Last Name:').fill(`${lastName}${testUpdatedCode}`);
		// await expect(page.getByLabel('Email:')).toHaveValue(`email`,{timeout: 1500});
		await page.getByRole('button', { name: 'Submit' }).click();
		await page.getByRole('button', { name: 'Return to Contact List' }).click();
	
		await expect(page.getByRole('cell', {name: `${firstName}${testUpdatedCode} ${lastName}${testUpdatedCode}`})).toBeVisible();
	
	})
})
