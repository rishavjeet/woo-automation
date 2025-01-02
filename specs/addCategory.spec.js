const { test, expect } = require("@wordpress/e2e-test-utils-playwright");

test.describe("It should test the Product Category features", () => {
  test("It should test the add category feature", async ({ admin, page }) => {
    await admin.visitAdminPage(
      "edit-tags.php",
      "taxonomy=product_cat&post_type=product"
    );

    const categoryNameField = page.locator('//input[@id="tag-name"]');
    await categoryNameField.fill("TestCategory");
    const categorySlugField = page.locator('//input[@id="tag-slug"]');
    await categorySlugField.fill("test-cat");
    const categoryDecriptionField = page.locator(
      '//textarea[@id="tag-description"]'
    );
    await categoryDecriptionField.fill("This is a category for testing");
    const addNewCategoryButton = page.locator('//input[@id="submit"]');

	await addNewCategoryButton.click();

	await expect(page.locator('//a[contains(@class, "row") and text()="TestCategory"]')).toBeVisible();
  });
});
