import Post from '../../models/post';
import PostEditor from '../post';
import { Position } from '../../utils/cursor';
export default class Inserter {
    postEditor: PostEditor;
    post: Post;
    constructor(postEditor: PostEditor, post: Post);
    insert(cursorPosition: Position, newPost: Post): Position;
}
