import { test, expect } from '@playwright/test';

import { adminLogin } from '../utils/userLogin';

test('WP User Admin Login Test', async ({ page }) => {

	adminLogin(page);

  	await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});