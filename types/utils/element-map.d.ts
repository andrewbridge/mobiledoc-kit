export default class ElementMap<T> {
    _map: {
        [key: string]: T;
    };
    set(key: object, value: T): void;
    get(key: object): T;
    remove(key: object): void;
}
