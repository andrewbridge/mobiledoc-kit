export declare function entries<T extends {
    [key: string]: unknown;
}, K extends Extract<keyof T, string>>(obj: T): [K, T[K]][];
export declare function keys<T extends {
    [key: string]: unknown;
}>(obj: T): (keyof T)[];
