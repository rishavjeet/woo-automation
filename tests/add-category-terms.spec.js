import {test, expect} from '@playwright/test';

import { adminLogin } from "../utils/userLogin";

import { generateTestCode } from "../utils/generateRandomCode";

import { generateCategorySlug } from "../utils/generateCatSlug";

test('Add WP categories', async ({page})=>{
	await adminLogin(page);

	const testCategoryCode =  generateTestCode();
	
	const testCategoryTitle = `Test Category ${testCategoryCode}`;

	const testCategorySlug =  generateCategorySlug(testCategoryTitle);


	await page.getByRole('link', { name: 'Posts', exact: true }).click();
	await page.getByRole('link', { name: 'Categories' }).click();
	await page.getByRole('textbox', { name: 'Title' }).click();
	await page.getByRole('textbox', { name: 'Title' }).fill(testCategoryTitle);
	await page.getByRole('textbox', { name: 'Slug' }).click();
	await page.getByRole('textbox', { name: 'Slug' }).fill(testCategorySlug);
	await page.getByRole('textbox', { name: 'Description' }).click();
	await page.getByRole('textbox', { name: 'Description' }).fill('This category is for testing');
	await page.getByRole('button', { name: 'Add New Category' }).click();

	// await expect(page.getByLabel(``))

});
