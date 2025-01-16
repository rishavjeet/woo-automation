/**
 * Generates a random 4-digit test code.
 * This function produces a random integer between 1000 and 9999, inclusive.
 *
 * @returns {number} A random 4-digit integer.
 * 
 * Example usage:
 * const testCode = generateTestCode();
 * console.log(testCode); // Output: a random 4-digit number, e.g., 4532
 */

const generateTestCode = () => {

	// Generate a random number between 1000 and 9999
	return Math.floor(1000 + Math.random() * 9000);
}

// Export the function for use in other modules
module.exports = {
	generateTestCode
}