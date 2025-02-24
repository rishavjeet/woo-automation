const { test, expect } = require("@playwright/test");


// Import utility functions for login, navigation, and employee management
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


/**
 * Test suite for verifying the add employee functionality.
 */
test.describe("Add Employee Feature Verification", () => {
  let empName = "";
  let testCode = 0;

  let employeeFirstName = "";
  let employeeMiddleName = "";
  let employeeLastName = "";

  let employeeUsername = "";
  let employeePassword = "";

  /**
   * Setup function executed once before all tests.
   * Generates static employee details for consistency in visual tests.
   */
  test.beforeAll(() => {
    empName = employeeNameGenerator(5); // Generate a random employee name prefix
    testCode = generateTestCode(); // Generate a unique test code

	// Reduced some dynamic inputs to avoid excessive masks in visual tests.
    // employeeFirstName = `${empName}Fname${testCode}`;
    // employeeMiddleName = `${empName}Lname${testCode}`;
    // employeeLastName = `${empName}Lname${testCode}`;

	// Use static employee details to minimize dynamic elements in visual tests
	employeeFirstName = 'test_Emp_FName';
	employeeMiddleName = 'test_Emp_MName';
	employeeLastName = 'test_Emp_LName';

	// Employee Credentials
    employeeUsername = `${empName}_${testCode}`;
    employeePassword = `${empName}pwd123`;
  });

  test.beforeEach(async ({ page }) => {

    await userLogin(page); // Perform user login

    await visitAddEmployeePage(page); // Navigate to the Add Employee page
  });

  /**
   * Test to validate the UI of the Add Employee form.
   * Captures and compares a screenshot with the baseline image.
   */
  test("It should Validate the add employee form UI", async ({ page }) => {
    await page.waitForTimeout(3000); // Wait for elements to stabilize

    // Capture the screenshot and compare with the baseline
    await expect(page).toHaveScreenshot("add-employee-form.png", {
      timeout: 3000, // Set the timeout for the screenshot action
      fullPage: true, // Capture a full-page screenshot
    });
  });

  /**
   * Test to validate the Employee Details page after adding a new employee.
   * Captures and compares a screenshot with the baseline image.
   */
  test.only("It should validate the employee details page after adding new employee", async ({
    page,
  }) => {
    await page.waitForTimeout(2000); // Wait before starting interactions

	// Add a new employee using predefined details
    await addEmployeeRecord(
      page,
      employeeFirstName,
      employeeMiddleName,
      employeeLastName,
      employeeUsername,
      employeePassword
    );

    await page.waitForTimeout(7000); // Allow time for employee details page to load

    // Capture the screenshot and compare with the baseline
    await expect(page).toHaveScreenshot("employee-details.png", {
      timeout: 3000, // Set the timeout for the screenshot action
      fullPage: true, // Capture a full-page screenshot
      mask: [
        // page.locator("div.orangehrm-edit-employee-navigation"),
        // page.locator('input[name="firstName"]'),
        // page.locator('input[name="middleName"]'),
        // page.locator('input[name="lastName"]'),
		page
			.locator("input[data-v-1f99f73c].oxd-input.oxd-input--active")
			.nth(4),
      ],
    });
  });
});
