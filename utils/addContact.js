import 'dotenv/config';

const {test, expect} = require('@playwright/test');

const addContactRecord = async (request, firstName, lastName, email) => {

	const response = await request.post(`${process.env.TEST_WESITE_API}/contacts/`,
		{
			data: {
				"firstName": firstName,
				"lastName": lastName,
				"birthdate": "1970-01-01",
				"email": email,
				"phone": "8005555555",
				"street1": "1 Main St.",
				"street2": "Apartment A",
				"city": "Anytown",
				"stateProvince": "KS",
				"postalCode": "12345",
				"country": "USA"
			},
			headers: {
				"Authorization": `Bearer ${process.env.AUTHORIZATION_KEY}`
			}
		}
	);

	return response;
	
}

module.exports = {
	addContactRecord
}