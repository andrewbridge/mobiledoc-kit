import { Dict } from './types';
export declare const NODE_TYPES: {
    ELEMENT: number;
    TEXT: number;
    COMMENT: number;
};
export declare function isTextNode(node: Node): node is Text;
export declare function isCommentNode(node: Node): node is Comment;
export declare function isElementNode(node: Node): node is Element;
export declare function walkDOM(topNode: Node, callbackFn?: (node: Node) => void, conditionFn?: (node: Node) => boolean): void;
export declare function walkTextNodes(topNode: Node, callbackFn?: () => void): void;
export declare function clearChildNodes(element: Element): void;
/**
 * @return {Boolean} true when the child node is contained or the same as
 * (e.g., inclusive containment)  the parent node
 *  see https://github.com/webmodules/node-contains/blob/master/index.js
 *  Mimics the behavior of `Node.contains`, which is broken in IE 10
 *  @private
 */
export declare function containsNode(parentNode: Node, childNode: Node): boolean;
/**
 * converts the element's NamedNodeMap of attrs into
 * an object with key-value pairs
 * @param {DOMNode} element
 * @return {Object} key-value pairs
 * @private
 */
export declare function getAttributes(element: Element): Dict<string>;
export declare function addClassName(element: Element, className: string): void;
export declare function removeClassName(element: Element, className: string): void;
export declare function normalizeTagName(tagName: string): string;
export declare function parseHTML(html: string): HTMLDivElement;
export declare function serializeHTML(node: Node): string;
