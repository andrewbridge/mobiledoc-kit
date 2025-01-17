import { Option } from './types';
import Markup from '../models/markup';
import RenderNode from '../models/render-node';
import { Type } from '../models/types';
import Markerable from '../models/_markerable';
declare type MarkupCallback = (markup: Markup) => boolean;
declare type MarkupOrMarkupCallback = Markup | MarkupCallback;
export default abstract class Markuperable {
    markups: Markup[];
    prev: this | null;
    next: this | null;
    isAtom: boolean;
    isMarker: boolean;
    section: Option<Markerable>;
    parent: Option<Markerable>;
    renderNode: RenderNode | null;
    abstract text: string;
    abstract value: string;
    abstract type: Type;
    abstract length: number;
    abstract clone(): Markuperable;
    abstract isBlank: boolean;
    abstract canJoin(other: Markuperable): boolean;
    abstract textUntil(offset: number): string;
    abstract splitAtOffset(offset: number): [Markuperable, Markuperable];
    charAt(offset: number): string;
    clearMarkups(): void;
    addMarkup(markup: Markup): void;
    addMarkupAtIndex(markup: Markup, index: number): void;
    removeMarkup(markupOrMarkupCallback: MarkupOrMarkupCallback): void;
    _removeMarkup(markup: Markup): void;
    hasMarkup(tagNameOrMarkup: string | Markup): boolean;
    getMarkup(tagNameOrMarkup: string | Markup): Markup;
    get openedMarkups(): Markup[];
    get closedMarkups(): Markup[];
}
export {};
