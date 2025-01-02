const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

test.describe('It should test the Simple Product Functionality', ()=>{

	test('It should test the creation of simple product', async({admin, page})=>{
		await admin.visitAdminPage( '/post-new.php','post_type=product' );
		
		const productTitle = page.locator('//input[@id="title"]');
		await productTitle.fill('Product Demo Title');
		const productDescIframe = page.frameLocator('#content_ifr');
		const productDesc =  await productDescIframe.locator('body#tinymce p');
		await productDesc.fill('New content for the paragraph.');
		const submitButton = page.locator('//input[@id="publish"]');
	
		await submitButton.click();
	
		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]//p')).toContainText('Product published.');
	
	
	});
})