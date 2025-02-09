const addEmployeeRecord = async (
  page,
  employeeFirstName,
  employeeMiddleName,
  employeeLastName,
  employeeUsername,
  employeePassword
) => {
  const employeeFirstNameField = page.locator(
    ".--name-grouped-field .oxd-input-group:nth-child(1) input"
  );
  await employeeFirstNameField.click();
  await employeeFirstNameField.fill(employeeFirstName);

  const employeeMiddleNameField = page.locator(
    ".--name-grouped-field .oxd-input-group:nth-child(2) input"
  );
  await employeeMiddleNameField.click();
  await employeeMiddleNameField.fill(employeeMiddleName);

  const employeeLastNameField = page.locator(
    ".--name-grouped-field .oxd-input-group:nth-child(3) input"
  );
  await employeeLastNameField.click();
  await employeeLastNameField.fill(employeeLastName);

  const credentialsDetailsBtn = page.locator(".oxd-switch-input");
  await credentialsDetailsBtn.click();

  const usernameField = page.locator(
    ".oxd-form-row:nth-child(4) input.oxd-input"
  );
  await usernameField.click();
  await usernameField.fill(employeeUsername);

  const statusField = page.locator(
    '.oxd-form-row:nth-child(4) input[value="1"] ~ span'
  );
  await statusField.click();

  const passwordField = page.locator(".user-password-cell input");
  await passwordField.click();
  await passwordField.fill(employeePassword);

  const confirmPasswordField = page.locator('input[type="password"]').nth(1);
  await confirmPasswordField.click();
  await confirmPasswordField.fill(employeePassword);

  const saveBtn = page.locator('button[type="submit"].orangehrm-left-space');
  await saveBtn.click();
};

module.exports = {
  addEmployeeRecord,
};
