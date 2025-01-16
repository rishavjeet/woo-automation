/**
 * extractPrdtSlug - Converts a product title into a URL-friendly slug.
 *
 * @param {string} productTitle - The title of the product to be converted into a slug.
 * @returns {string} - The generated product slug, which is lowercase and spaces replaced by hyphens.
 *
 * @description
 * This function takes a product title as input and converts it into a URL-friendly slug. 
 * It achieves this by:
 * - Splitting the title into words using spaces as delimiters.
 * - Joining the words with hyphens.
 * - Converting all characters to lowercase.
 *
 * The resulting slug can be used in constructing URLs or for other purposes where a clean, 
 * URL-compatible string representation of the product title is required.
 *
 * @example
 * const { extractPrdtSlug } = require('./getProductSlug');
 * const slug = extractPrdtSlug('Demo Product Title');
 * console.log(slug); // Output: "demo-product-title"
 */

const extractPrdtSlug = (productTitle) => {

	// Split the product title into words, join them with hyphens, and convert to lowercase
	return productTitle.split(" ").join("-").toLowerCase();
}

module.exports = {
	extractPrdtSlug
}