/**
 * Test Suite - Mathematical Operations
 *
 * This test suite includes basic mathematical operation tests: addition, subtraction,
 * multiplication, and division. Each test checks the correctness of the mathematical 
 * operation performed on two numbers.
 */

const assert = require('assert');

describe('Mathematical Operations - Test Suite', () => {

  /**
   * Test case for the addition operation.
   * 
   * This test verifies that the addition of two numbers (num1 and num2) is computed correctly.
   */
  it('Addition of 2 numbers', () => {
    // Define two numbers
    const num1 = 10;
    const num2 = 20;

    // Perform addition
    const sum = num1 + num2;

    // Assert the sum is as expected
    assert.equal(sum, 30);
  });

  /**
   * Test case for the subtraction operation.
   * 
   * This test verifies that the absolute difference between two numbers (num1 and num2)
   * is computed correctly.
   */
  it('Subtraction of 2 numbers', () => {
    // Define two numbers
    const num1 = 10;
    const num2 = 20;

    // Perform subtraction and use absolute value
    const result = Math.abs(num1 - num2);

    // Assert the result is as expected
    assert.equal(result, 10);
  });

  /**
   * Test case for the multiplication operation.
   * 
   * This test verifies that the product of two numbers (num1 and num2) is computed correctly.
   */
  it('Multiplication of 2 numbers', () => {
    // Define two numbers
    const num1 = 10;
    const num2 = 20;

    // Perform multiplication
    const product = num1 * num2;

    // Assert the product is as expected
    assert.equal(product, 200);
  });

  /**
   * Test case for the division operation.
   * 
   * This test verifies that the quotient of two numbers (num2 divided by num1) is computed correctly.
   */
  it('Division of 2 numbers', () => {
    // Define two numbers
    const num1 = 10;
    const num2 = 20;

    // Perform division
    const quotient = num2 / num1;

    // Assert the quotient is as expected
    assert.equal(quotient, 2);
  });

  /**
   * Test case for negative results.
   * 
   * This test will try to verify th addition of 2 numbers with false/defective results. 
   */
  it('Negative Test (will Fail)', () => {
	// Define two numbers
	const num1 = 10;
    const num2 = 20;

	// Perform addition
    const sum = num1 + num2;

	// Assert the sum with a false result(10)
    assert.equal(sum, 10);
  });
});
