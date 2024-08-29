/**
 * Test suit to demonstrate the test features in mocha.
 * 
 * 1. Exclusivity - It can be implememted by appending the `.only` to the test function.
 * 2. Inclusivity - It is just the opposite of exclusivity and can be implemented using the `.skip`.
 * 					Any skipped function will be marked as pending, pending doesn't mean test failure.
 * 3. Pending - Any function that does not have a callback, will be in the pending state. It will be added
 * 				to the test result but will be not be marked as failure.
 */

const assert = require('assert');

describe('Test Suite to describe the Test features in Mocha', () => {

  /**
   * Test case for the addition operation.
   * 
   * This test will run exclusively in this test suite (`.only` is added)
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
   * This test will also run exclusively in this test suite (`.only` is added)
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
   * This test will be skipped since (`.skip` is added).
   */
  it.skip('Multiplication of 2 numbers', () => {
    // Define two numbers
    const num1 = 10;
    const num2 = 20;

    // Perform multiplication
    const product = num1 * num2;

    // Assert the product is as expected
    assert.equal(product, 200);
  });

  /**
   * Test case with no callback
   */
  it('This test has no callback and will be skipped');
});
