import LinkedItem from '../utils/linked-item';
import { Option, Dict } from '../utils/types';
import Position from '../utils/cursor/position';
import Range from '../utils/cursor/range';
import RenderNode from './render-node';
import Post from './post';
import PostNodeBuilder from './post-node-builder';
import { Type } from './types';
import Markuperable from '../utils/markuperable';
import HasChildSections from './_has-child-sections';
export interface WithParent<T> {
    parent: Option<T>;
}
declare type ParentSection = Post | (Section & HasChildSections<any>);
export default class Section extends LinkedItem {
    type: Type;
    isSection: boolean;
    isMarkerable: boolean;
    isNested: boolean;
    isListItem: boolean;
    isListSection: boolean;
    isLeafSection: boolean;
    isCardSection: boolean;
    attributes?: Dict<string>;
    post?: Option<Post>;
    renderNode: RenderNode;
    _parent: Option<ParentSection>;
    builder: PostNodeBuilder;
    get parent(): ParentSection;
    constructor(type: Type);
    get isBlank(): boolean;
    get length(): number;
    /**
     * @return {Position} The position at the start of this section
     * @public
     */
    headPosition(): Position;
    /**
     * @return {Position} The position at the end of this section
     * @public
     */
    tailPosition(): Position;
    /**
     * @param {Number} offset
     * @return {Position} The position in this section at the given offset
     * @public
     */
    toPosition(offset: number): Position;
    /**
     * @return {Range} A range from this section's head to tail positions
     * @public
     */
    toRange(): Range;
    /**
     * Markerable sections should override this method
     */
    splitMarkerAtOffset(_offset: number): {
        added: Markuperable[];
        removed: Markuperable[];
    };
    nextLeafSection(): Section | null;
    immediatelyNextMarkerableSection(): Section;
    previousLeafSection(): Section | null;
}
export interface NestedSection {
    parent: Section;
}
export declare function isNested<T extends Section>(section: T): section is T & NestedSection;
export {};
