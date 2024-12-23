import 'dotenv/config';

const {test, expect} = require('@playwright/test');

test('Tests Get User Profile API', async({request})=>{
	const response = await request.get(`${process.env.TEST_WESITE_API}/users/me`,
					{
						headers:{
							"Authorization": `Bearer ${process.env.AUTHORIZATION_KEY}`
						}
					}
	);
	const responseData = await response.json();
	console.log( responseData );

	await expect(response.status()).toBe(200);
})