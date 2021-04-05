import View from './view';
import { Cancelable } from '../utils/element-utils';
declare type Editor = any;
interface TooltipOptions {
    rootElement: HTMLElement;
    editor: Editor;
    showForTag: string;
}
interface AddListenerOptions {
    showForTag: string;
}
export default class Tooltip extends View {
    rootElement: HTMLElement;
    editor: any;
    elementObserver: Cancelable | null;
    constructor(options: TooltipOptions);
    showLink(linkEl: HTMLAnchorElement): void;
    addListeners(options: AddListenerOptions): void;
}
declare type EditLinkCallback = () => void;
export interface TooltipPlugin {
    renderLink(tooltipEl: Element, linkEl: HTMLLinkElement, options: {
        editLink: EditLinkCallback;
    }): void;
}
export declare const DEFAULT_TOOLTIP_PLUGIN: TooltipPlugin;
export {};
