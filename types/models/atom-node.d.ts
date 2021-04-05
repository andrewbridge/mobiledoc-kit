import Atom from './atom';
import { JsonData, Dict, Maybe } from '../utils/types';
export declare type AtomOptions = Dict<unknown>;
export declare type TeardownCallback = () => void;
export interface AtomRenderOptions {
    options: AtomOptions;
    env: any;
    value: unknown;
    payload: JsonData;
}
export declare type AtomRenderHook = (options: AtomRenderOptions) => Maybe<Element | Text> | void;
export declare type AtomData = {
    name: string;
    type: 'dom';
    render: AtomRenderHook;
};
export default class AtomNode {
    editor: any;
    atom: AtomData;
    model: Atom;
    element: Element;
    atomOptions: AtomOptions;
    _teardownCallback: TeardownCallback | null;
    _rendered: Maybe<Node>;
    constructor(editor: any, atom: AtomData, model: Atom, element: Element, atomOptions: AtomOptions);
    render(): void;
    get env(): {
        name: string;
        onTeardown: (callback: TeardownCallback) => TeardownCallback;
        save: (value: string, payload?: {}) => void;
    };
    teardown(): void;
    _validateAndAppendRenderResult(rendered: Node): void;
}
