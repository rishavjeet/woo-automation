/**
 * Test suite to demonstrate the chai assertions styles
 */
(async ()=>{
	const chai = await import('chai');
	const expect = chai.expect;

	// define 2 constant values
	const num1 = 10;
	const num2 = 10;

	expect(num1).to.be.equal(num2, "The numbers are not equal");

})()
