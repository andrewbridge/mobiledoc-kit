import RenderNode from '../models/render-node';
import ElementMap from '../utils/element-map';
import { PostNode } from './post-node-builder';
import Post from './post';
export default class RenderTree {
    _rootNode: RenderNode;
    _elements: ElementMap<RenderNode>;
    constructor(rootPostNode: Post);
    get rootNode(): RenderNode<Node>;
    /**
     * @return {Boolean}
     */
    get isDirty(): boolean;
    get rootElement(): Node;
    getElementRenderNode(element: Node): RenderNode<Node>;
    setElementRenderNode(element: Node, renderNode: RenderNode): void;
    removeElementRenderNode(element: Node): void;
    /**
     * @param {DOMNode} element
     * Walk up from the dom element until we find a renderNode element
     */
    findRenderNodeFromElement(element: Node, conditionFn?: (node: RenderNode) => boolean): RenderNode<Node>;
    buildRenderNode(postNode: PostNode): RenderNode<Node>;
}
