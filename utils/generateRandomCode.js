/**
 * Generates a random 4-digit number.
 * 
 * @returns {number} A random integer between 1000 and 9999 inclusive.
 * 
 * @example
 * const code = generateTestCode(); // Example output: 4521
 */

const generateTestCode = () => {

	// Math.random() generates a random decimal between 0 (inclusive) and 1 (exclusive).
    // Multiplying by 9000 scales this to a range between 0 and 8999.
    // Adding 1000 shifts the range to 1000 to 9999.
    // Math.floor() ensures the result is an integer.
	const num = Math.floor(1000 + Math.random() * 9000);
	return num;
}

// Export the function for use in other modules
module.exports = {
	generateTestCode
}