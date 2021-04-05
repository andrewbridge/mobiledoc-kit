import Markuperable from '../utils/markuperable';
import { Type } from './types';
import Markup from './markup';
import RenderNode from './render-node';
import PostNodeBuilder, { PostNode } from './post-node-builder';
export declare const HIGH_SURROGATE_RANGE: number[];
export declare const LOW_SURROGATE_RANGE: number[];
export default class Marker extends Markuperable {
    type: Type;
    isMarker: boolean;
    value: string;
    builder: PostNodeBuilder;
    markups: Markup[];
    renderNode: RenderNode | null;
    constructor(value?: string, markups?: Markup[]);
    clone(): Marker;
    get isEmpty(): boolean;
    get isBlank(): boolean;
    /**
     * A marker's text is equal to its value.
     * Compare with an Atom which distinguishes between text and value
     */
    get text(): string;
    get length(): number;
    deleteValueAtOffset(offset: number): number;
    canJoin(other: Marker): boolean;
    textUntil(offset: number): string;
    split(offset?: number, endOffset?: number): [Marker, Marker, Marker];
    /**
     * @return {Array} 2 markers either or both of which could be blank
     */
    splitAtOffset(offset: number): [Marker, Marker];
}
export declare function isMarker(postNode: PostNode): postNode is Marker;
