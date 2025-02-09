const searchEmployee = async ( page, empName ) => {
  const pimMenuItem = page.locator(
    '//span[contains(@class,"oxd-main-menu-item--name") and text()="PIM"]'
  );
  await pimMenuItem.click();

  const employeeNameField = page.locator(
    ".oxd-grid-item.oxd-grid-item--gutters:first-of-type input"
  );
  await employeeNameField.click();

  await employeeNameField.fill(empName);

  const employeeSearchBtn = page.locator("button.orangehrm-left-space");
  await employeeSearchBtn.click();
};

module.exports = {
	searchEmployee
}
