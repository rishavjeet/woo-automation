/*
 Test Suite - Mathematical Operations

 Test Cases

 1. Addition
 2. Subtraction
 3. Multiplication
 4. Division
 */

const assert = require('assert');

describe('Mathematical Operations - Test Suite', ()=>{

	it('Addition of 2 numbers', ()=>{

		const num1 = 10;
		const num2 = 20;

		const sum = num1 + num2;

		assert.equal(sum,30);

	});

	it('Subtraction of 2 numbers', ()=>{

		const num1 = 10;
		const num2 = 20;

		const result = Math.abs(num1 - num2);

		assert.equal(result,10);



	});

	it('Multiplication of 2 numbers', ()=>{
		
		const num1 = 10;
		const num2 = 20;

		const product = num1 * num2;
		
		assert.equal(product,200);

	});

	it('Division of 2 numbers', ()=>{

		const num1 = 10;
		const num2 = 20;

		const quotient = num2 / num1;

		assert.equal(quotient,2);

	});
})
