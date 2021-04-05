import Editor from './editor';
import { Maybe } from '../utils/types';
declare class TextInputHandler {
    editor: Editor;
    _handlers: TextInputHandlerListener[];
    constructor(editor: Editor);
    register(handler: TextInputHandlerListener): void;
    unregister(name: string): void;
    handle(string: string): void;
    handleNewLine(): void;
    _findHandler(string?: string): Maybe<[TextInputHandlerListener, string[]]>;
    _validateHandler(handler: TextInputHandlerListener): boolean;
    destroy(): void;
}
interface BaseHandler {
    name: string;
    run: (editor: Editor, matches: string[]) => void;
}
interface TextHandler extends BaseHandler {
    text: string;
}
interface MatchHandler extends BaseHandler {
    match: RegExp;
}
export declare type TextInputHandlerListener = TextHandler | MatchHandler;
export default TextInputHandler;
