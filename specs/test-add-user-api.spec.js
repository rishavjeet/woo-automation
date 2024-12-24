import 'dotenv/config';

const {test, expect} = require('@playwright/test');

const { generateTestCode } = require('../utils/generateRandomCode');

/**
 * Test suite for verifying the Add User API functionality.
 * 
 * This test case performs the following:
 * 1. Generates a unique user identifier using the `generateTestCode` utility function.
 * 2. Constructs user data with the unique identifier for `firstName`, `lastName`, and `email`.
 * 3. Sends a POST request to the `/users` API endpoint with the user details and authorization token.
 * 4. Validates the response status code to ensure the user is successfully created.
 * 5. Logs the API response for debugging purposes.
 * 
 * Environment Variables:
 * - `TEST_WESITE_API`: Base URL for the API endpoint.
 * - `AUTHORIZATION_KEY`: Bearer token for API authentication.
 * 
 * Prerequisites:
 * - A `.env` file must be properly configured with the required environment variables.
 * - The API endpoint should be reachable and functional.
 * 
 * Dependencies:
 * - Playwright for API testing (`@playwright/test`).
 * - A utility function `generateTestCode` for creating unique identifiers.
 * 
 * @function
 * @name TestAddUserAPI
 * @async
 * @param {Object} request - The Playwright request object for making HTTP requests.
 * @returns {void}
 */

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

	// Log the API response for debugging
	console.log(await response.json());

	// Assert that the response status is 201 (Created)
	await expect(response.status()).toBe(201);
})