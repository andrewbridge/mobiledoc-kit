import Range from '../utils/cursor/range';
import { Option, Dict } from '../utils/types';
import Editor from './editor';
import { Cloneable } from '../models/_cloneable';
import Section from '../models/_section';
import Markup from '../models/markup';
interface EditStateState {
    range: Range;
    activeMarkups: Markup[];
    activeSections: Section[];
    activeSectionTagNames: string[];
    activeSectionAttributes: Dict<string[]>;
}
/**
 * Used by {@link Editor} to manage its current state (cursor, active markups
 * and active sections).
 * @private
 */
export default class EditState {
    editor: Option<Editor>;
    state: Option<EditStateState>;
    prevState: Option<EditStateState>;
    constructor(editor: Editor);
    updateRange(newRange: Range): void;
    destroy(): void;
    /**
     * @return {Boolean}
     */
    rangeDidChange(): boolean;
    /**
     * @return {Boolean} Whether the input mode (active markups or active section tag names)
     * has changed.
     */
    inputModeDidChange(): boolean;
    /**
     * @return {Range}
     */
    get range(): Range;
    /**
     * @return {Section[]}
     */
    get activeSections(): Section[];
    /**
     * @return {Object}
     */
    get activeSectionAttributes(): Dict<string[]>;
    /**
     * @return {Markup[]}
     */
    get activeMarkups(): Markup[];
    /**
     * Update the editor's markup state. This is used when, e.g.,
     * a user types meta+B when the editor has a cursor but no selected text;
     * in this case the editor needs to track that it has an active "b" markup
     * and apply it to the next text the user types.
     */
    toggleMarkupState(markup: Markup): void;
    _readState(range: Range): EditStateState;
    _readActiveSections(range: Range): Cloneable<Section>[];
    _readActiveMarkups(range: Range): Markup[];
    _readSectionAttributes(sections: Section[]): Dict<string[]>;
    _removeActiveMarkup(markup: Markup): void;
    _addActiveMarkup(markup: Markup): void;
}
export {};
