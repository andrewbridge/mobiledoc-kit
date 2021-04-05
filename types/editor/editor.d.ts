import { TooltipPlugin } from '../views/tooltip';
import PostEditor from './post';
import { Direction } from '../utils/key';
import DOMParser from '../parsers/dom';
import Renderer from '../renderers/editor-dom';
import RenderTree from '../models/render-tree';
import { MobiledocVersion } from '../renderers/mobiledoc';
import Cursor from '../utils/cursor';
import Range from '../utils/cursor/range';
import Position from '../utils/cursor/position';
import PostNodeBuilder from '../models/post-node-builder';
import { KeyCommand, CompiledKeyCommand } from './key-commands';
import Card, { CardMode, CardPayload } from '../models/card';
import MutationHandler from '../editor/mutation-handler';
import EditHistory from '../editor/edit-history';
import EventManager, { DOMEventType, DOMEventForType } from '../editor/event-manager';
import EditState from '../editor/edit-state';
import LifecycleCallbacks, { LifecycleCallback } from '../models/lifecycle-callbacks';
import LogManager from '../utils/log-manager';
import Post from '../models/post';
import { Mobiledoc } from '../renderers/mobiledoc';
import { SectionParserPlugin } from '../parsers/section';
import { CardData, CardRenderHook } from '../models/card-node';
import { AtomData } from '../models/atom-node';
import { Option, Maybe, Dict } from '../utils/types';
import Markup from '../models/markup';
import View from '../views/view';
import Atom, { AtomPayload } from '../models/atom';
import Section from '../models/_section';
import { TextInputHandlerListener } from './text-input-handler';
export { EDITOR_ELEMENT_CLASS_NAME } from '../renderers/editor-dom';
export interface EditorOptions {
    parserPlugins?: SectionParserPlugin[];
    placeholder?: string;
    spellcheck?: boolean;
    autofocus?: boolean;
    showLinkTooltips?: boolean;
    undoDepth?: number;
    undoBlockTimeout?: number;
    cards?: CardData[];
    atoms?: AtomData[];
    cardOptions?: {};
    unknownCardHandler?: CardRenderHook;
    unknownAtomHandler?: CardRenderHook;
    mobiledoc?: Option<Mobiledoc>;
    html?: Option<string>;
    tooltipPlugin?: TooltipPlugin;
    /** @internal */
    nodeType?: number;
}
export declare enum Format {
    MOBILEDOC = "mobiledoc",
    HTML = "html",
    TEXT = "text"
}
export interface SerializeOptions {
    version?: MobiledocVersion;
}
export interface InputHandler {
    /** Used by identifying handlers. */
    name: string;
    /** Required if `match` is not provided. */
    text?: string;
    /** Required if `text` is not provided. */
    match?: RegExp;
    /**
     * This callback is invoked with the {@link Editor} instance and an array of
     * matches. If `text` was provided, the matches array will equal [`text`],
     * and if a `match` regex was provided the matches array will be the result
     * of `match.exec` on the matching text. The callback is called after the
     * matching text has been inserted.
     */
    run: (editor: Editor, matches: string[]) => void;
}
export declare enum TextUnit {
    CHAR = "char",
    WORD = "word"
}
interface DeleteOperation {
    direction: Direction;
    unit: TextUnit;
}
interface BeforeHooks {
    toggleMarkup: LifecycleCallback[];
}
/**
 * The Editor is a core component of mobiledoc-kit. After instantiating
 * an editor, use {@link Editor#render} to display the editor on the web page.
 *
 * An editor uses a {@link Post} internally to represent the displayed document.
 * The post can be serialized as mobiledoc using {@link Editor#serialize}. Mobiledoc
 * is the transportable "over-the-wire" format (JSON) that is suited for persisting
 * and sharing between editors and renderers (for display, e.g.), whereas the Post
 * model is better suited for programmatic editing.
 *
 * The editor will call registered callbacks for certain state changes. These are:
 *   * {@link Editor#cursorDidChange} -- The cursor position or selection changed.
 *   * {@link Editor#postDidChange} -- The contents of the post changed due to user input or
 *     programmatic editing. This hook can be used with {@link Editor#serialize}
 *     to auto-save a post as it is being edited.
 *   * {@link Editor#inputModeDidChange} -- The active section(s) or markup(s) at the current cursor
 *     position or selection have changed. This hook can be used with
 *     {@link Editor#activeMarkups} and {@link Editor#activeSections} to implement
 *     a custom toolbar.
 *   * {@link Editor#onTextInput} -- Register callbacks when the user enters text
 *     that matches a given string or regex.
 *   * {@link Editor#beforeToggleMarkup} -- Register callbacks that will be run before
 *     applying changes from {@link Editor#toggleMarkup}
 */
