/**
 * @fileoverview Utility function to apply a coupon discount during the checkout process in a WordPress/WooCommerce environment.
 *
 * This module provides a function that navigates through a product's page,
 * adds the product to the cart, and applies a coupon code during the checkout.
 */
const { extractPrdtSlug } = require("./getProductSlug");

/**
 * Automates the process of applying a coupon discount during checkout.
 *
 * This function adds a specified product to the cart by navigating to its page,
 * proceeds to the checkout page, and applies a given coupon code.
 *
 * @async
 * @param {object} page - The Playwright `Page` object representing a browser tab.
 * @param {string} productTitle - The title of the product to be added to the cart.
 * @param {string} couponCode - The coupon code to apply during checkout.
 *
 * @throws Will throw an error if navigation or interactions with page elements fail.
 */
const applyCouponDiscount = async (page, productTitle, couponCode) => {
  // Extract the product slug from the product title
  const prdtSlug = extractPrdtSlug(productTitle);

  // Navigate to the product page using the extracted slug
  await page.goto(`${process.env.WP_BASE_URL}product/${prdtSlug}`);

  // Locate and click the "Add to cart" button to add the product to the cart
  const addToCartBtn = page.locator('//button[contains(text(),"Add to cart")]');
  await addToCartBtn.click();

  // Navigate to the checkout page
  await page.goto(`${process.env.WP_BASE_URL}checkout`);

  // Open the coupon code input field on the checkout page
  const couponFieldBtn = page.locator(
    '//div[contains(@class,"wc-block-components-totals-coupon")]//div[@role="button"]'
  );
  await couponFieldBtn.click();

  // Locate and focus on the coupon code input field
  const couponCodeField = page.locator(
    '//input[@id="wc-block-components-totals-coupon__input-coupon"]'
  );
  await couponCodeField.click();

  // Fill in the provided coupon code
  await couponCodeField.fill(couponCode);

  // Locate and click the "Apply" button to apply the coupon
  const couponApplyBtn = page.locator('//span[contains(text(),"Apply")]');
  await couponApplyBtn.click();
};

module.exports = {
  applyCouponDiscount,
};
