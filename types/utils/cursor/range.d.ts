import Position from './position';
import { Direction } from '../key';
import Markerable from '../../models/_markerable';
import Section from '../../models/_section';
import Markuperable from '../markuperable';
import { Option } from '../types';
/**
 * A logical range of a {@link Post}.
 * Usually an instance of Range will be read from the {@link Editor#range} property,
 * but it may be useful to instantiate a range directly when programmatically modifying a Post.
 */
export default class Range {
    head: Position;
    tail: Position;
    direction: Option<Direction>;
    /**
     * @param {Position} head
     * @param {Position} [tail=head]
     * @param {Direction} [direction=null]
     * @private
     */
    constructor(head: Position, tail?: Position, direction?: Option<Direction>);
    /**
     * Shorthand to create a new range from a section(s) and offset(s).
     * When given only a head section and offset, creates a collapsed range.
     * @param {Section} headSection
     * @param {number} headOffset
     * @param {Section} [tailSection=headSection]
     * @param {number} [tailOffset=headOffset]
     * @param {Direction} [direction=null]
     * @return {Range}
     */
    static create(headSection: Markerable, headOffset: number, tailSection?: Markerable, tailOffset?: number, direction?: Option<Direction>): Range;
    static blankRange(): Range;
    /**
     * @param {Markerable} section
     * @return {Range} A range that is constrained to only the part that
     * includes the section.
     * FIXME -- if the section isn't the head or tail, it's assumed to be
     * wholly contained. It's possible to call `trimTo` with a selection that is
     * outside of the range, though, which would invalidate that assumption.
     * There's no efficient way to determine if a section is within a range, yet.
     * @private
     */
    trimTo(section: Markerable): Range;
    /**
     * Expands the range 1 unit in the given direction
     * If the range is expandable in the given direction, always returns a
     * non-collapsed range.
     * @param {Number} units If units is > 0, the range is extended to the right,
     *                 otherwise range is extended to the left.
     * @return {Range}
     * @public
     */
    extend(units: number): Range;
    /**
     * Moves this range 1 unit in the given direction.
     * If the range is collapsed, returns a collapsed range shifted by 1 unit,
     * otherwise collapses this range to the position at the `direction` end of the range.
     * Always returns a collapsed range.
     * @param {Direction} direction
     * @return {Range}
     * @public
     */
    move(direction: Direction): Range;
    /**
     * expand a range to all markers matching a given check
     *
     * @param {Function} detectMarker
     * @return {Range} The expanded range
     *
     * @public
     */
    expandByMarker(detectMarker: (marker: Markuperable) => boolean): Range;
    _collapse(direction: Direction): Range;
    get focusedPosition(): Position;
    isEqual(other: Range): boolean;
    get isBlank(): boolean;
    get headSection(): Section;
    get tailSection(): Section;
    get headSectionOffset(): number;
    get tailSectionOffset(): number;
    get isCollapsed(): boolean;
    get headMarker(): Markuperable;
    get tailMarker(): Markuperable;
    get headMarkerOffset(): number;
    get tailMarkerOffset(): number;
}
