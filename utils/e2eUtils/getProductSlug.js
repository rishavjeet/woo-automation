const extractPrdtSlug = (productTitle) => {

	return productTitle.split(" ").join("-").toLowerCase();
}

module.exports = {
	extractPrdtSlug
}