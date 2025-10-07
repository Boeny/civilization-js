import { IMap } from '../types';

import { adaptMapBorders } from './utils';

describe('adaptMapBorders', () => {
    it.each([
        [1, 1, 7, 8],
        [1, 2, 7, 8],
        [1, 4, 7, 8],
        [1, 8, 7, 8],
        [1, 10, 7, 10],
        [3, 1, 7, 8],
        [3, 2, 7, 8],
        [3, 4, 7, 8],
        [3, 8, 7, 8],
        [3, 10, 7, 10],
        [4, 1, 7, 8],
        [4, 2, 7, 8],
        [4, 4, 7, 8],
        [4, 8, 7, 8],
        [4, 10, 7, 10],
        [7, 1, 7, 8],
        [7, 2, 7, 8],
        [7, 4, 7, 8],
        [7, 8, 7, 8],
        [8, 10, 8, 10],
        [8, 1, 8, 8],
        [8, 2, 8, 8],
        [8, 4, 8, 8],
        [8, 8, 8, 8],
        [8, 10, 8, 10],
    ])('returns max width and height including newMap: {width: %s, height %s}', (width, height, resultWidth, resultHeight) => {
        const newMap: IMap = { width, height };
        const others: IMap[] = [
            { width: 3, height: 8 },
            { width: 7, height: 2 },
        ];

        const result = adaptMapBorders(newMap, others);
        expect(result).toEqual({ x: resultWidth, y: resultHeight });
    });

    it('returns newMap values if otherData is empty', () => {
        const newMap = { width: 5, height: 9 };
        const result = adaptMapBorders(newMap, []);
        expect(result).toEqual({ x: 5, y: 9 });
    });

    it('returns correct max when all have same width and height', () => {
        const newMap = { width: 5, height: 5 };
        const others = [
            { width: 5, height: 5 },
            { width: 5, height: 5 },
        ];
        const result = adaptMapBorders(newMap, others);
        expect(result).toEqual({ x: 5, y: 5 });
    });

    it('handles large numbers correctly', () => {
        const newMap = { width: 1_000_000, height: 2_000_000 };
        const others = [
            { width: 999_999, height: 1_000_000 },
            { width: 500_000, height: 1_999_999 },
        ];
        const result = adaptMapBorders(newMap, others);
        expect(result).toEqual({ x: 1_000_000, y: 2_000_000 });
    });

    it('returns zeroes when all inputs have zero width/height', () => {
        const newMap = { width: 0, height: 0 };
        const others = [{ width: 0, height: 0 }];
        const result = adaptMapBorders(newMap, others);
        expect(result).toEqual({ x: 0, y: 0 });
    });

    it('works when all data have only one coordinate greater', () => {
        const newMap = { width: 8, height: 1 };
        const others = [
            { width: 1, height: 9 },
            { width: 5, height: 3 },
        ];
        const result = adaptMapBorders(newMap, others);
        expect(result).toEqual({ x: 8, y: 9 });
    });
});
