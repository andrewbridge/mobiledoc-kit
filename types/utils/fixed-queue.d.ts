export default class FixedQueue<T> {
    _maxLength: number;
    _items: T[];
    constructor(length?: number);
    get length(): number;
    pop(): T;
    push(item: T): void;
    clear(): void;
    toArray(): T[];
}
