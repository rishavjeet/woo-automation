const { test, expect } = require("@playwright/test");

const { userLogin } = require("../../utils/visualUtils/loginUtils");

const {
  visitAddEmployeePage,
} = require("../../utils/visualUtils/visitAddEmployeePageUtils");

const {
  employeeNameGenerator,
} = require("../../utils/visualUtils/randomNameGenerator");

const { generateTestCode } = require("../../utils/e2eUtils/randomTestCode");

const {
  addEmployeeRecord,
} = require("../../utils/visualUtils/addEmployeeUtils");

test.describe("Admin Dashboard Verification", () => {
  let empName = "";
  let testCode = 0;

  let employeeFirstName = "";
  let employeeMiddleName = "";
  let employeeLastName = "";

  let employeeUsername = "";
  let employeePassword = "";

  test.beforeAll(() => {
    empName = employeeNameGenerator(5);
    testCode = generateTestCode();

    employeeFirstName = `${empName}Fname${testCode}`;
    employeeMiddleName = `${empName}Lname${testCode}`;
    employeeLastName = `${empName}Lname${testCode}`;

    employeeUsername = `${empName}_${testCode}`;
    employeePassword = `${empName}pwd123`;
  });

  test.beforeEach(async ({ page }) => {
    await userLogin(page);

    await visitAddEmployeePage(page);
  });

  test("It should Validate the add employee form UI", async ({ page }) => {
    await page.waitForTimeout(3000);

    // Capture the screenshot and compare with the baseline
    await expect(page).toHaveScreenshot("add-employee-form.png", {
      timeout: 3000, // Set the timeout for the screenshot action
      fullPage: true, // Capture a full-page screenshot
    });
  });

  test.only("It should validate the employee details page after adding new employee", async ({
    page,
  }) => {
    await page.waitForTimeout(2000);

    await addEmployeeRecord(
      page,
      employeeFirstName,
      employeeMiddleName,
      employeeLastName,
      employeeUsername,
      employeePassword
    );

    await page.waitForTimeout(7000);

    // Capture the screenshot and compare with the baseline
    await expect(page).toHaveScreenshot("employee-details.png", {
      timeout: 3000, // Set the timeout for the screenshot action
      fullPage: true, // Capture a full-page screenshot
      mask: [
        page.locator("div.orangehrm-edit-employee-navigation"),
        page.locator('input[name="firstName"]'),
        page.locator('input[name="middleName"]'),
        page.locator('input[name="lastName"]'),
		page
			.locator("input[data-v-1f99f73c].oxd-input.oxd-input--active")
			.nth(4),
      ],
    });
  });
});
