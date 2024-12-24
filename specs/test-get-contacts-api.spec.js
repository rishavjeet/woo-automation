import 'dotenv/config';

import { request } from 'http';
const { test, expect } = require('@playwright/test');


/**
 * Test suite for verifying the Get All Contacts API functionality.
 * 
 * This test case performs the following:
 * 1. Sends a GET request to the `/contacts` endpoint of the API.
 * 2. Includes an authorization header with a Bearer token for authentication.
 * 3. Logs the API response for debugging purposes.
 * 4. Validates that the response status code is 200, indicating success.
 * 
 * Environment Variables:
 * - `TEST_WESITE_API`: The base URL for the API.
 * - `AUTHORIZATION_KEY`: The Bearer token used for API authentication.
 * 
 * Prerequisites:
 * - A `.env` file must be configured with the necessary environment variables.
 * - The API endpoint must be functional and accessible.
 * 
 * Dependencies:
 * - Playwright's testing framework (`@playwright/test`) for API testing and assertions.
 * - Node's built-in `http` module for handling HTTP requests.
 * 
 * @function
 * @name TestGetAllContactsAPI
 * @async
 * @param {Object} request - The Playwright request object used for making HTTP requests.
 * @returns {void}
 */
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