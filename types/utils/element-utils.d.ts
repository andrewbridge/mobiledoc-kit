export declare function getEventTargetMatchingTag(tagName: string, target: HTMLElement | null, container: HTMLElement): HTMLElement;
export declare function getElementRelativeOffset(element: HTMLElement): {
    left: number;
    top: number;
};
declare type StringPropertyNames<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];
export declare function getElementComputedStyleNumericProp(element: HTMLElement, prop: StringPropertyNames<CSSStyleDeclaration>): number;
export declare function positionElementToRect(element: HTMLElement, rect: ClientRect, topOffset: number, leftOffset: number): {
    left: any;
    top: any;
};
export declare function positionElementHorizontallyCenteredToRect(element: HTMLElement, rect: ClientRect, topOffset: number): {
    left: any;
    top: any;
};
export declare function positionElementCenteredBelow(element: HTMLElement, belowElement: HTMLElement): {
    left: any;
    top: any;
};
export declare function setData(element: HTMLElement, name: string, value: string): void;
export interface Cancelable {
    cancel(): void;
}
export declare function whenElementIsNotInDOM(element: HTMLElement, callback: () => void): Cancelable;
export {};
