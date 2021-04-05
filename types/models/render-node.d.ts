import LinkedItem from '../utils/linked-item';
import LinkedList from '../utils/linked-list';
import RenderTree from './render-tree';
import { Option } from '../utils/types';
import CardNode from './card-node';
import AtomNode from './atom-node';
import { PostNode } from './post-node-builder';
export default class RenderNode<T extends Node = Node> extends LinkedItem {
    parent: Option<RenderNode>;
    isDirty: boolean;
    isRemoved: boolean;
    postNode: Option<PostNode>;
    renderTree: Option<RenderTree>;
    markupElement: Option<Node>;
    headTextNode: Option<Text>;
    tailTextNode: Option<Text>;
    atomNode: Option<AtomNode>;
    cardNode: Option<CardNode>;
    _childNodes: Option<LinkedList<RenderNode>>;
    _element: Option<T>;
    _cursorElement: Option<Node>;
    constructor(postNode: PostNode, renderTree: RenderTree);
    isAttached(): boolean;
    get childNodes(): LinkedList<RenderNode>;
    scheduleForRemoval(): void;
    markDirty(): void;
    get isRendered(): boolean;
    markClean(): void;
    get element(): T;
    set element(element: T);
    set cursorElement(cursorElement: Node | null);
    get cursorElement(): Node | null;
    destroy(): void;
    reparsesMutationOfChildNode(node: Node): boolean;
}
