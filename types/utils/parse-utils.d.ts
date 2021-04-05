import Post from '../models/post';
import { Logger } from './log-manager';
import Editor from '../editor/editor';
import { Maybe } from './types';
import { Mobiledoc } from '../renderers/mobiledoc';
export declare const MIME_TEXT_PLAIN = "text/plain";
export declare const MIME_TEXT_HTML = "text/html";
export declare const NONSTANDARD_IE_TEXT_TYPE = "Text";
declare global {
    interface Window {
        readonly clipboardData: DataTransfer | null;
    }
}
/**
 * @return {{html: String, text: String}}
 * @private
 */
export declare function getContentFromPasteEvent(event: ClipboardEvent, window: Window): {
    html: string;
    text: string;
};
interface ClipboardData {
    mobiledoc: Mobiledoc;
    html: string;
    text: string;
}
/**
 * @param {CopyEvent|CutEvent}
 * @param {Editor}
 * @param {Window}
 * @private
 */
export declare function setClipboardData(event: ClipboardEvent, { mobiledoc, html, text }: ClipboardData, window: Window): void;
/**
 * @param {PasteEvent}
 * @param {{builder: Builder, _parserPlugins: Array}} options
 * @return {Post}
 * @private
 */
export declare function parsePostFromPaste(pasteEvent: ClipboardEvent, { builder, _parserPlugins: plugins }: Editor, { targetFormat }?: {
    targetFormat: string;
}): Maybe<Post>;
/**
 * @param {DropEvent}
 * @param {Editor} editor
 * @param {Object} [options={}] Can pass a logger
 * @return {Post}
 * @private
 */
export declare function parsePostFromDrop(dropEvent: DragEvent, editor: Editor, { logger }?: {
    logger?: Logger;
}): Maybe<Post>;
export {};
