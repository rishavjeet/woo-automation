const { test, expect } = require("@playwright/test");


// Import utility functions for login, navigation, employee management, and search
const { userLogin } = require('../../utils/visualUtils/loginUtils');

const {
  employeeNameGenerator,
} = require("../../utils/visualUtils/randomNameGenerator");

const { generateTestCode } = require("../../utils/e2eUtils/randomTestCode");

const {
  addEmployeeRecord,
} = require("../../utils/visualUtils/addEmployeeUtils");

const { visitAddEmployeePage } = require('../../utils/visualUtils/visitAddEmployeePageUtils');

const { searchEmployee } = require('../../utils/visualUtils/searchEmployeeUtils');


/**
 * Test suite for verifying the Supervisor Assignment UI.
 */
test.describe("Supervisor Assignment UI verification ", () => {
  let empName = "";
  let testCode = 0;

  let employeeFirstName = "";
  let employeeMiddleName = "";
  let employeeLastName = "";

  let employeeUsername = "";
  let employeePassword = "";


  let supervisorFirstName = '';
  let supervisorMidName = '';
  let supervisorLastName = '';

  let supervisorUname = '';
  let supervisorPwd = '';

  /**
   * Setup function executed before each test.
   * Generates unique employee and supervisor details.
   * Logs in the user and navigates to the Add Employee page.
   */
  test.beforeEach(async ({ page }) => {
    empName = employeeNameGenerator(5); // Generate random name prefix
    testCode = generateTestCode(); // Generate unique test code

	// Reduced some dynamic inputs to avoid excessive masks in visual tests.
    employeeFirstName = `${empName}Fname${testCode}`;
    employeeMiddleName = `${empName}Lname${testCode}`;
    employeeLastName = `${empName}Lname${testCode}`;

	// Static employee details to ensure consistency in visual tests
	// employeeFirstName = 'test_Emp_FName';
	// employeeMiddleName = 'test_Emp_MName';
	// employeeLastName = 'test_Emp_LName';

	// Dynamic Employee Credentials
    employeeUsername = `${empName}_${testCode}`;
    employeePassword = `${empName}pwd123`;

	// Reduced some dynamic inputs to avoid excessive masks in visual tests.
	supervisorFirstName = `testsupervisorfname${testCode}`;
	supervisorMidName = `testsupervisormname${testCode}`;
	supervisorLastName = `testsupervisorlname${testCode}`;

	// Static supervisor details for consistency
	// supervisorFirstName = `test_supervisor_fname`;
	// supervisorMidName = `test_supervisor_mname`;
	// supervisorLastName = `test_supervisor_lname`;

	// Dynamic Supervisor Crdentials
	supervisorUname = `testsupervisoruname${testCode}`;
	supervisorPwd = `testsupervisorpwd${testCode}`;

    await userLogin(page); // Perform user login

    await visitAddEmployeePage(page); // Wait before starting interactions
  });

  test("It should verify the UI after supervisor assignment", async ({
    page,
  }) => {

	test.slow(); // Mark test as slow due to multiple interactions

    await page.waitForTimeout(2000); // Wait before starting interactions

	// Add a new employee
    await addEmployeeRecord(
      page,
      employeeFirstName,
      employeeMiddleName,
      employeeLastName,
      employeeUsername,
      employeePassword
    );
	await page.waitForTimeout(5000);

	// Add a new supervisor
	await visitAddEmployeePage(page);
	await addEmployeeRecord(
		page,
		supervisorFirstName,
		supervisorMidName,
		supervisorLastName,
		supervisorUname,
		supervisorPwd
	  );
  
	  await page.waitForTimeout(5000);


	// Navigate to Employee List
	const employeeListTab = page.locator('.oxd-topbar-body-nav-tab:nth-child(2)');
	await employeeListTab.click();

	// Search for the added employee
	await searchEmployee(page,employeeFirstName);

	// Edit employee record
	const editEmployeeRecord = page.locator('div.oxd-table-row.oxd-table-row--with-border.oxd-table-row--clickable:nth-child(1) i.oxd-icon.bi-pencil-fill');
	await page.waitForTimeout(2000);
	await editEmployeeRecord.click();

	// Navigate to 'Reports To' tab
	const reportsToTab = page.locator('.orangehrm-tabs-wrapper:nth-child(8) a');
	await reportsToTab.click();

	// Click 'Add Supervisor' button
	const addSupervisorBtn = page.locator('div').filter({ hasText: /^Assigned Supervisors Add No Records FoundNameReporting MethodActions$/ }).getByRole('button');
	await addSupervisorBtn.click();
	
	// const supervisorNameField = page.locator('input[data-v-75e744cd]');
	// await supervisorNameField.fill(`${supervisorFirstName} ${supervisorMidName} ${supervisorLastName}`);

	// Select Supervisor
	await page.getByPlaceholder('Type for hints...').fill(supervisorFirstName);
	await page.waitForTimeout(2000);
  	await page.getByText(supervisorFirstName).click();

	// Select 'Direct' as Reporting Method
	await page.getByText('-- Select --').click();
    await page.getByText('Direct', { exact: true }).click();

	// Save Supervisor Assignment
	await page.getByRole('button', { name: 'Save' }).click();
	await page.waitForTimeout(5000);

	// Capture the screenshot and compare with the baseline
	await expect(page).toHaveScreenshot('supervisor-assignment.png',{
		timeout: 2000, // Set the timeout for the screenshot action
		fullPage: true, // Capture a full-page screenshot
		mask: [
			page.locator('div.orangehrm-edit-employee-navigation'),
			page.locator('div[data-v-6c07a142]').nth(0) // Masking dynamic elements to prevent unnecessary test failures
		],
	});

  });
});
