import Editor from './editor';
export declare const DEFAULT_KEY_COMMANDS: KeyCommand[];
export interface KeyCommand {
    name?: string;
    str: string;
    run(editor: Editor): boolean | void;
    /** @internal */
    modifier?: string;
}
export interface CompiledKeyCommand {
    name?: string;
    run(editor: Editor): boolean | void;
    /** @internal */
    modifier?: string;
    modifierMask: number;
    code: number;
}
export declare function buildKeyCommand(keyCommand: CompiledKeyCommand | KeyCommand): CompiledKeyCommand;
export declare function validateKeyCommand(keyCommand: CompiledKeyCommand): boolean;
export declare function findKeyCommands(keyCommands: CompiledKeyCommand[], keyEvent: KeyboardEvent): CompiledKeyCommand[];
