/**
 * Utility function for adding product image.
 */

const addProductImage = async (page, requestUtils) => {
  // Upload a test image to the media library
  await requestUtils.uploadMedia("assets/product_test_image.png");

  // Store the current product edit screen URL for later navigation
  const prdtEditScreen = page.url();

  await page.getByRole("link", { name: "Set product image" }).click();

  // Switch to media Library
  //   const mediaLibraryTab = await page.locator('//a[text()="Media Library"]');
  //   await mediaLibraryTab.click();

  // Click the 'Use as Product Imagw' button
  //   const usePrdtImgBtn = await page.locator(
  //     '//a[text()="Use as product image"]'
  //   );
  //   await usePrdtImgBtn.click();

  // Switch to editor screen
  //   await page.goto(prdtEditScreen);

  // Select the image from the media library
  const selectedImage = page.locator('//li[@aria-label="product_test_image"]');
  await selectedImage.click();

  await selectedImage.click();

  // Click on "Set Product image" button
  const setPrdtImgBtn = page.locator('//button[text()="Set product image"]');
  await selectedImage.click();
  await setPrdtImgBtn.click();

  // wait for 2 sec time interval.
  await page.waitForTimeout(2000);

  // Locate the 'Update' button and click it to save the changes
  const updateButton = page.locator('//input[@id="publish"]');
  await updateButton.click();
};

module.exports = {
  addProductImage,
};
