const {test, expect} = require('@playwright/test');

test('Test Add contact API', async({request})=>{
	const response = await request.post('https://thinking-tester-contact-list.herokuapp.com/contacts/',
		{
			data: {
				"firstName": "Raju",
				"lastName": "Doe",
				"birthdate": "1970-01-01",
				"email": "jdoe@fake.com",
				"phone": "8005555555",
				"street1": "1 Main St.",
				"street2": "Apartment A",
				"city": "Anytown",
				"stateProvince": "KS",
				"postalCode": "12345",
				"country": "USA"
			},
			headers: {
				"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4MTMwYjlmNGM4ZDAwMTNjYzQ3ODkiLCJpYXQiOjE3MzQwMDM2MDl9.e8ipQl8GzOCR3CAT37dOKxN3X7vWj390CyPfekGZSjw"
			}
		}
	);

	console.log(await response.json());

	await expect(response.status()).toBe(201);
})