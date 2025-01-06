const { extractPrdtSlug } = require("./getProductSlug");

const checkoutPlaceOrder = async (
  page,
  firstName,
  lastName,
  productTitle
) => {
  const prdtSlug = extractPrdtSlug(productTitle);

  await page.goto(`${process.env.WP_BASE_URL}product/${prdtSlug}`);

  const addToCartBtn = page.locator('//button[contains(text(),"Add to cart")]');
  await addToCartBtn.click();

  await page.goto(`${process.env.WP_BASE_URL}checkout`);

  const billingCountryField = page.locator('//select[@id="billing-country"]');
  await billingCountryField.selectOption("India");

  const firstNameField = page.locator('//input[@id="billing-first_name"]');
  await firstNameField.fill(firstName);

  const lastNameField = page.locator('//input[@id="billing-last_name"]');
  await lastNameField.fill(lastName);

  const addressField1 = page.locator('//input[@id="billing-address_1"]');
  await addressField1.fill("ABC st.");

  const cityField = page.locator('//input[@id="billing-city"]');
  await cityField.fill("Kolkata");

  const stateField = page.locator('//select[@id="billing-state"]');
  await stateField.selectOption("West Bengal");

  const pincodeField = page.locator('//input[@id="billing-postcode"]');
  await pincodeField.fill("123456");

  const billingOption = page.locator(
    '//span[contains(text(),"Cash on delivery")]'
  );
  await billingOption.click();

  const placeOrderBtn = page.locator('//div[contains(text(),"Place Order")]');
  await placeOrderBtn.click();
};

module.exports = {
  checkoutPlaceOrder,
};
