import { Type } from './types';
import LinkedList from '../utils/linked-list';
import { Option } from '../utils/types';
import Position from '../utils/cursor/position';
import Range from '../utils/cursor/range';
import Markerable from './_markerable';
import Section from './_section';
import PostNodeBuilder from './post-node-builder';
import RenderNode from './render-node';
import HasChildSections from './_has-child-sections';
import { Cloneable } from './_cloneable';
import Markup from './markup';
declare type SectionCallback = (section: Section, index: number) => void;
/**
 * The Post is an in-memory representation of an editor's document.
 * An editor always has a single post. The post is organized into a list of
 * sections. Each section may be markerable (contains "markers", aka editable
 * text) or non-markerable (e.g., a card).
 * When persisting a post, it must first be serialized (loss-lessly) into
 * mobiledoc using {@link Editor#serialize}.
 */
export default class Post implements HasChildSections<Cloneable<Section>> {
    type: Type;
    builder: PostNodeBuilder;
    sections: LinkedList<Cloneable<Section>>;
    renderNode: RenderNode;
    constructor();
    /**
     * @return {Position} The position at the start of the post (will be a {@link BlankPosition}
     * if the post is blank)
     * @public
     */
    headPosition(): Position;
    /**
     * @return {Position} The position at the end of the post (will be a {@link BlankPosition}
     * if the post is blank)
     * @public
     */
    tailPosition(): Position;
    /**
     * @return {Range} A range encompassing the entire post
     * @public
     */
    toRange(): Range;
    get isBlank(): boolean;
    /**
     * If the post has no sections, or only has one, blank section, then it does
     * not have content and this method returns false. Otherwise it is true.
     * @return {Boolean}
     * @public
     */
    get hasContent(): boolean;
    /**
     * @param {Range} range
     * @return {Array} markers that are completely contained by the range
     */
    markersContainedByRange(range: Range): Array<any>;
    markupsInRange(range: Range): Markup[];
    walkAllLeafSections(callback: SectionCallback): void;
    walkLeafSections(range: Range, callback: SectionCallback): void;
    walkMarkerableSections(range: Range, callback: (section: Markerable) => void): void;
    _nextLeafSection(section: Section): Option<Section>;
    /**
     * @param {Range} range
     * @return {Post} A new post, constrained to {range}
     */
    trimTo(range: Range): Post;
}
export {};
