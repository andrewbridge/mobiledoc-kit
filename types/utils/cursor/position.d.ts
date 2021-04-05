import RenderTree from '../../models/render-tree';
import { Option } from '../types';
import Range from './range';
import Section from '../../models/_section';
import Markuperable from '../markuperable';
interface Editor {
    element: HTMLElement;
    _renderTree: RenderTree;
}
export default class Position {
    section: Section | null;
    offset: number;
    isBlank: boolean;
    /**
     * A position is a logical location (zero-width, or "collapsed") in a post,
     * typically between two characters in a section.
     * Two positions (a head and a tail) make up a {@link Range}.
     * @constructor
     */
    constructor(section: Section | null, offset?: number, isBlank?: boolean);
    /**
     * @param {integer} x x-position in current viewport
     * @param {integer} y y-position in current viewport
     * @param {Editor} editor
     * @return {Position|null}
     */
    static atPoint(x: number, y: number, editor: Editor): Option<Position>;
    static blankPosition(): Position;
    /**
     * Returns a range from this position to the given tail. If no explicit
     * tail is given this returns a collapsed range focused on this position.
     * @param {Position} [tail=this] The ending position
     * @return {Range}
     * @public
     */
    toRange(tail?: this, direction?: number | null): Range;
    get leafSectionIndex(): number;
    get isMarkerable(): boolean;
    /**
     * Returns the marker at this position, in the backward direction
     * (i.e., the marker to the left of the cursor if the cursor is on a marker boundary and text is left-to-right)
     * @return {Marker|undefined}
     */
    get marker(): Markuperable | null;
    /**
     * Returns the marker in `direction` from this position.
     * If the position is in the middle of a marker, the direction is irrelevant.
     * Otherwise, if the position is at a boundary between two markers, returns the
     * marker to the left if `direction` === BACKWARD and the marker to the right
     * if `direction` === FORWARD (assuming left-to-right text direction).
     * @param {Direction}
     * @return {Marker|undefined}
     */
    markerIn(direction: number): Markuperable;
    get offsetInMarker(): number;
    isEqual(position: Position): boolean;
    /**
     * @return {Boolean} If this position is at the head of the post
     */
    isHeadOfPost(): boolean;
    /**
     * @return {Boolean} If this position is at the tail of the post
     */
    isTailOfPost(): boolean;
    /**
     * @return {Boolean} If this position is at the head of its section
     */
    isHead(): boolean;
    /**
     * @return {Boolean} If this position is at the tail of its section
     */
    isTail(): boolean;
    /**
     * Move the position 1 unit in `direction`.
     *
     * @param {Number} units to move. > 0 moves right, < 0 moves left
     * @return {Position} Return a new position one unit in the given
     * direction. If the position is moving left and at the beginning of the post,
     * the same position will be returned. Same if the position is moving right and
     * at the end of the post.
     */
    move(units: number): Position;
    /**
     * @param {Number} direction (FORWARD or BACKWARD)
     * @return {Position} The result of moving 1 "word" unit in `direction`
     */
    moveWord(direction: number): Position;
    /**
     * The position to the left of this position.
     * If this position is the post's headPosition it returns itself.
     * @return {Position}
     * @private
     */
    moveLeft(): Position;
    /**
     * The position to the right of this position.
     * If this position is the post's tailPosition it returns itself.
     * @return {Position}
     * @private
     */
    moveRight(): Position;
    static fromNode(renderTree: RenderTree, node: Node, offset?: number): any;
    static fromTextNode(renderTree: RenderTree, textNode: Text, offsetInNode?: number): Position;
    static fromElementNode(renderTree: RenderTree, elementNode: Element, offset?: number): any;
    /**
     * @private
     */
    get markerPosition(): {
        marker: Markuperable;
        offset: number;
    };
}
export {};
