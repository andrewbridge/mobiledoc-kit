import Card, { CardMode } from './card';
import { Dict, Maybe } from '../utils/types';
export declare type CardNodeOptions = Dict<unknown>;
export declare type CardRenderHook = (...args: any[]) => void | Maybe<Element>;
declare type DidRenderCallback = null | (() => void);
declare type TeardownCallback = null | (() => void);
declare type CardDataType = 'dom';
export interface CardData {
    name: string;
    type?: CardDataType;
    render: CardRenderHook;
    edit?: CardRenderHook;
}
export default class CardNode {
    editor: any;
    card: CardData;
    section: Card;
    element: Element;
    options?: CardNodeOptions;
    mode: CardMode;
    _rendered: Element | null;
    _teardownCallback: TeardownCallback;
    _didRenderCallback: DidRenderCallback;
    constructor(editor: any, card: CardData, section: Card, element: Element, options?: CardNodeOptions);
    render(mode: CardMode): void;
    teardown(): void;
    didRender(): void;
    get env(): {
        name: string;
        isInEditor: boolean;
        onTeardown: (callback: TeardownCallback) => () => void;
        didRender: (callback: DidRenderCallback) => () => void;
        edit: () => void;
        save: (payload: {}, transition?: boolean) => void;
        cancel: () => void;
        remove: () => void;
        postModel: Card<import("./card").CardPayload>;
    };
    display(): void;
    edit(): void;
    remove(): void;
    _validateAndAppendRenderResult(rendered: Maybe<Element>): void;
}
export {};
