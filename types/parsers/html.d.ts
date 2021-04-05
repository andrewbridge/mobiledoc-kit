import PostNodeBuilder from '../models/post-node-builder';
import Post from '../models/post';
export default class HTMLParser {
    builder: PostNodeBuilder;
    options: {};
    constructor(builder: PostNodeBuilder, options?: {});
    /**
     * @param {String} html to parse
     * @return {Post} A post abstract
     */
    parse(html: string): Post;
}
