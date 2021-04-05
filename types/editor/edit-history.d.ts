import Post from '../models/post';
import FixedQueue from '../utils/fixed-queue';
import { Option } from '../utils/types';
import Editor from './editor';
import PostEditor, { EditAction } from './post';
import { Mobiledoc } from '../renderers/mobiledoc';
export declare class Snapshot {
    takenAt: number;
    editor: Editor;
    editAction: Option<EditAction>;
    mobiledoc: Mobiledoc;
    range: {
        head: [number, number];
        tail: [number, number];
    };
    constructor(takenAt: number, editor: Editor, editAction?: Option<EditAction>);
    snapshotRange(): void;
    getRange(post: Post): import("..").Range;
    groupsWith(groupingTimeout: number, editAction: Option<EditAction>, takenAt: number): boolean;
}
export default class EditHistory {
    editor: Editor;
    _undoStack: FixedQueue<Snapshot>;
    _redoStack: FixedQueue<Snapshot>;
    _pendingSnapshot: Option<Snapshot>;
    _groupingTimeout: number;
    constructor(editor: Editor, queueLength: number, groupingTimeout: number);
    snapshot(): void;
    storeSnapshot(editAction?: Option<EditAction>): void;
    stepBackward(postEditor: PostEditor): void;
    stepForward(postEditor: PostEditor): void;
    _restoreFromSnapshot(snapshot: Snapshot, postEditor: PostEditor): void;
}
