import Position from './cursor/position';
import Range from './cursor/range';
import { Direction } from '../utils/key';
import Editor from '../editor/editor';
import RenderTree from '../models/render-tree';
import Post from '../models/post';
export { Position, Range };
declare class Cursor {
    editor: Editor;
    renderTree: RenderTree;
    post: Post;
    constructor(editor: Editor);
    clearSelection(): void;
    /**
     * @return {Boolean} true when there is either a collapsed cursor in the
     * editor's element or a selection that is contained in the editor's element
     */
    hasCursor(): boolean;
    hasSelection(): boolean;
    /**
     * @return {Boolean} Can the cursor be on this element?
     */
    isAddressable(element: Node): boolean;
    get offsets(): Range;
    _findNodeForPosition(position: Position): {
        node: any;
        offset: any;
    };
    selectRange(range: Range): void;
    get selection(): Selection;
    selectedText(): string;
    /**
     * @param {textNode} node
     * @param {integer} offset
     * @param {textNode} endNode
     * @param {integer} endOffset
     * @param {integer} direction forward or backward, default forward
     * @private
     */
    _moveToNode(node: Text, offset: number, endNode: Text, endOffset: number, direction?: Direction): void;
    _hasSelection(): boolean;
    _hasCollapsedSelection(): boolean;
    get _selectionRange(): globalThis.Range;
}
export default Cursor;
