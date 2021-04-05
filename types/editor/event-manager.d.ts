import Key from '../utils/key';
import TextInputHandler, { TextInputHandlerListener } from '../editor/text-input-handler';
import SelectionManager from '../editor/selection-manager';
import Editor from './editor';
import { Logger } from '../utils/log-manager';
import { PartialSelection } from '../utils/selection-utils';
declare const ELEMENT_EVENT_TYPES: readonly ["keydown", "keyup", "cut", "copy", "paste", "keypress", "drop", "compositionstart", "compositionend"];
declare global {
    interface HTMLElementEventMap {
        compositionstart: CompositionEvent;
        compositionend: CompositionEvent;
    }
}
export declare type DOMEventType = typeof ELEMENT_EVENT_TYPES[number];
export declare type DOMEventForType<T extends DOMEventType> = HTMLElementEventMap[T];
export declare type DOMEvent = HTMLElementEventMap[DOMEventType];
interface ModifierKeys {
    shift: boolean;
}
declare type EventManagerListener = [HTMLElement, DOMEventType, (event: CompositionEvent | KeyboardEvent | ClipboardEvent | DragEvent) => void];
export default class EventManager {
    editor: Editor;
    logger: Logger;
    modifierKeys: ModifierKeys;
    started: boolean;
    _isComposingOnBlankLine: boolean;
    _listeners: EventManagerListener[];
    _textInputHandler: TextInputHandler;
    _selectionManager: SelectionManager;
    constructor(editor: Editor);
    init(): void;
    start(): void;
    stop(): void;
    registerInputHandler(inputHandler: TextInputHandlerListener): void;
    unregisterInputHandler(name: string): void;
    unregisterAllTextInputHandlers(): void;
    _addListener(context: HTMLElement, type: DOMEventType): void;
    _removeListeners(): void;
    _trigger(context: HTMLElement, type: DOMEventType, event: DOMEventForType<typeof type>): void;
    destroy(): void;
    _handleEvent(type: DOMEventType, event: DOMEventForType<typeof type>): boolean;
    isElementAddressable(element: Node): boolean;
    selectionDidChange(selection: PartialSelection): void;
    keypress(event: KeyboardEvent): void;
    keydown(event: KeyboardEvent): void;
    keyup(event: KeyboardEvent): void;
    compositionstart(_event: KeyboardEvent): void;
    compositionend(event: CompositionEvent): void;
    cut(event: ClipboardEvent): void;
    copy(event: ClipboardEvent): void;
    paste(event: ClipboardEvent): void;
    drop(event: DragEvent): void;
    _updateModifiersFromKey(key: Key, { isDown }: {
        isDown: boolean;
    }): void;
}
export {};
