export default function assert(message: string, conditional: unknown): asserts conditional;
export declare function assertExistsIn<T>(message: string, key: string, object: T): asserts key is string & keyof T;
export declare function assertNotNull<T>(message: string, value: T | null): asserts value is T;
export declare function assertType<T>(message: string, _value: any, conditional: boolean): asserts _value is T;
export declare function expect<T>(value: T | null | undefined, message: string): T;
export declare function unwrap<T>(value: T | null | undefined): T;
