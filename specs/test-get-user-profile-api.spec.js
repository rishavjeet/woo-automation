/**
 * @file Test to validate the "Get User Profile" API endpoint.
 *
 * This script uses Playwright to send a GET request to the "Get User Profile" endpoint of the application.
 * It verifies that the API responds successfully (HTTP 200) and logs the response data for debugging purposes.
 */

import 'dotenv/config';

const {test, expect} = require('@playwright/test');

/**
 * Test: Get User Profile API
 *
 * This test sends a GET request to the "Get User Profile" endpoint using Playwright's request context.
 * It includes the necessary authorization headers and validates the response status code.
 * Additionally, it logs the response body to the console for inspection.
 */

test('Tests Get User Profile API', async({request})=>{

	// Send a GET request to the "Get User Profile" API endpoint with an authorization token.
	const response = await request.get(`${process.env.TEST_WESITE_API}/users/me`,
					{
						headers:{
							// Include the Authorization header with a Bearer token retrieved from environment variables.
							"Authorization": `Bearer ${process.env.AUTHORIZATION_KEY}`
						}
					}
	);

	// Parse the response body as JSON.
	const responseData = await response.json();

	// Log the response data to the console for debugging purposes.
	console.log( responseData );

	// Assert that the HTTP status code of the response is 200 (OK).
	await expect(response.status()).toBe(200);
})