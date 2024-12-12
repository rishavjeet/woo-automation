const { test, expect } = require('@playwright/test');

const { loginToAccount } = require('../utils/userLogin');

test('Test User Login Feature', async({page})=>{

	await loginToAccount(page);

	await expect(page.getByRole('heading', {name: 'Contact List'})).toBeVisible();

});
