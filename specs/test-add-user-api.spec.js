import 'dotenv/config';

const {test, expect} = require('@playwright/test');

const { generateTestCode } = require('../utils/generateRandomCode');

test('Test Add User Api', async({request})=>{

	const testCode = generateTestCode();
	const firstName = `firstname${testCode}`;
	const lastName = `lastname${testCode}`;
	const email = `${firstName}@test.com`;

	const response = await request.post(`${process.env.TEST_WESITE_API}/users`,{
		data:{
				"firstName": firstName,
				"lastName": lastName,
				"email": email,
				"password": "myPassword"
		},
		headers: {
			"Authorization": `Bearer ${process.env.AUTHORIZATION_KEY}`
		}
	});

	console.log(await response.json());

	await expect(response.status()).toBe(201);
})