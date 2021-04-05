import { PartialSelection } from '../utils/selection-utils';
export interface SelectionChangeListener {
    selectionDidChange(nextSelection: PartialSelection, prevSelection: PartialSelection): void;
}
declare class SelectionChangeObserver {
    started: boolean;
    listeners: SelectionChangeListener[];
    selection: PartialSelection;
    constructor();
    static getInstance(): SelectionChangeObserver;
    static addListener(listener: SelectionChangeListener): void;
    addListener(listener: SelectionChangeListener): void;
    static removeListener(listener: SelectionChangeListener): void;
    removeListener(listener: SelectionChangeListener): void;
    start(): void;
    stop(): void;
    notifyListeners(newSelection: PartialSelection, prevSelection: PartialSelection): void;
    destroy(): void;
    getSelection(): PartialSelection;
    poll(): void;
    runNext(fn: FrameRequestCallback): void;
    update(): void;
    selectionIsEqual(s1: PartialSelection, s2: PartialSelection): boolean;
}
export default SelectionChangeObserver;
