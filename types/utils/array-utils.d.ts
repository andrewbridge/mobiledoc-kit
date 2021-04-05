import { Dict } from './types';
interface Detectable<T> {
    detect(cb: (val: T) => boolean): T;
}
export interface HasLength<T> {
    length: number;
}
export interface Indexable<T> {
    [key: number]: T;
    length: number;
}
export declare function detect<T>(enumerable: Detectable<T> | Indexable<T>, callback: (val: T) => boolean): T | undefined;
interface Anyable<T> {
    any(cb: (val: T) => boolean): boolean;
}
export declare function any<T>(enumerable: Anyable<T> | Indexable<T>, callback: (val: T) => boolean): boolean;
interface Everyable<T> {
    every(cb: (val: T) => boolean): boolean;
}
export declare function every<T>(enumerable: Everyable<T> | Indexable<T>, callback: (val: T) => boolean): boolean;
export declare function toArray<T>(arrayLike: ArrayLike<T>): T[];
export interface ForEachable<T> {
    forEach(cb: (val: T, idx: number) => void): void;
}
/**
 * Useful for array-like things that aren't
 * actually arrays, like NodeList
 * @private
 */
export declare function forEach<T>(enumerable: ForEachable<T> | Indexable<T>, callback: (val: T, idx: number) => void): void;
export declare function filter<T>(enumerable: ForEachable<T>, conditionFn: (val: T) => boolean): T[];
/**
 * @return {Integer} the number of items that are the same, starting from the 0th index, in a and b
 * @private
 */
export declare function commonItemLength(listA: ArrayLike<unknown>, listB: ArrayLike<unknown>): number;
/**
 * @return {Array} the items that are the same, starting from the 0th index, in a and b
 * @private
 */
export declare function commonItems<T>(listA: T[], listB: T[]): T[];
export declare function compact<T>(enumerable: ForEachable<T>): T[];
export declare function reduce<T, U>(enumerable: ForEachable<T>, callback: (prev: U, val: T, index: number) => U, initialValue: U): U;
/**
 * @param {Array} array of key1,value1,key2,value2,...
 * @return {Object} {key1:value1, key2:value2, ...}
 * @private
 */
export declare function kvArrayToObject<T>(array: (T | string)[]): {
    [key: string]: T;
};
export declare function objectToSortedKVArray<T extends {}>(obj: T): (keyof T | T[keyof T])[];
export declare function isArrayEqual<T>(arr1: ArrayLike<T>, arr2: ArrayLike<T>): boolean;
export declare function filterObject<T>(object: Dict<T>, validKeys?: string[]): Dict<T>;
export declare function contains<T>(array: T[], item: T): boolean;
export declare function values<T extends {}>(object: T): T[keyof T][];
export {};
