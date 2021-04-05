import { ForEachable } from '../utils/array-utils';
import SectionParser from '../parsers/section';
import Markup from '../models/markup';
import Markerable from '../models/_markerable';
import PostNodeBuilder from '../models/post-node-builder';
import Section from '../models/_section';
import Post from '../models/post';
import { Cloneable } from '../models/_cloneable';
import MarkupSection from '../models/markup-section';
import RenderTree from '../models/render-tree';
import ListItem from '../models/list-item';
import ListSection from '../models/list-section';
export declare function transformHTMLText(textContent: string): string;
export declare function trimSectionText(section: Section): void;
/**
 * Parses DOM element -> Post
 * @private
 */
export default class DOMParser {
    builder: PostNodeBuilder;
    sectionParser: SectionParser;
    constructor(builder: PostNodeBuilder, options?: {});
    parse(element: HTMLElement): Post;
    appendSections(post: Post, sections: ForEachable<Cloneable<Section>>): void;
    appendSection(post: Post, section: Cloneable<Section>): void;
    _eachChildNode(element: Node, callback: (element: Node) => void): void;
    parseSections(element: HTMLElement): Cloneable<Section>[];
    collectMarkups(textNode: Text, rootNode: Node): Markup[];
    markupFromNode(node: Node): Markup;
    reparseSection(section: Section, renderTree: RenderTree): void;
    reparseMarkupSection(section: MarkupSection, renderTree: RenderTree): void;
    reparseListItem(listItem: ListItem, renderTree: RenderTree): void;
    reparseListSection(listSection: ListSection, renderTree: RenderTree): void;
    _reparseSectionContainingMarkers(section: Markerable, renderTree: RenderTree): void;
}
