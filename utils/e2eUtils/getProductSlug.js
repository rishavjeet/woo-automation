const extractPrdtSlug = (productTitle, productDescription) => {

	return productTitle.split(" ").join("-").toLowerCase(); + productDescription.split(" ").join("-").toLowerCase();
}

module.exports = {
	extractPrdtSlug
}