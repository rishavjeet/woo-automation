const { test, expect } = require('@playwright/test');

const { loginToAccount } = require('../utils/userLogin');

test('Test the adding contact records feature', async({page})=>{

	await loginToAccount(page);

	await page.getByRole('button', { name: 'Add a New Contact' }).click();
	await page.getByPlaceholder('First Name').click();
	await page.getByPlaceholder('First Name').fill('testfname4680');
	await page.getByPlaceholder('Last Name').click();
	await page.getByPlaceholder('Last Name').fill('testlname4680');
	await page.getByPlaceholder('yyyy-MM-dd').click();
	await page.getByPlaceholder('yyyy-MM-dd').fill('2001-08-03');
	await page.getByPlaceholder('example@email.com').click();
	await page.getByPlaceholder('example@email.com').fill('test4680@test.com');
	await page.getByPlaceholder('8005551234').click();
	await page.getByPlaceholder('8005551234').fill('1234567890');
	await page.getByPlaceholder('Address 1').click();
	await page.getByPlaceholder('Address 1').fill('Kolkata');
	await page.getByPlaceholder('Address 2').click();
	await page.getByPlaceholder('Address 2').fill('Jaipur');
	await page.getByPlaceholder('City').click();
	await page.getByPlaceholder('City').fill('Uttarpara');
	await page.getByPlaceholder('State or Province').click();
	await page.getByPlaceholder('State or Province').fill('Andhra Pradesh');
	await page.getByPlaceholder('Postal Code').click();
	await page.getByPlaceholder('Postal Code').fill('123456');
	await page.getByPlaceholder('Country').click();
	await page.getByPlaceholder('Country').fill('USA');
	await page.getByRole('button', { name: 'Submit' }).click();

	await expect(page.getByRole('cell', { name: 'testfname1234 testlname1234' })).toBeVisible();

});