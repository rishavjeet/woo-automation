/**
 * Test suite for demonstrating the mocha timeouts and retrys
 */

const assert = require('assert');

describe('Test Suite to demonstrate the timeout and retry in Mocha', function() {

	//Setting the time out value for the overall test suit.
	this.timeout(500);

	/**
	 * Test case for the subtraction operation.
	 * 
	 */
	it('Subtraction of 2 numbers, will pass', () => {
		// Define two numbers
		const num1 = 10;
		const num2 = 20;

		// Perform subtraction and use absolute value
		const result = Math.abs(num1 - num2);

		// Assert the result is as expected
		assert.equal(result, 10);
	});
  /**
   * Test case for the addition operation.
   * 
   * Setting the timeout for value for this tes case to be 500ms and setImeout value to be 3s
   * Thus, the test will fail
   */
  it('Addition of 2 numbers, will fail', function(done) {

	this.timeout(300);

	setTimeout(done,3000);

    // Define two numbers
    const num1 = 10;
    const num2 = 20;

    // Perform addition
    const sum = num1 + num2;

    // Assert the sum is as expected
    assert.equal(sum, 30);
  });


});