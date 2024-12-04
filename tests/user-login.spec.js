import { test, expect } from '@playwright/test';

import { adminLogin } from '../utils/userLogin';

test('Wp User Admin Login Test', async ({ page }) => {
  	 
	test.slow();

	adminLogin(page);

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});