const deleteTestPost = async ( page, postTitle ) => {
	await page.getByRole('link', { name: 'Posts', exact: true }).click();
	await page.getByLabel('Move “Test Post-4284” to the').click();
	await page.getByRole('link', { name: 'Trash (1)' }).click();
  	await page.getByLabel('Delete “Test Post-4284”').click();
}

module.exports = {
	deleteTestPost
}