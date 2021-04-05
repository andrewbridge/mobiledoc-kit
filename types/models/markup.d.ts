import PostNodeBuilder from './post-node-builder';
export declare const VALID_MARKUP_TAGNAMES: string[];
export declare const VALID_ATTRIBUTES: string[];
/**
 * A Markup is similar with an inline HTML tag that might be added to
 * text to modify its meaning and/or display. Examples of types of markup
 * that could be added are bold ('b'), italic ('i'), strikethrough ('s'), and `a` tags (links).
 * @property {String} tagName
 */
export default class Markup {
    type: string;
    tagName: string;
    attributes: {
        [key: string]: string;
    };
    builder: PostNodeBuilder;
    constructor(tagName: string, attributes?: {});
    /**
     * Whether text in the forward direction of the cursor (i.e. to the right in ltr text)
     * should be considered to have this markup applied to it.
     * @private
     */
    isForwardInclusive(): boolean;
    isBackwardInclusive(): boolean;
    hasTag(tagName: string): boolean;
    /**
     * Returns the attribute value
     * @param {String} name, e.g. "href"
     */
    getAttribute(name: string): string;
    static isValidElement(element: Element): boolean;
}
