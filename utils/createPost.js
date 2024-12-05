/**
 * Utility function for creating a new WordPress post.
 * 
 * This function navigates to the WordPress "Add New Post" page, enters a post title and content,
 * and publishes the post. It assumes the user is already logged in to the WordPress admin dashboard.
 * 
 * @param {object} page - The Playwright `page` object representing the browser page context.
 * 
 * Function Details:
 * - The title of the post is hardcoded as "Test Post".
 * - The content of the post is hardcoded as "test post content".
 */
const createWpPost = async ( page ) => {
	// Navigate to the "Posts" section in the WordPress admin dashboard
	await page.getByRole('link', { name: 'Posts', exact: true }).click();
	
	// Click the "Add New Post" button
	await page.locator('#wpbody-content').getByRole('link', { name: 'Add New Post' }).click();
	
	// Access the editor iframe and click on the "Add title" field to enter the post title
	await page.locator('iframe[name="editor-canvas"]').contentFrame().getByLabel('Add title').click();
	await page.locator('iframe[name="editor-canvas"]').contentFrame().getByLabel('Add title').fill('Test Post');
	
	// Access the default block and enter content for the post
	await page.locator('iframe[name="editor-canvas"]').contentFrame().getByLabel('Add default block').click();
	await page.locator('iframe[name="editor-canvas"]').contentFrame().getByLabel('Empty block; start writing or').fill('test post content');
	
	// Click the "Publish" button to prepare the post for publishing
	await page.getByRole('button', { name: 'Publish', exact: true }).click();
	
	// Confirm the publish action by clicking the final "Publish" button
	await page.getByLabel('Editor publish').getByRole('button', { name: 'Publish', exact: true }).click();
}

// Export the createWpPost function for use in other test scripts
module.exports = {
	createWpPost

}