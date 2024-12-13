const {test, expect} = require('@playwright/test');

test('Test Add User Api', async({request})=>{
	const response = await request.post('https://thinking-tester-contact-list.herokuapp.com/users',{
		data:{
				"firstName": "Test",
				"lastName": "User",
				"email": "wewfdvafvvt1234@fake.com",
				"password": "myPassword"
		},
		headers: {
			"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4MTMwYjlmNGM4ZDAwMTNjYzQ3ODkiLCJpYXQiOjE3MzQwMDM2MDl9.e8ipQl8GzOCR3CAT37dOKxN3X7vWj390CyPfekGZSjw"
		}
	});

	console.log(await response.json());

	await expect(response.status()).toBe(201);
})