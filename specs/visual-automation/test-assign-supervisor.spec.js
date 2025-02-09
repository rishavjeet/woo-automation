const { test, expect } = require("@playwright/test");

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

  test.beforeEach(async ({ page }) => {
    empName = employeeNameGenerator(5);
    testCode = generateTestCode();

    employeeFirstName = `${empName}Fname${testCode}`;
    employeeMiddleName = `${empName}Lname${testCode}`;
    employeeLastName = `${empName}Lname${testCode}`;

    employeeUsername = `${empName}_${testCode}`;
    employeePassword = `${empName}pwd123`;

	supervisorFirstName = `testsupervisorfname${testCode}`;
	supervisorMidName = `testsupervisormname${testCode}`;
	supervisorLastName = `testsupervisorlname${testCode}`;

	supervisorUname = `testsupervisoruname${testCode}`;
	supervisorPwd = `testsupervisorpwd${testCode}`;

    await userLogin(page);

    await visitAddEmployeePage(page);
  });

  test("It should verify the UI after supervisor assignment", async ({
    page,
  }) => {

	test.slow();

    await page.waitForTimeout(2000);

    await addEmployeeRecord(
      page,
      employeeFirstName,
      employeeMiddleName,
      employeeLastName,
      employeeUsername,
      employeePassword
    );

	await page.waitForTimeout(5000);

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



	const employeeListTab = page.locator('.oxd-topbar-body-nav-tab:nth-child(2)');
	await employeeListTab.click();

	await searchEmployee(page,employeeFirstName);

	const editEmployeeRecord = page.locator('div.oxd-table-row.oxd-table-row--with-border.oxd-table-row--clickable:nth-child(1) i.oxd-icon.bi-pencil-fill');
	await page.waitForTimeout(2000);
	await editEmployeeRecord.click();

	const reportsToTab = page.locator('.orangehrm-tabs-wrapper:nth-child(8) a');
	await reportsToTab.click();

	const addSupervisorBtn = page.locator('div').filter({ hasText: /^Assigned Supervisors Add No Records FoundNameReporting MethodActions$/ }).getByRole('button');
	await addSupervisorBtn.click();
	
	// const supervisorNameField = page.locator('input[data-v-75e744cd]');
	// await supervisorNameField.fill(`${supervisorFirstName} ${supervisorMidName} ${supervisorLastName}`);

	await page.getByPlaceholder('Type for hints...').fill(supervisorFirstName);
	await page.waitForTimeout(2000);
  	await page.getByText(supervisorFirstName).click();

	await page.getByText('-- Select --').click();
    await page.getByText('Direct', { exact: true }).click();

	await page.getByRole('button', { name: 'Save' }).click();

	await page.waitForTimeout(5000);

	// Capture the screenshot and compare with the baseline
	await expect(page).toHaveScreenshot('supervisor-assignment.png',{
		timeout: 2000, // Set the timeout for the screenshot action
		fullPage: true, // Capture a full-page screenshot
		mask: [page.locator('div.orangehrm-edit-employee-navigation'),
			page.locator('div[data-v-6c07a142]').nth(0)
		],
	});

  });
});
