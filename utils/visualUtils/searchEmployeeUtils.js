const searchEmployee = async ( page ) => {
  const pimMenuItem = page.locator(
    '//span[contains(@class,"oxd-main-menu-item--name") and text()="PIM"]'
  );
  await pimMenuItem.click();

  const employeeNameField = page.locator(
    ".oxd-grid-item.oxd-grid-item--gutters:first-of-type input"
  );
  await employeeNameField.click();

  await employeeNameField.fill("Amy");

  const employeeSearchBtn = page.locator("button.orangehrm-left-space");
  await employeeSearchBtn.click();
};

module.exports = {
	searchEmployee
}
