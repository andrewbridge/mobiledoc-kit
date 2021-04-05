import Editor from './editor';
import { PartialSelection } from '../utils/selection-utils';
declare type SelectionManagerCallback = (curSelection: PartialSelection, prevSelection: PartialSelection) => void;
export default class SelectionManager {
    editor: Editor;
    callback: SelectionManagerCallback;
    started: boolean;
    constructor(editor: Editor, callback: SelectionManagerCallback);
    start(): void;
    stop(): void;
    destroy(): void;
    selectionDidChange(curSelection: PartialSelection, prevSelection: PartialSelection): void;
}
export {};
