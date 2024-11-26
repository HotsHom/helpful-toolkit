import {ConfigService} from "../index";

describe('ConfigService', () => {
	beforeAll(() => {
		process.env.TEST_STRING = 'value';
		process.env.TEST_NUMBER = '123';
		process.env.TEST_BOOLEAN = 'true';
		process.env.TEST_ARRAY = 'a,b,c';
		process.env.TEST_DATE = '2024-01-01T00:00:00.000Z';
		process.env.TEST_JSON = '{"key":"value"}';
		ConfigService.initialize();
	});

	it('should return a string', () => {
		expect(ConfigService.getString('TEST_STRING')).toBe('value');
	});

	it('should return a number', () => {
		expect(ConfigService.getNumber('TEST_NUMBER')).toBe(123);
	});

	it('should return a boolean', () => {
		expect(ConfigService.getBoolean('TEST_BOOLEAN')).toBe(true);
	});

	it('should return an array', () => {
		expect(ConfigService.getArray('TEST_ARRAY')).toEqual(['a', 'b', 'c']);
	});

	it('should throw an error if variable is missing', () => {
		expect(() => ConfigService.getString('MISSING')).toThrowError();
	});

	it('should return a valid date', () => {
		const date = ConfigService.getDate('TEST_DATE');
		expect(date).toEqual(new Date('2024-01-01T00:00:00.000Z'));
	});

	it('should return a valid JSON object', () => {
		const json = ConfigService.getJSON('TEST_JSON');
		expect(json).toEqual({ key: 'value' });
	});

	it('should check existence of a variable', () => {
		expect(ConfigService.has('TEST_DATE')).toBe(true);
		expect(ConfigService.has('MISSING_VAR')).toBe(false);
	});
});
