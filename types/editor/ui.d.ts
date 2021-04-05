/**
 * @module UI
 */
import Editor from './editor';
declare type ShowPromptCallback = (message: string, defaultValue: string, callback: (value: string | null) => void) => void;
/**
 * @callback promptCallback
 * @param {String} url The URL to pass back to the editor for linking
 *        to the selected text.
 */
/**
 * @callback showPrompt
 * @param {String} message The text of the prompt.
 * @param {String} defaultValue The initial URL to display in the prompt.
 * @param {module:UI~promptCallback} callback Once your handler has accepted a URL,
 *        it should pass it to `callback` so that the editor may link the
 *        selected text.
 */
/**
 * Exposes the core behavior for linking and unlinking text, and allows for
 * customization of the URL input handler.
 * @param {Editor} editor An editor instance to operate on. If a range is selected,
 *        either prompt for a URL and add a link or un-link the
 *        currently linked text.
 * @param {module:UI~showPrompt} [showPrompt] An optional custom input handler. Defaults
 *        to using `window.prompt`.
 * @example
 * let myPrompt = (message, defaultURL, promptCallback) => {
 *   let url = window.prompt("Overriding the defaults", "http://placekitten.com");
 *   promptCallback(url);
 * };
 *
 * editor.registerKeyCommand({
 *   str: "META+K",
 *   run(editor) {
 *     toggleLink(editor, myPrompt);
 *   }
 * });
 * @public
 */
export declare function toggleLink(editor: Editor, showPrompt?: ShowPromptCallback): void;
/**
 * Exposes the core behavior for editing an existing link, and allows for
 * customization of the URL input handler.
 * @param {HTMLAnchorElement} target The anchor (<a>) DOM element whose URL should be edited.
 * @param {Editor} editor An editor instance to operate on. If a range is selected,
 *        either prompt for a URL and add a link or un-link the
 *        currently linked text.
 * @param {module:UI~showPrompt} [showPrompt] An optional custom input handler. Defaults
 *        to using `window.prompt`.
 *
 * @public
 */
export declare function editLink(target: HTMLAnchorElement, editor: Editor, showPrompt?: ShowPromptCallback): void;
declare const _default: {
    toggleLink: typeof toggleLink;
    editLink: typeof editLink;
};
export default _default;
