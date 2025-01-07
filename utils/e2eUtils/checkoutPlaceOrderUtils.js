/**
 * Function to simulate the checkout and order placement process for an e-commerce platform.
 *
 * @param {object} page - Playwright's Page object representing the browser page.
 * @param {string} firstName - The first name of the customer for billing information.
 * @param {string} lastName - The last name of the customer for billing information.
 * @param {string} productTitle - The title of the product to add to the cart and checkout.
 *
 * This function performs the following steps:
 * 1. Navigates to the product page using its slug.
 * 2. Adds the product to the cart.
 * 3. Navigates to the checkout page.
 * 4. Fills in the billing details including name, address, city, state, and postal code.
 * 5. Selects a billing option (e.g., Cash on Delivery).
 * 6. Places the order by clicking the "Place Order" button.
 */

const { extractPrdtSlug } = require("./getProductSlug");

const checkoutPlaceOrder = async (page, firstName, lastName, productTitle) => {
  // Extract the product slug from its title
  const prdtSlug = extractPrdtSlug(productTitle);

  // Navigate to the product's page using its slug
  await page.goto(`${process.env.WP_BASE_URL}product/${prdtSlug}`);

  // Locate and click the "Add to cart" button
  const addToCartBtn = page.locator('//button[contains(text(),"Add to cart")]');
  await addToCartBtn.click();

  // Navigate to the checkout page
  await page.goto(`${process.env.WP_BASE_URL}checkout`);

  // Fill in the billing details

  // Select the billing country (India in this case)
  const billingCountryField = page.locator('//select[@id="billing-country"]');
  await billingCountryField.selectOption("India");

  // Enter the customer's first name
  const firstNameField = page.locator('//input[@id="billing-first_name"]');
  await firstNameField.fill(firstName);

  // Enter the customer's last name
  const lastNameField = page.locator('//input[@id="billing-last_name"]');
  await lastNameField.fill(lastName);

  // Enter the billing address
  const addressField1 = page.locator('//input[@id="billing-address_1"]');
  await addressField1.fill("ABC st.");

  // Enter the billing city
  const cityField = page.locator('//input[@id="billing-city"]');
  await cityField.fill("Kolkata");

  // Select the billing state (West Bengal in this case)
  const stateField = page.locator('//select[@id="billing-state"]');
  await stateField.selectOption("West Bengal");

  // Enter the postal code
  const pincodeField = page.locator('//input[@id="billing-postcode"]');
  await pincodeField.fill("123456");

  // Select the billing option (e.g., Cash on Delivery)
  const billingOption = page.locator(
    '//span[contains(text(),"Cash on delivery")]'
  );
  await billingOption.click();

  // Locate and click the "Place Order" button
  const placeOrderBtn = page.locator('//div[contains(text(),"Place Order")]');
  await placeOrderBtn.click();
};

module.exports = {
  checkoutPlaceOrder,
};
