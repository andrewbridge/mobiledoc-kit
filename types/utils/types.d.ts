export declare type Option<T> = T | null;
export declare type Maybe<T> = T | null | undefined;
export declare type Dict<T> = {
    [key: string]: T;
};
export declare type ValueOf<T> = T[keyof T];
export declare type JsonPrimitive = string | number | boolean | null;
export declare type JsonArray = JsonData[];
export declare type JsonObject = {
    [key: string]: JsonData;
};
export declare type JsonData = JsonPrimitive | JsonArray | JsonObject;
