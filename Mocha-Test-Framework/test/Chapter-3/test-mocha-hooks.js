/**
 * Test Suite for demonstrating the different hooks related to mocha frameowrk.
 * 
 * 1. before()
 * 2. beforeEach()
 * 3. after()
 * 4. afterEach()
 * 
 */

describe('Test Suite to demostrate the mocha hooks', () => {
	/**
	 * before hook that runs before the execution of all the tests in a test block.
	 */
	before('This will run before all the tests in the test suite',() => {
		console.log('Before all the tests')
	});

	/**
	 * beforeEach hook that runs before the execution of every tests in a test block
	 */
	beforeEach('This will run before each the tests in the test suite', () => {
		console.log('Before Each tests')
	});

	/**
	 * after hook that will run after the execution of all the tests in a test block.
	 */
	after('This will run after all the tests in the test suite',() => {
		console.log('After all the tests')
	});

	/**
	 * afterEach hook that runs after the execution of every tests in a test block
	 */
	afterEach('This will run after each the tests in the test suite',() => {
		console.log('After Each tests')
	});

	/**
	 * This is the first test case in the test suite
	 */
	it('This is the first test case', function() {
		console.log('FIRST TEST CASE');
	});

	/**
	 * This is the second test case in the test suite
	 */
	it('This is the second test case', function() {
		console.log('SECOND TEST CASE');
	});
})