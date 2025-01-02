const addNewProduct = async (admin, page) => {
  await admin.visitAdminPage("/post-new.php", "post_type=product");

  const productTitle = page.locator('//input[@id="title"]');
  await productTitle.fill("Product Demo Title");
  const productDescIframe = page.frameLocator("#content_ifr");
  const productDesc = await productDescIframe.locator("body#tinymce p");
  await productDesc.fill("New content for the paragraph.");
  const submitButton = page.locator('//input[@id="publish"]');

  await submitButton.click();
};

module.exports = {
	addNewProduct
}
