const generateCategorySlug = (categoryTitle) => {
	const titleInLowerCase = categoryTitle.toLowerCase();
	const testCategorySlug = titleInLowerCase.replace(" ", "-");
	return testCategorySlug;
}

module.exports = {
	generateCategorySlug
}