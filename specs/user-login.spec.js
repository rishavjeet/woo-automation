const { test, expect } = require('@playwright/test');

const { userSignUp } = require('../utils/userLogin');

test('Test User Login Feature', async({page})=>{

	await userSignUp(page);

	await expect(page.getByRole('heading', {name: 'Contact List'})).toBeVisible();

});
