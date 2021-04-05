import { CardData, CardRenderHook } from '../models/card-node';
import { ForEachable } from '../utils/array-utils';
import { AtomData, AtomRenderHook } from '../models/atom-node';
import { Type } from '../models/types';
import MarkupSection from '../models/markup-section';
import Marker from '../models/marker';
import ListSection from '../models/list-section';
import RenderNode from '../models/render-node';
import { Option, Dict } from '../utils/types';
import Atom from '../models/atom';
import Editor from '../editor/editor';
import Post from '../models/post';
import ListItem from '../models/list-item';
import Image from '../models/image';
import Card from '../models/card';
import RenderTree from '../models/render-tree';
import { PostNode } from '../models/post-node-builder';
export declare const CARD_ELEMENT_CLASS_NAME = "__mobiledoc-card";
export declare const NO_BREAK_SPACE = "\u00A0";
export declare const TAB_CHARACTER = "\u2003";
export declare const SPACE = " ";
export declare const ZWNJ = "\u200C";
export declare const ATOM_CLASS_NAME = "-mobiledoc-kit__atom";
export declare const EDITOR_HAS_NO_CONTENT_CLASS_NAME = "__has-no-content";
export declare const EDITOR_ELEMENT_CLASS_NAME = "__mobiledoc-editor";
declare type VisitArgs = [RenderNode, ForEachable<PostNode>, boolean?];
declare type VisitFn = (...args: VisitArgs) => void;
declare class Visitor {
    editor: Editor;
    cards: CardData[];
    atoms: AtomData[];
    unknownCardHandler: CardRenderHook;
    unknownAtomHandler: AtomRenderHook;
    options: Dict<unknown>;
    constructor(editor: Editor, cards: CardData[], atoms: AtomData[], unknownCardHandler: CardRenderHook, unknownAtomHandler: AtomRenderHook, options: Dict<unknown>);
    _findCard(cardName: string): CardData;
    _createUnknownCard(cardName: string): CardData;
    _findAtom(atomName: string): AtomData;
    _createUnknownAtom(atomName: string): AtomData;
    [Type.POST](renderNode: RenderNode, post: Post, visit: VisitFn): void;
    [Type.MARKUP_SECTION](renderNode: RenderNode, section: MarkupSection, visit: VisitFn): void;
    [Type.LIST_SECTION](renderNode: RenderNode, section: ListSection, visit: VisitFn): void;
    [Type.LIST_ITEM](renderNode: RenderNode, item: ListItem, visit: VisitFn): void;
    [Type.MARKER](renderNode: RenderNode, marker: Marker): void;
    [Type.IMAGE_SECTION](renderNode: RenderNode<HTMLImageElement>, section: Image): void;
    [Type.CARD](renderNode: RenderNode, section: Card): void;
    [Type.ATOM](renderNode: RenderNode, atomModel: Atom): void;
}
export default class Renderer {
    editor: Editor;
    visitor: Visitor;
    nodes: RenderNode[];
    hasRendered: boolean;
    renderTree: Option<RenderTree>;
    constructor(editor: Editor, cards: CardData[], atoms: AtomData[], unknownCardHandler: CardRenderHook, unknownAtomHandler: AtomRenderHook, options: {});
    destroy(): void;
    visit(renderTree: RenderTree, parentNode: RenderNode, postNodes: ForEachable<PostNode>, visitAll?: boolean): void;
    render(renderTree: RenderTree): void;
}
export {};
