/**
 * Creates a taxonomy (e.g., category or tag) in the WordPress admin interface.
 *
 * @param {object} admin - Admin utility object for navigating the WordPress admin area.
 * @param {object} page - Playwright page object for browser interaction.
 * @param {string} type - The type of taxonomy to create ('Category' or 'Tag').
 * @param {string} taxonomyName - The name of the taxonomy to create.
 * @param {string} taxonomyDescription - The description of the taxonomy.
 */

const createTaxonomy = async( admin, page, type, taxonomyName, taxonomyDescription )=>{
	
	// Determine the taxonomy slug based on the type (Category or Tag)
	const  taxSlug = type === 'Category' ? 'cat' : 'tag';

	// Navigate to the taxonomy creation page in the WordPress admin area
	await admin.visitAdminPage(
		"edit-tags.php",
		`taxonomy=product_${taxSlug}&post_type=product`
	  );
  
	  // Locate and fill the taxonomy name field
	  const taxonomyNameField = page.locator('//input[@id="tag-name"]');
	  await taxonomyNameField.fill(taxonomyName);

	  // Locate and fill the taxonomy slug field (used for URL-friendly identifier)
	  const taxonomySlugField = page.locator('//input[@id="tag-slug"]');
	  await taxonomySlugField.fill("test-cat");

	  // Locate and fill the taxonomy description field
	  const categoryDecriptionField = page.locator(
		'//textarea[@id="tag-description"]'
	  );

	  // Locate and click the "Add New" button to create the taxonomy
	  await categoryDecriptionField.fill(taxonomyDescription);
	  const addNewCategoryButton = page.locator('//input[@id="submit"]');
  
	  await addNewCategoryButton.click();

}

module.exports = {
	createTaxonomy
}