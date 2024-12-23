import 'dotenv/config';

const {test, expect} = require('@playwright/test');

const { generateTestCode } = require('../utils/generateRandomCode');

const { addContactRecord } = require('../utils/addContact');

const { loginToAccount } = require('../utils/userLogin');

test('Test Delete Contact Record Feature', async({request, page})=>{
	const testCode = generateTestCode();
	const firstName = `firstname${testCode}`;
	const lastName = `lastname${testCode}`;
	const email = `${firstName}@test.com`;

	const response = await addContactRecord(request, firstName, lastName, email);

	await loginToAccount(page);
	
	await page.getByRole('cell', { name: `${process.env.firstName} ${process.env.lastName}` }).click();
	page.once('dialog', dialog => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => {});
	});
	await page.getByRole('button', { name: 'Delete Contact' }).click();

})