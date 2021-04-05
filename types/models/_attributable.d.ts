import Section from './_section';
import { Dict } from '../utils/types';
export declare const VALID_ATTRIBUTES: string[];
export interface Attributable {
    attributes: {
        [key: string]: string;
    };
    hasAttribute: (key: string) => boolean;
    setAttribute: (key: string, value: string) => void;
    removeAttribute: (key: string) => void;
    getAttribute: (key: string) => string;
    eachAttribute: (cb: (key: string, value: string) => void) => void;
}
declare type AbstractConstructor<T> = Function & {
    prototype: T;
};
declare type Constructor<T> = new (...args: any[]) => T;
export declare function attributable<T extends unknown>(Base: AbstractConstructor<T>): Constructor<T & Attributable>;
export declare function expectAttributable(section: Section): Section & Attributable;
export declare function getSectionAttributes(section: Section): Dict<string>;
export {};
