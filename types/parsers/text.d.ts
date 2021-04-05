import PostNodeBuilder from '../models/post-node-builder';
import Post from '../models/post';
import Section from '../models/_section';
import { Option } from '../utils/types';
import { Cloneable } from '../models/_cloneable';
export declare const SECTION_BREAK = "\n";
export interface TextParserOptions {
}
export default class TextParser {
    builder: PostNodeBuilder;
    options: TextParserOptions;
    post: Post;
    prevSection: Option<Cloneable<Section>>;
    constructor(builder: PostNodeBuilder, options: TextParserOptions);
    /**
     * @param {String} text to parse
     * @return {Post} a post abstract
     */
    parse(text: string): Post;
    _parseSection(text: string): any;
    _appendSection(section: Cloneable<Section>): void;
}
