import { IPoint } from 'types';
import { getNumbersBetween, getPointsFromLine, getVector, getZeroVector, vectorLength, vectorSub } from 'utils';

describe('getNumbersBetween', () => {
    it('returns an empty array if the range is smaller than the step', () => {
        expect(getNumbersBetween(0, 1, 5)).toEqual([]);
        expect(getNumbersBetween(0, 4, 5)).toEqual([]);
    });

    it('returns correct intermediate values, excluding start and end', () => {
        expect(getNumbersBetween(0, 10, 2)).toEqual([2, 4, 6, 8]);
        expect(getNumbersBetween(0, 10, 3)).toEqual([3, 6, 9]);
    });

    it('excludes both start and end values', () => {
        const result = getNumbersBetween(0, 10, 3);
        expect(result).not.toContain(0);
        expect(result).not.toContain(10);
    });

    it('works with negative values', () => {
        expect(getNumbersBetween(-10, 0, 3)).toEqual([-7, -4, -1]);
        expect(getNumbersBetween(-5, 5, 2)).toEqual([-3, -1, 1, 3]);
    });

    it('works with fractional (non-integer) steps', () => {
        expect(getNumbersBetween(0, 1, 0.3)).toEqual([0.3, 0.6, 0.9]);
    });

    it('throws an error if step <= 0', () => {
        expect(() => getNumbersBetween(0, 10, 0)).toThrow('step must be > 0');
        expect(() => getNumbersBetween(0, 10, -2)).toThrow('step must be > 0');
    });

    it('throws an error if start >= end', () => {
        expect(() => getNumbersBetween(5, 5, 1)).toThrow('start must be < end');
        expect(() => getNumbersBetween(10, 5, 1)).toThrow('start must be < end');
    });

    it('returns an empty array if only one step fits before reaching the end', () => {
        expect(getNumbersBetween(0, 2, 2)).toEqual([]);
        expect(getNumbersBetween(0, 2, 1.5)).toEqual([1.5]);
    });
});

function stepsCount(v: IPoint, step: number) {
    return Math.ceil(vectorLength(v) / step) - 1;
}

const START = getVector(1, 1);
const LINEAR = [getVector(1, 10), getVector(1, -10), getVector(10, 1), getVector(-10, 1)];
const DIAGONALS = [getVector(10, 10), getVector(-10, 10), getVector(-10, -10), getVector(10, -10)];
const STEP = 1.5;

const POINTS: [IPoint, IPoint, number][] = [
    [START, LINEAR[0], stepsCount(vectorSub(LINEAR[0], START), STEP)], // up
    [START, LINEAR[1], stepsCount(vectorSub(LINEAR[1], START), STEP)], // down
    [START, LINEAR[2], stepsCount(vectorSub(LINEAR[2], START), STEP)], // right
    [START, LINEAR[3], stepsCount(vectorSub(LINEAR[3], START), STEP)], // left

    [START, DIAGONALS[0], stepsCount(vectorSub(DIAGONALS[0], START), STEP)], // top-right
    [START, DIAGONALS[1], stepsCount(vectorSub(DIAGONALS[1], START), STEP)], // top-left
    [START, DIAGONALS[2], stepsCount(vectorSub(DIAGONALS[2], START), STEP)], // down-left
    [START, DIAGONALS[3], stepsCount(vectorSub(DIAGONALS[3], START), STEP)], // down-right
];

describe('getPointsFromLine', () => {
    it('does not add start and end if line is shorter hexRadius', () => {
        const result = getPointsFromLine(getZeroVector(), getVector(1, 1), STEP);

        expect(result).toEqual([]);
    });

    it.each<[IPoint, IPoint, number]>(POINTS)('adds intermediate points', (start, end, count) => {
        const result = getPointsFromLine(start, end, STEP);

        expect(result.length).toEqual(count);
    });
});
