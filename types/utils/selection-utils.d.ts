export declare function clearSelection(): void;
interface PartialCoords {
    top: number;
    left: number;
}
export declare function findOffsetInNode(node: Node, coords: PartialCoords): {
    node: Node;
    offset: number;
};
export declare function constrainSelectionTo(selection: PartialSelection, parentNode: Node): PartialSelection;
interface ComparePositionResult {
    headNode: Node;
    headOffset: number;
    tailNode: Node;
    tailOffset: number;
    direction: number | null;
}
export interface PartialSelection {
    focusNode: Node | null;
    focusOffset: number;
    anchorNode: Node | null;
    anchorOffset: number;
}
export declare function isFullSelection(selection: PartialSelection | Selection): selection is Selection;
export declare function comparePosition(selection: PartialSelection): ComparePositionResult;
export {};
