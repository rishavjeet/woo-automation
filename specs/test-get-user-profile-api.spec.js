const {test, expect} = require('@playwright/test');

test('Tests Get User Profile API', async({request})=>{
	const response = await request.get('https://thinking-tester-contact-list.herokuapp.com/users/me',
					{
						headers:{
							"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4MTMwYjlmNGM4ZDAwMTNjYzQ3ODkiLCJpYXQiOjE3MzQwMDM2MDl9.e8ipQl8GzOCR3CAT37dOKxN3X7vWj390CyPfekGZSjw"
						}
					}
	);
	console.log(await response.json());

	await expect(response.status()).toBe(200);
})