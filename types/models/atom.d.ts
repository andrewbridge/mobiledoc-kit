import { Type } from './types';
import Markuperable from '../utils/markuperable';
import Markup from './markup';
import PostNodeBuilder, { PostNode } from './post-node-builder';
export declare type AtomPayload = {};
export default class Atom extends Markuperable {
    type: Type;
    isAtom: boolean;
    name: string;
    value: string;
    text: string;
    payload: {};
    markups: Markup[];
    builder: PostNodeBuilder;
    constructor(name: string, value: string, payload: AtomPayload, markups?: Markup[]);
    clone(): Atom;
    get isBlank(): boolean;
    get length(): number;
    canJoin(): boolean;
    textUntil(): string;
    split(offset?: number, endOffset?: number): Markuperable[];
    splitAtOffset(offset: number): [Markuperable, Markuperable];
}
export declare function isAtom(postNode: PostNode): postNode is Atom;
