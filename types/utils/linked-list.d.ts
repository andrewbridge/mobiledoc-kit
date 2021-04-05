import { Maybe } from './types';
interface LinkedListOptions<T> {
    adoptItem?: AdoptItemCallback<T>;
    freeItem?: FreeItemCallback<T>;
}
export interface LinkedListItem<T extends LinkedListItem<T>> {
    next: T | null;
    prev: T | null;
}
declare type ItemCallback<T, U = void> = (item: T) => U;
declare type AdoptItemCallback<T> = ItemCallback<T>;
declare type FreeItemCallback<T> = ItemCallback<T>;
export default class LinkedList<T extends LinkedListItem<T>> {
    head: T | null;
    tail: T | null;
    length: number;
    _adoptItem?: AdoptItemCallback<T>;
    _freeItem?: FreeItemCallback<T>;
    constructor(options: LinkedListOptions<T>);
    adoptItem(item: T): void;
    freeItem(item: T): void;
    get isEmpty(): boolean;
    prepend(item: T): void;
    append(item: T): void;
    insertAfter(item: T, prevItem: T): void;
    _ensureItemIsNotAlreadyInList(item: T): void;
    insertBefore(item: T, nextItem?: T | null): void;
    remove(item: T): void;
    forEach(callback: (item: T, idx: number) => void): void;
    map<U>(callback: (item: T) => U): U[];
    walk(startItem: Maybe<T>, endItem: Maybe<T>, callback: ItemCallback<T>): void;
    readRange(startItem?: Maybe<T>, endItem?: Maybe<T>): T[];
    toArray(): T[];
    detect(callback: ItemCallback<T, boolean>, item?: T, reverse?: boolean): T;
    any(callback: ItemCallback<T, boolean>): boolean;
    every(callback: ItemCallback<T, boolean>): boolean;
    objectAt(targetIndex: number): T;
    splice(targetItem: T, removalCount: number, newItems: T[]): void;
    removeBy(conditionFn: ItemCallback<T, boolean>): void;
    _ensureItemIsNotInList(item: T): void;
    _ensureItemIsInThisList(item: T): void;
}
export {};
