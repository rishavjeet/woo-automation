const addNewProduct = async (admin, page, productTitle, productDescription) => {
  await admin.visitAdminPage("/post-new.php", "post_type=product");

  const productTitleField = page.locator('//input[@id="title"]');
  await productTitleField.fill(productTitle);
  const productDescIframe = page.frameLocator("#content_ifr");
  const productDescField = await productDescIframe.locator("body#tinymce p");

  await productDescField.click();

  await productDescField.fill(productDescription);

  const submitButton = page.locator('//input[@id="publish"]');

  await submitButton.click();
};

module.exports = {
	addNewProduct
}
