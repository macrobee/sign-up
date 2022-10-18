const calculator = require('./calculator');

describe('add', () => {
	test('adds 0 and 0', () => {
		expect(calculator.add(0,0)).toBe(0);
	});
});

describe('subtract', () => {
	test('subtracts numbers', () => {
		expect(calculator.subtract(10,4)).toBe(6);
	});
});

describe('sum', () => {
	test('computes the sum of an empty array', () => {
		expect(calculator.sum([])).toBe(0);
	});

});
