const { test, expect } = require('@playwright/test');

const { generateTestCode } = require('../utils/generateRandomCode');

test('Tests User Sign-up feature', async({page})=>{


	const testRandomCode = generateTestCode();

	const userFirstName = `testfname${testRandomCode}`;

	const userLastName = `testfname${testRandomCode}`;

	const userEmail = `test${testRandomCode}@trial.com`;

	const userPassword = `test${testRandomCode}`;

	await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
	await page.getByRole('button', { name: 'Sign up' }).click();
	await page.getByPlaceholder('First Name').click();
	await page.getByPlaceholder('First Name').fill(userFirstName);
	await page.getByPlaceholder('Last Name').click();
	await page.getByPlaceholder('Last Name').fill(userLastName);
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill(userEmail);
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill(userPassword);
	await page.getByRole('button', { name: 'Submit' }).click();

	await expect(page.getByRole('cell', {name: "Name"})).toBeVisible();
	
})