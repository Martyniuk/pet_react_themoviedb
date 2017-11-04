// Core
import { getUniqueID } from './';
import { getRandomColor } from './';

const getUniqueIDCorrectInput = 10;
const hashCodeNumber = 35;
const length = 7;


describe('helpers:', () => {
    test('getUniqueID should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });
    test('getUniqueID argument is a number', () => {
        expect(typeof getUniqueIDCorrectInput).toBe('number');
    });
    test('getUniqueID should return string', () => {
        const resultOfGetUniqueID = getUniqueID(getUniqueIDCorrectInput);

        expect(typeof resultOfGetUniqueID).toBe('string');
    });
    test('getUniqueID should return string length same as input number', () => {
        const input = 10;

        const resultOfGetUniqueIDLength = getUniqueID(input);

        expect(resultOfGetUniqueIDLength.length).toBe(input);
    });
    test('getRandomColor should be a function', () => {
        expect(typeof getRandomColor).toBe('function');
    });
    test('getRandomColor output should be a string', () => {
        const result = getRandomColor();

        expect(typeof result).toBe('string');
    });
    test('getRandomColor output should start with #', () => {
        const hashCode = getRandomColor()[0];

        expect(hashCode).toBe(String.fromCodePoint(hashCodeNumber));
    });
    test(`getRandomColor output should be with length of ${length}`, () => {
        expect(getRandomColor().length).toBe(length);
    });
});
