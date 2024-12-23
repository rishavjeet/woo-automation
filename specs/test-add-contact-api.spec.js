import 'dotenv/config';

const {test, expect} = require('@playwright/test');

const { generateTestCode } = require('../utils/generateRandomCode');

const { addContactRecord } = require('../utils/addContact');

test('Test Add contact API', async({request})=>{

	const testCode = generateTestCode();
	const firstName = `firstname${testCode}`;
	const lastName = `lastname${testCode}`;
	const email = `${firstName}@test.com`;

	const response = await addContactRecord(request, firstName, lastName, email);

	console.log(await response.json());

	await expect(response.status()).toBe(201);
})