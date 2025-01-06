
const { extractPrdtSlug } = require("./getProductSlug");

const applyCouponDiscount = async (page, productTitle, couponCode) => {
  const prdtSlug = extractPrdtSlug(productTitle);

  await page.goto(`${process.env.WP_BASE_URL}product/${prdtSlug}`);

  const addToCartBtn = page.locator('//button[contains(text(),"Add to cart")]');
  await addToCartBtn.click();

  await page.goto(`${process.env.WP_BASE_URL}checkout`);

  const couponFieldBtn = page.locator(
    '//div[contains(@class,"wc-block-components-totals-coupon")]//div[@role="button"]'
  );
  await couponFieldBtn.click();

  const couponCodeField = page.locator(
    '//input[@id="wc-block-components-totals-coupon__input-coupon"]'
  );
  await couponCodeField.click();

  await couponCodeField.fill(couponCode);

  const couponApplyBtn = page.locator('//span[contains(text(),"Apply")]');
  await couponApplyBtn.click();
};

module.exports = {
	applyCouponDiscount
}
