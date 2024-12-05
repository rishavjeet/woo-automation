const createWpPost = async ( page ) => {
	await page.getByRole('link', { name: 'Posts', exact: true }).click();
	await page.locator('#wpbody-content').getByRole('link', { name: 'Add New Post' }).click();
	await page.locator('iframe[name="editor-canvas"]').contentFrame().getByLabel('Add title').click();
	await page.locator('iframe[name="editor-canvas"]').contentFrame().getByLabel('Add title').fill('Test Post');
	await page.locator('iframe[name="editor-canvas"]').contentFrame().getByLabel('Add default block').click();
	await page.locator('iframe[name="editor-canvas"]').contentFrame().getByLabel('Empty block; start writing or').fill('test post content');
	await page.getByRole('button', { name: 'Publish', exact: true }).click();
	await page.getByLabel('Editor publish').getByRole('button', { name: 'Publish', exact: true }).click();
}

module.exports = {
	createWpPost
}