export default class Set<T> {
    items: T[];
    constructor(items?: any[]);
    add(item: T): void;
    get length(): number;
    has(item: T): boolean;
    toArray(): T[];
}
