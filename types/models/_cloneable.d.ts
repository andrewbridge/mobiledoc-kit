import Section from './_section';
export declare type Cloneable<T> = T & {
    clone(): Cloneable<T>;
};
export declare function expectCloneable<T extends Section>(section: T): Cloneable<T>;
