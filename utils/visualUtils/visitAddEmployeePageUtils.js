const visitAddEmployeePage = async (page) => {
  const pimMenuItem = page.locator(
    '//span[contains(@class,"oxd-main-menu-item--name") and text()="PIM"]'
  );
  await pimMenuItem.click();

  const addEmployeeTabBtn = page.locator(
    ".oxd-topbar-body-nav-tab:nth-child(3)"
  );
  await addEmployeeTabBtn.click();
};

module.exports = {
	visitAddEmployeePage
}
