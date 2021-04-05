import Keys from './keys';
import { Dict } from './types';
export declare enum Direction {
    FORWARD = 1,
    BACKWARD = -1
}
export { Direction as DIRECTION };
export declare const MODIFIERS: Dict<number>;
export declare function modifierMask(event: KeyboardEvent): number;
declare const SPECIAL_KEYS: Dict<number>;
export declare function specialCharacterToCode(specialCharacter: keyof typeof SPECIAL_KEYS | string): number;
/**
 * An abstraction around a KeyEvent
 * that key listeners in the editor can use
 * to determine what sort of key was pressed
 */
export default class Key {
    key: string;
    keyCode: number;
    charCode: number;
    event: KeyboardEvent;
    modifierMask: number;
    constructor(event: KeyboardEvent);
    static fromEvent(event: KeyboardEvent): Key;
    toString(): string;
    isKeySupported(): string;
    isKey(identifier: keyof typeof Keys): boolean;
    isEscape(): boolean;
    isDelete(): boolean;
    isForwardDelete(): boolean;
    isArrow(): boolean;
    isHorizontalArrow(): boolean;
    isHorizontalArrowWithoutModifiersOtherThanShift(): boolean;
    isVerticalArrow(): boolean;
    isLeftArrow(): boolean;
    isRightArrow(): boolean;
    isHome(): boolean;
    isEnd(): boolean;
    isPageUp(): boolean;
    isPageDown(): boolean;
    isInsert(): boolean;
    isClear(): boolean;
    isPause(): boolean;
    isSpace(): boolean;
    isTab(): boolean;
    isEnter(): boolean;
    isShiftKey(): boolean;
    isAltKey(): boolean;
    isCtrlKey(): boolean;
    isIME(): boolean;
    get direction(): Direction;
    /**
     * If the shift key is depressed.
     * For example, while holding down meta+shift, pressing the "v"
     * key would result in an event whose `Key` had `isShift()` with a truthy value,
     * because the shift key is down when pressing the "v".
     * @see {isShiftKey} which checks if the key is actually the shift key itself.
     * @return {bool}
     */
    isShift(): number;
    hasModifier(modifier: number): number;
    hasAnyModifier(): boolean;
    get ctrlKey(): number;
    get metaKey(): number;
    get shiftKey(): number;
    get altKey(): number;
    isPrintableKey(): boolean;
    isNumberKey(): boolean;
    isLetterKey(): boolean;
    isPunctuation(): boolean;
    /**
     * See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#Printable_keys_in_standard_position
     *   and http://stackoverflow.com/a/12467610/137784
     */
    isPrintable(): boolean;
}
