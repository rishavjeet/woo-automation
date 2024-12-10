import 'dotenv/config';

const userSignUp = async(page)=>{
	await page.goto(process.env.TEST_WEBSITE_URL);
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill(process.env.EMAIL);
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill(process.env.PASSWORD);
	await page.getByRole('button', { name: 'Submit' }).click();
}

module.exports = {
	userSignUp
}