export default class Editor implements EditorOptions {
    post: Post;
    cards: CardData[];
    atoms: AtomData[];
    element: HTMLElement;
    isEditable: boolean;
    hasRendered: boolean;
    isDestroyed: boolean;
    undoDepth: number;
    parserPlugins: SectionParserPlugin[];
    placeholder: string;
    spellcheck: boolean;
    autofocus: boolean;
    showLinkTooltips: boolean;
    undoBlockTimeout: number;
    cardOptions: {};
    unknownCardHandler: CardRenderHook;
    unknownAtomHandler: CardRenderHook;
    mobiledoc: Option<Mobiledoc>;
    html: Option<string>;
    text: Option<string>;
    tooltipPlugin: TooltipPlugin;
    _views: View[];
    _keyCommands?: CompiledKeyCommand[];
    _parserPlugins: SectionParserPlugin[];
    _logManager: LogManager;
    _parser: DOMParser;
    _builder: PostNodeBuilder;
    _renderer: Renderer;
    _renderTree: RenderTree;
    _editHistory: EditHistory;
    _eventManager: EventManager;
    _mutationHandler: MutationHandler;
    _editState: EditState;
    _callbacks: LifecycleCallbacks;
    _beforeHooks: BeforeHooks;
    _isComposingOnBlankLine: boolean;
    /**
     * @param {Object} [options]
     * @param {Object} [options.mobiledoc] The mobiledoc to load into the editor.
     *        Supersedes `options.html`.
     * @param {String|DOM} [options.html] The html (as a string or DOM fragment)
     *        to parse and load into the editor.
     *        Will be ignored if `options.mobiledoc` is also passed.
     * @param {Array} [options.parserPlugins=[]]
     * @param {Array} [options.cards=[]] The cards that the editor may render.
     * @param {Array} [options.atoms=[]] The atoms that the editor may render.
     * @param {Function} [options.unknownCardHandler] Invoked by the editor's renderer
     *        whenever it encounters an unknown card.
     * @param {Function} [options.unknownAtomHandler] Invoked by the editor's renderer
     *        whenever it encounters an unknown atom.
     * @param {String} [options.placeholder] Default text to show before user starts typing.
     * @param {Boolean} [options.spellcheck=true] Whether to enable spellcheck
     * @param {Boolean} [options.autofocus=true] Whether to focus the editor when it is first rendered.
     * @param {Boolean} [options.showLinkTooltips=true] Whether to show the url tooltip for links
     * @param {number} [options.undoDepth=5] How many undo levels will be available.
     *        Set to 0 to disable undo/redo functionality.
     * @public
     */
    constructor(options?: EditorOptions);
    /**
     * Turns on verbose logging for the editor.
     * @param {Array} [logTypes=[]] If present, only the given log types will be logged.
     * @public
     */
    enableLogging(logTypes?: string[]): void;
    /**
     * Disable all logging
     * @public
     */
    disableLogging(): void;
    /**
     * @private
     */
    loggerFor(type: string): import("../utils/log-manager").Logger;
    /**
     * The editor's instance of a post node builder.
     * @type {PostNodeBuilder}
     */
    get builder(): PostNodeBuilder;
    loadPost(): Post;
    rerender(): void;
    /**
     * @param {Element} element The DOM element to render into.
     *        Its contents will be replaced by the editor's rendered post.
     * @public
     */
    render(element: HTMLElement): void;
    _addTooltip(): void;
    get keyCommands(): CompiledKeyCommand[];
    /**
     * @param {Object} keyCommand The key command to register. It must specify a
     * modifier key (meta, ctrl, etc), a string representing the ascii key, and
     * a `run` method that will be passed the editor instance when the key command
     * is invoked
     * @public
     */
    registerKeyCommand(rawKeyCommand: KeyCommand): void;
    /**
     * @param {String} name If the keyCommand event has a name attribute it can be removed.
     * @public
     */
    unregisterKeyCommands(name: string): void;
    /**
     * Convenience for {@link PostEditor#deleteAtPosition}. Deletes and puts the
     * cursor in the new position.
     * @public
     */
    deleteAtPosition(position: Position, direction: number, { unit }: {
        unit: TextUnit;
    }): void;
    /**
     * Convenience for {@link PostEditor#deleteRange}. Deletes and puts the
     * cursor in the new position.
     * @param {Range} range
     * @public
     */
    deleteRange(range: Range): void;
    /**
     * @private
     */
    performDelete({ direction, unit }?: DeleteOperation): void;
    handleNewline(event: KeyboardEvent): void;
    /**
     * Notify the editor that the post did change, and run associated
     * callbacks.
     * @private
     */
    _postDidChange(): void;
    /**
     * Selects the given range or position. If given a collapsed range or a position, this positions the cursor
     * at the range's position. Otherwise a selection is created in the editor
     * surface encompassing the range.
     * @param {Range|Position} range
     */
    selectRange(range: Range | Position): void;
    get cursor(): Cursor;
    /**
     * Return the current range for the editor (may be cached).
     * @return {Range}
     */
    get range(): Range;
    set range(newRange: Range);
    _readRangeFromDOM(): void;
    setPlaceholder(placeholder: string): void;
    _reparsePost(): void;
    _reparseSections(sections?: Section[]): void;
    _removeDetachedSections(): void;
    /**
     * The sections from the cursor's selection start to the selection end
     * @type {Section[]}
     */
    get activeSections(): Section[];
    get activeSection(): Section;
    get activeSectionAttributes(): Dict<string[]>;
    detectMarkupInRange(range: Range, markupTagName: string): Markup;
    /**
     * @type {Markup[]}
     * @public
     */
    get activeMarkups(): Markup[];
    /**
     * @param {Markup|String} markup A markup instance, or a string (e.g. "b")
     * @return {boolean}
     */
    hasActiveMarkup(markup: Markup | string): boolean;
    /**
     * @param {String} version The mobiledoc version to serialize to.
     * @return {Mobiledoc} Serialized mobiledoc
     * @public
     */
    serialize(version?: MobiledocVersion): Mobiledoc;
    /**
     * Serialize the editor's post to the requested format.
     * Note that only mobiledoc format is lossless. If cards or atoms are present
     * in the post, the html and text formats will omit them in output because
     * the editor does not have access to the html and text versions of the
     * cards/atoms.
     * @param {string} format The format to serialize ('mobiledoc', 'text', 'html')
     * @return {Object|String} The editor's post, serialized to {format}
     * @public
     */
    serializeTo(format: Format.MOBILEDOC): Mobiledoc;
    serializeTo(format: Format.TEXT | Format.HTML): string;
    /**
     * @param {Post}
     * @param {String} format Same as {serializeTo}
     * @param {Object} [options]
     * @param {String} [options.version=MOBILEDOC_VERSION] version to serialize to
     * @return {Object|String}
     * @private
     */
    serializePost(post: Post, format: Format.MOBILEDOC, options?: SerializeOptions): Mobiledoc;
    serializePost(post: Post, format: Format.TEXT | Format.HTML, options?: SerializeOptions): string;
    serializePost(post: Post, format: Format, options?: SerializeOptions): string | Mobiledoc;
    addView(view: View): void;
    removeAllViews(): void;
    /**
     * Whether the editor has a cursor (or a selected range).
     * It is possible for the editor to be focused but not have a selection.
     * In this case, key events will fire but the editor will not be able to
     * determine a cursor position, so they will be ignored.
     * @return {boolean}
     * @public
     */
    hasCursor(): boolean;
    /**
     * Tears down the editor's attached event listeners and views.
     * @public
     */
    destroy(): void;
    /**
     * Keep the user from directly editing the post using the keyboard and mouse.
     * Modification via the programmatic API is still permitted.
     * @see Editor#enableEditing
     * @public
     */
    disableEditing(): void;
    /**
     * Allow the user to directly interact with editing a post via keyboard and mouse input.
     * Editor instances are editable by default. Use this method to re-enable
     * editing after disabling it.
     * @see Editor#disableEditing
     * @public
     */
    enableEditing(): void;
    /**
     * Change a cardSection into edit mode
     * If called before the card has been rendered, it will be marked so that
     * it is rendered in edit mode when it gets rendered.
     * @param {CardSection} cardSection
     * @public
     */
    editCard(cardSection: Card): void;
    /**
     * Change a cardSection into display mode
     * If called before the card has been rendered, it will be marked so that
     * it is rendered in display mode when it gets rendered.
     * @param {CardSection} cardSection
     * @return undefined
     * @public
     */
    displayCard(cardSection: Card): void;
    /**
     * Run a new post editing session. Yields a block with a new {@link PostEditor}
     * instance. This instance can be used to interact with the post abstract.
     * Rendering will be deferred until after the callback is completed.
     *
     * Usage:
     * ```
     *   let markerRange = this.range;
     *   editor.run((postEditor) => {
     *     postEditor.deleteRange(markerRange);
     *     // editing surface not updated yet
     *     postEditor.schedule(() => {
     *       console.log('logs during rerender flush');
     *     });
     *     // logging not yet flushed
     *   });
     *   // editing surface now updated.
     *   // logging now flushed
     * ```
     *
     * @param {Function} callback Called with an instance of
     *        {@link PostEditor} as its argument.
     * @return {Mixed} The return value of `callback`.
     * @public
     */
    run<T>(callback: (postEditor: PostEditor) => T): T;
    /**
     * @param {Function} callback Called with `postEditor` as its argument.
     * @public
     */
    didUpdatePost(callback: LifecycleCallback): void;
    /**
     * @param {Function} callback Called when the post has changed, either via
     *        user input or programmatically. Use with {@link Editor#serialize} to
     *        retrieve the post in portable mobiledoc format.
     */
    postDidChange(callback: LifecycleCallback): void;
    /**
     * Register a handler that will be invoked by the editor after the user enters
     * matching text.
     * @param {Object} inputHandler
     * @param {String} inputHandler.name Required. Used by identifying handlers.
     * @param {String} [inputHandler.text] Required if `match` is not provided
     * @param {RegExp} [inputHandler.match] Required if `text` is not provided
     * @param {Function} inputHandler.run This callback is invoked with the {@link Editor}
     *                   instance and an array of matches. If `text` was provided,
     *                   the matches array will equal [`text`], and if a `match`
     *                   regex was provided the matches array will be the result of
     *                   `match.exec` on the matching text. The callback is called
     *                   after the matching text has been inserted.
     * @public
     */
    onTextInput(inputHandler: TextInputHandlerListener): void;
    /**
     * Unregister all text input handlers
     *
     * @public
     */
    unregisterAllTextInputHandlers(): void;
    /**
     * Unregister text input handler by name
     * @param {String} name The name of handler to be removed
     *
     * @public
     */
    unregisterTextInputHandler(name: string): void;
    /**
     * @param {Function} callback Called when the editor's state (active markups or
     * active sections) has changed, either via user input or programmatically
     */
    inputModeDidChange(callback: LifecycleCallback): void;
    /**
     * @param {Function} callback This callback will be called before the editor
     *        is rendered.
     * @public
     */
    willRender(callback: LifecycleCallback): void;
    /**
     * @param {Function} callback This callback will be called after the editor
     *        is rendered.
     * @public
     */
    didRender(callback: LifecycleCallback): void;
    willCopy(callback: LifecycleCallback): void;
    /**
     * @param {Function} callback This callback will be called before deleting.
     * @public
     */
    willDelete(callback: LifecycleCallback): void;
    /**
     * @param {Function} callback This callback will be called after deleting.
     * @public
     */
    didDelete(callback: LifecycleCallback): void;
    /**
     * @param {Function} callback This callback will be called before handling new line.
     * @public
     */
    willHandleNewline(callback: LifecycleCallback): void;
    /**
     * @param {Function} callback This callback will be called every time the cursor
     *        position (or selection) changes.
     * @public
     */
    cursorDidChange(callback: LifecycleCallback): void;
    _rangeDidChange(): void;
    _inputModeDidChange(): void;
    _insertEmptyMarkupSectionAtCursor(): void;
    /**
     * @callback editorBeforeCallback
     * @param { Object } details
     * @param { Markup } details.markup
     * @param { Range } details.range
     * @param { boolean } details.willAdd Whether the markup will be applied
     */
    /**
     * Register a callback that will be run before {@link Editor#toggleMarkup} is applied.
     * If any callback returns literal `false`, the toggling of markup will be canceled.
     * Note this only applies to calling `editor#toggleMarkup`. Using `editor.run` and
     * modifying markup with the `postEditor` will skip any `beforeToggleMarkup` callbacks.
     * @param {editorBeforeCallback}
     */
    beforeToggleMarkup(callback: LifecycleCallback): void;
    /**
     * Toggles the given markup at the editor's current {@link Range}.
     * If the range is collapsed this changes the editor's state so that the
     * next characters typed will be affected. If there is text selected
     * (aka a non-collapsed range), the selections' markup will be toggled.
     * If the editor is not focused and has no active range, nothing happens.
     * Hooks added using #beforeToggleMarkup will be run before toggling,
     * and if any of them returns literal false, toggling the markup will be canceled
     * and no change will be applied.
     * @param {String} markup E.g. "b", "em", "a"
     * @param {Object} [attributes={}] E.g. {href: "http://bustle.com"}
     * @public
     * @see PostEditor#toggleMarkup
     */
    toggleMarkup(markupTag: string, attributes?: Dict<string>): void;
    _ensureFocus(): void;
    focus(): void;
    /**
     * Whether there is a selection inside the editor's element.
     * It's possible to have a selection but not have focus.
     * @see #_hasFocus
     * @return {Boolean}
     */
    _hasSelection(): boolean;
    /**
     * Whether the editor's element is focused
     * It's possible to be focused but have no selection
     * @see #_hasSelection
     * @return {Boolean}
     */
    _hasFocus(): boolean;
    /**
     * Toggles the tagName for the current active section(s). This will skip
     * non-markerable sections. E.g. if the editor's range includes a "P" MarkupSection
     * and a CardSection, only the MarkupSection will be toggled.
     * @param {String} tagName The new tagname to change to.
     * @public
     * @see PostEditor#toggleSection
     */
    toggleSection(tagName: string): void;
    /**
     * Sets an attribute for the current active section(s).
     *
     * @param {String} key The attribute. The only valid attribute is 'text-align'.
     * @param {String} value The value of the attribute.
     * @public
     * @see PostEditor#setAttribute
     */
    setAttribute(key: string, value: string): void;
    /**
     * Removes an attribute from the current active section(s).
     *
     * @param {String} key The attribute. The only valid attribute is 'text-align'.
     * @public
     * @see PostEditor#removeAttribute
     */
    removeAttribute(key: string): void;
    /**
     * Finds and runs the first matching key command for the event
     *
     * If multiple commands are bound to a key combination, the
     * first matching one is run.
     *
     * If a command returns `false` then the next matching command
     * is run instead.
     *
     * @param {Event} event The keyboard event triggered by the user
     * @return {Boolean} true when a command was successfully run
     * @private
     */
    handleKeyCommand(event: KeyboardEvent): boolean;
    /**
     * Inserts the text at the current cursor position. If the editor has
     * no current cursor position, nothing will be inserted. If the editor's
     * range is not collapsed, it will be deleted before insertion.
     *
     * @param {String} text
     * @public
     */
    insertText(text: string): void;
    /**
     * Inserts an atom at the current cursor position. If the editor has
     * no current cursor position, nothing will be inserted. If the editor's
     * range is not collapsed, it will be deleted before insertion.
     * @param {String} atomName
     * @param {String} [atomText='']
     * @param {Object} [atomPayload={}]
     * @return {Atom} The inserted atom.
     * @public
     */
    insertAtom(atomName: string, atomText?: string, atomPayload?: AtomPayload): Maybe<Atom>;
    /**
     * Inserts a card at the section after the current cursor position. If the editor has
     * no current cursor position, nothing will be inserted. If the editor's
     * range is not collapsed, it will be deleted before insertion. If the cursor is in
     * a blank section, it will be replaced with a card section.
     * The editor's cursor will be placed at the end of the inserted card.
     * @param {String} cardName
     * @param {Object} [cardPayload={}]
     * @param {Boolean} [inEditMode=false] Whether the card should be inserted in edit mode.
     * @return {Card} The inserted Card section.
     * @public
     */
    insertCard(cardName: string, cardPayload?: CardPayload, inEditMode?: boolean): Maybe<Card>;
    /**
     * @param {integer} x x-position in viewport
     * @param {integer} y y-position in viewport
     * @return {Position|null}
     */
    positionAtPoint(x: number, y: number): Position | null;
    /**
     * @private
     */
    _setCardMode(cardSection: Card, mode: CardMode): void;
    triggerEvent(context: HTMLElement, eventName: DOMEventType, event: DOMEventForType<typeof eventName>): void;
    addCallback(queueName: string, callback: LifecycleCallback): void;
    addCallbackOnce(queueName: string, callback: LifecycleCallback): void;
    runCallbacks(queueName: string, args?: unknown[]): void;
    /**
     * Runs each callback for the given hookName.
     * Only the hookName 'toggleMarkup' is currently supported
     * @return {Boolean} shouldCancel Whether the action in `hookName` should be canceled
     * @private
     */
    _runBeforeHooks(hookName: keyof BeforeHooks, ...args: unknown[]): true | undefined;
}
