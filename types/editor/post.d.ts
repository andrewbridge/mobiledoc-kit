import Position from '../utils/cursor/position';
import Range from '../utils/cursor/range';
import { Direction } from '../utils/key';
import LifecycleCallbacks, { LifecycleCallback } from '../models/lifecycle-callbacks';
import { Option, Maybe } from '../utils/types';
import Editor, { TextUnit } from './editor';
import PostNodeBuilder, { PostNode } from '../models/post-node-builder';
import Markerable from '../models/_markerable';
import Section from '../models/_section';
import Markuperable from '../utils/markuperable';
import Post from '../models/post';
import ListSection from '../models/list-section';
import ListItem from '../models/list-item';
import Card from '../models/card';
import LinkedList from '../utils/linked-list';
import { Cloneable } from '../models/_cloneable';
import { Attributable } from '../models/_attributable';
import Markup from '../models/markup';
import { TagNameable } from '../models/_tag-nameable';
export declare const enum EditAction {
    INSERT_TEXT = 1,
    DELETE = 2
}
interface SectionTransformation {
    from: Section;
    to: Section;
}
/**
 * The PostEditor is used to modify a post. It should not be instantiated directly.
 * Instead, a new instance of a PostEditor is created by the editor and passed
 * as the argument to the callback in {@link Editor#run}.
 *
 * Usage:
 * ```
 * editor.run((postEditor) => {
 *   // postEditor is an instance of PostEditor that can operate on the
 *   // editor's post
 * });
 * ```
 */
