import Editor from './editor';
import { TextInputHandlerListener } from './text-input-handler';
/**
 * Convert section at the editor's cursor position into a list.
 * Does nothing if the cursor position is not at the start of the section,
 * or if the section is already a list item.
 *
 * @param {Editor} editor
 * @param {String} listTagName ("ul" or "ol")
 * @public
 */
export declare function replaceWithListSection(editor: Editor, listTagName: string): void;
/**
 * Convert section at the editor's cursor position into a header section.
 * Does nothing if the cursor position is not at the start of the section.
 *
 * @param {Editor} editor
 * @param {String} headingTagName ('h1', 'h2', 'h3', 'h4', 'h5', 'h6')
 * @public
 */
export declare function replaceWithHeaderSection(editor: Editor, headingTagName: string): void;
export declare const DEFAULT_TEXT_INPUT_HANDLERS: TextInputHandlerListener[];
