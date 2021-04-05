interface ViewOptions {
    tagName: string;
    container: HTMLElement;
    classNames: string[];
}
declare type EventType = keyof HTMLElementEventMap;
declare class View {
    element: HTMLElement;
    container: HTMLElement;
    isShowing: boolean;
    isDestroyed: boolean;
    _eventListeners: [HTMLElement, EventType, EventListener][];
    constructor(options?: Partial<ViewOptions>);
    addEventListener(element: HTMLElement, type: EventType, listener: EventListener): void;
    removeAllEventListeners(): void;
    show(): boolean;
    hide(): boolean;
    destroy(): void;
}
export default View;