export default class PostEditor {
    /**
     * @private
     */
    editor: Editor;
    builder: PostNodeBuilder;
    editActionTaken: Option<EditAction>;
    _callbacks: LifecycleCallbacks;
    _range: Range;
    _didComplete: boolean;
    _renderRange: () => void;
    _postDidChange: () => void;
    _rerender: () => void;
    _shouldCancelSnapshot: boolean;
    constructor(editor: Editor);
    addCallback(queueName: string, callback: LifecycleCallback): void;
    addCallbackOnce(queueName: string, callback: LifecycleCallback): void;
    runCallbacks(queueName: string): void;
    begin(): void;
    /**
     * Schedules to select the given range on the editor after the postEditor
     * has completed its work. This also updates the postEditor's active range
     * (so that multiple calls to range-changing methods on the postEditor will
     * update the correct range).
     *
     * Usage:
     *   let range = editor.range;
     *   editor.run(postEditor => {
     *     let nextPosition = postEditor.deleteRange(range);
     *
     *     // Will position the editor's cursor at `nextPosition` after
     *     // the postEditor finishes work and the editor rerenders.
     *     postEditor.setRange(nextPosition);
     *   });
     * @param {Range|Position} range
     * @public
     */
    setRange(range: Range | Position): void;
    /**
     * Delete a range from the post
     *
     * Usage:
     * ```
     *     let { range } = editor;
     *     editor.run((postEditor) => {
     *       let nextPosition = postEditor.deleteRange(range);
     *       postEditor.setRange(nextPosition);
     *     });
     * ```
     * @param {Range} range Cursor Range object with head and tail Positions
     * @return {Position} The position where the cursor would go after deletion
     * @public
     */
    deleteRange(range: Range): Position;
    /**
     * Note: This method may replace `section` with a different section.
     *
     * "Cut" out the part of the section inside `headOffset` and `tailOffset`.
     * If section is markerable this splits markers that straddle the head or tail (if necessary),
     * and removes markers that are wholly inside the offsets.
     * If section is a card, this may replace it with a blank markup section if the
     * positions contain the entire card.
     *
     * @param {Section} section
     * @param {Position} head
     * @param {Position} tail
     * @return {Position}
     * @private
     */
    cutSection(section: Section, head: Position, tail: Position): Position;
    _coalesceMarkers(section: Section): void;
    _removeBlankMarkers(section: Markerable): void;
    _joinSimilarMarkers(section: Markerable): void;
    removeMarker(marker: Markuperable): void;
    _scheduleForRemoval(postNode: Exclude<PostNode, Post>): void;
    _joinContiguousListSections(): void;
    _joinListSections(baseList: ListSection, nextList: ListSection): void;
    _markDirty(postNode: PostNode): void;
    /**
     * @param {Position} position object with {section, offset} the marker and offset to delete from
     * @param {Number} direction The direction to delete in (default is BACKWARD)
     * @return {Position} for positioning the cursor
     * @public
     * @deprecated after v0.10.3
     */
    deleteFrom(position: Position, direction?: Direction): Position;
    /**
     * Delete 1 `unit` (can be 'char' or 'word') in the given `direction` at the given
     * `position`. In almost all cases this will be equivalent to deleting the range formed
     * by expanding the position 1 unit in the given direction. The exception is when deleting
     * backward from the beginning of a list item, which reverts the list item into a markup section
     * instead of joining it with its previous list item (if any).
     *
     * Usage:
     *
     *     let position = section.tailPosition();
     *     // Section has text of "Howdy!"
     *     editor.run((postEditor) => {
     *       postEditor.deleteAtPosition(position);
     *     });
     *     // section has text of "Howdy"
     *
     * @param {Position} position The position to delete at
     * @param {Direction} [direction=DIRECTION.BACKWARD] direction The direction to delete in
     * @param {Object} [options]
     * @param {String} [options.unit="char"] The unit of deletion ("word" or "char")
     * @return {Position}
     */
    deleteAtPosition(position: Position, direction?: Direction, { unit }?: {
        unit: TextUnit;
    }): Position;
    _deleteAtPositionBackward(position: Position, unit: TextUnit): Position;
    _deleteAtPositionForward(position: Position, unit: TextUnit): Position;
    /**
     * Split markers at two positions, once at the head, and if necessary once
     * at the tail.
     *
     * Usage:
     * ```
     *     let range = editor.range;
     *     editor.run((postEditor) => {
     *       postEditor.splitMarkers(range);
     *     });
     * ```
     * The return value will be marker object completely inside the offsets
     * provided. Markers outside of the split may also have been modified.
     *
     * @param {Range} markerRange
     * @return {Array} of markers that are inside the split
     * @private
     */
    splitMarkers(range: Range): Markuperable[];
    splitSectionMarkerAtOffset(section: Section, offset: number): void;
    /**
     * Split the section at the position.
     *
     * Usage:
     * ```
     *     let position = editor.cursor.offsets.head;
     *     editor.run((postEditor) => {
     *       postEditor.splitSection(position);
     *     });
     *     // Will result in the creation of two new sections
     *     // replacing the old one at the cursor position
     * ```
     * The return value will be the two new sections. One or both of these
     * sections can be blank (contain only a blank marker), for example if the
     * headMarkerOffset is 0.
     *
     * @param {Position} position
     * @return {Array} new sections, one for the first half and one for the second (either one can be null)
     * @public
     */
    splitSection(position: Position): [Option<Section>, Option<Section>];
    /**
     * @param {Section} cardSection
     * @param {Position} position to split at
     * @return {Section[]} 2-item array of pre and post-split sections
     * @private
     */
    _splitCardSection(cardSection: Card, position: Position): [Section, Section];
    /**
     * @param {Section} section
     * @param {Section} newSection
     * @public
     */
    replaceSection(section: Section, newSection: Section): void;
    moveSectionBefore(collection: LinkedList<Cloneable<Section>>, renderedSection: Cloneable<Section>, beforeSection: Section): Cloneable<Section>;
    /**
     * @param {Section} section A section that is already in DOM
     * @public
     */
    moveSectionUp(renderedSection: Cloneable<Section>): Cloneable<Section>;
    /**
     * @param {Section} section A section that is already in DOM
     * @public
     */
    moveSectionDown(renderedSection: Cloneable<Section>): Cloneable<Section>;
    /**
     * Insert an array of markers at the given position. If the position is in
     * a non-markerable section (like a card section), this method throws an error.
     *
     * @param {Position} position
     * @param {Marker[]} markers
     * @return {Position} The position that represents the end of the inserted markers.
     * @public
     */
    insertMarkers(position: Position, markers: Markuperable[]): Position;
    /**
     * Inserts text with the given markups, ignoring the existing markups at
     * the position, if any.
     *
     * @param {Position} position
     * @param {String} text
     * @param {Markup[]} markups
     * @return {Position} position at the end of the inserted text
     */
    insertTextWithMarkup(position: Position, text: string, markups?: Markup[]): Maybe<Position>;
    /**
     * Insert the text at the given position
     * Inherits the markups already at that position, if any.
     *
     * @param {Position} position
     * @param {String} text
     * @return {Position} position at the end of the inserted text.
     */
    insertText(position: Position, text: string): Maybe<Position>;
    _replaceSection(section: Section, newSections: Section[]): void;
    /**
     * Given a markerRange (for example `editor.range`) mark all markers
     * inside it as a given markup. The markup must be provided as a post
     * abstract node.
     *
     * Usage:
     *
     *     let range = editor.range;
     *     let strongMarkup = editor.builder.createMarkup('strong');
     *     editor.run((postEditor) => {
     *       postEditor.addMarkupToRange(range, strongMarkup);
     *     });
     *     // Will result some markers possibly being split, and the markup
     *     // being applied to all markers between the split.
     *
     * @param {Range} range
     * @param {Markup} markup A markup post abstract node
     * @public
     */
    addMarkupToRange(range: Range, markup: Markup): void;
    /**
     * Given a markerRange (for example `editor.range`) remove the given
     * markup from all contained markers.
     *
     * Usage:
     * ```
     *     let { range } = editor;
     *     let markup = markerRange.headMarker.markups[0];
     *     editor.run(postEditor => {
     *       postEditor.removeMarkupFromRange(range, markup);
     *     });
     *     // Will result in some markers possibly being split, and the markup
     *     // being removed from all markers between the split.
     * ```
     * @param {Range} range Object with offsets
     * @param {Markup|Function} markupOrCallback A markup post abstract node or
     * a function that returns true when passed a markup that should be removed
     * @private
     */
    removeMarkupFromRange(range: Range, markupOrMarkupCallback: ((markup: Markup) => boolean) | Markup): void;
    /**
     * Toggle the given markup in the given range (or at the position given). If the range/position
     * has the markup, the markup will be removed. If nothing in the range/position
     * has the markup, the markup will be added to everything in the range/position.
     *
     * Usage:
     * ```
     * // Remove any 'strong' markup if it exists in the selection, otherwise
     * // make it all 'strong'
     * editor.run(postEditor => postEditor.toggleMarkup('strong'));
     *
     * // add/remove a link to 'bustle.com' to the selection
     * editor.run(postEditor => {
     *   const linkMarkup = postEditor.builder.createMarkup('a', {href: 'http://bustle.com'});
     *   postEditor.toggleMarkup(linkMarkup);
     * });
     * ```
     * @param {Markup|String} markupOrString Either a markup object created using
     * the builder (useful when adding a markup with attributes, like an 'a' markup),
     * or, if a string, the tag name of the markup (e.g. 'strong', 'em') to toggle.
     * @param {Range|Position} range in which to toggle. Defaults to current editor range.
     * @public
     */
    toggleMarkup(markupOrMarkupString: Markup | string, range?: Range | Position): void;
    /**
     * Toggles the tagName of the active section or sections in the given range/position.
     * If every section has the tag name, they will all be reset to default sections.
     * Otherwise, every section will be changed to the requested type
     *
     * @param {String} sectionTagName A valid markup section or
     *        list section tag name (e.g. 'blockquote', 'h2', 'ul')
     * @param {Range|Position} range The range over which to toggle.
     *        Defaults to the current editor range.
     * @public
     */
    toggleSection(sectionTagName: string, range?: Range | Position): void;
    _determineNextRangeAfterToggleSection(range: Range, sectionTransformations: SectionTransformation[]): Range;
    setAttribute(key: string, value: string, range?: Range): void;
    removeAttribute(key: string, range?: Range): void;
    _mutateAttribute(key: string, range: Range, cb: (section: Attributable, attribute: string) => boolean | void): void;
    _isSameSectionType(section: Section & TagNameable, sectionTagName: string): boolean;
    /**
     * @param {Markerable} section
     * @private
     */
    changeSectionTagName(section: Markerable & TagNameable, newTagName: string): Markerable | ListSection | import("../models/markup-section").default;
    /**
     * Splits the item at the position given.
     * If the position is at the start or end of the item, the pre- or post-item
     * will contain a single empty ("") marker.
     * @param {ListItem} item
     * @param {Position} position
     * @return {Array} the pre-item and post-item on either side of the split
     * @private
     */
    _splitListItem(item: ListItem, position: Position): [ListItem, ListItem];
    /**
     * Splits the list at the position given.
     * @return {Array} pre-split list and post-split list, either of which could
     * be blank (0-item list) if the position is at the start or end of the list.
     *
     * Note: Contiguous list sections will be joined in the before_complete queue
     * of the postEditor.
     *
     * @private
     */
    _splitListAtPosition(list: ListSection, position: Position): [ListSection, ListSection];
    /**
     * @return Array of [prev, mid, next] lists. `prev` and `next` can
     *         be blank, depending on the position of `item`. `mid` will always
     *         be a 1-item list containing `item`. `prev` and `next` will be
     *         removed in the before_complete queue if they are blank
     *         (and still attached).
     *
     * @private
     */
    _splitListAtItem(list: ListSection, item: ListItem): ListSection[];
    _changeSectionFromListItem(section: Section, newTagName: string): import("../models/markup-section").default;
    _changeSectionToListItem(section: ListSection | Markerable, newTagName: string): Markerable | ListSection;
    /**
     * Insert a given section before another one, updating the post abstract
     * and the rendered UI.
     *
     * Usage:
     * ```
     *     let markerRange = editor.range;
     *     let sectionWithCursor = markerRange.headMarker.section;
     *     let section = editor.builder.createCardSection('my-image');
     *     let collection = sectionWithCursor.parent.sections;
     *     editor.run((postEditor) => {
     *       postEditor.insertSectionBefore(collection, section, sectionWithCursor);
     *     });
     * ```
     * @param {LinkedList} collection The list of sections to insert into
     * @param {Object} section The new section
     * @param {Object} beforeSection Optional The section "before" is relative to,
     *        if falsy the new section will be appended to the collection
     * @public
     */
    insertSectionBefore(collection: LinkedList<Section> | LinkedList<Cloneable<Section>>, section: Section, beforeSection?: Option<Section>): void;
    /**
     * Insert the given section after the current active section, or, if no
     * section is active, at the end of the document.
     * @param {Section} section
     * @public
     */
    insertSection(section: Section): void;
    /**
     * Insert the given section at the end of the document.
     * @param {Section} section
     * @public
     */
    insertSectionAtEnd(section: Section): void;
    /**
     * Insert the `post` at the given position in the editor's post.
     * @param {Position} position
     * @param {Post} post
     * @private
     */
    insertPost(position: Position, newPost: Post): Position;
    /**
     * Remove a given section from the post abstract and the rendered UI.
     *
     * Usage:
     * ```
     *     let { range } = editor;
     *     let sectionWithCursor = range.head.section;
     *     editor.run((postEditor) => {
     *       postEditor.removeSection(sectionWithCursor);
     *     });
     * ```
     * @param {Object} section The section to remove
     * @public
     */
    removeSection(section: Section): void;
    removeAllSections(): void;
    migrateSectionsFromPost(post: Post): void;
    _scheduleListRemovalIfEmpty(listSection: ListSection): void;
    /**
     * A method for adding work the deferred queue
     *
     * @param {Function} callback to run during completion
     * @param {Boolean} [once=false] Whether to only schedule the callback once.
     * @public
     */
    schedule(callback: LifecycleCallback, once?: boolean): void;
    /**
     * A method for adding work the deferred queue. The callback will only
     * be added to the queue once, even if `scheduleOnce` is called multiple times.
     * The function cannot be an anonymous function.
     *
     * @param {Function} callback to run during completion
     * @public
     */
    scheduleOnce(callback: LifecycleCallback): void;
    /**
     * Add a rerender job to the queue
     *
     * @public
     */
    scheduleRerender(): void;
    /**
     * Schedule a notification that the post has been changed.
     * The notification will result in the editor firing its `postDidChange`
     * hook after the postEditor completes its work (at the end of {@link Editor#run}).
     *
     * @public
     */
    scheduleDidUpdate(): void;
    scheduleAfterRender(callback: LifecycleCallback, once?: boolean): void;
    /**
     * Flush any work on the queue. {@link Editor#run} calls this method; it
     * should not be called directly.
     *
     * @private
     */
    complete(): void;
    undoLastChange(): void;
    redoLastChange(): void;
    cancelSnapshot(): void;
}
export {};
