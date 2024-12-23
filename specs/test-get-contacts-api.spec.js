import 'dotenv/config';

import { request } from 'http';
const { test, expect } = require('@playwright/test');

test('Test the getAllContact API', async({request}) => {
	const response = await request.get(`${process.env.TEST_WESITE_API}/contacts`,
						{
							headers: {
								"Authorization": `Bearer ${process.env.AUTHORIZATION_KEY}`
							}
						}
					);

	console.log(await response.json());
	expect(response.status()).toBe(200);
})