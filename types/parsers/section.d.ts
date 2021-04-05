import Markup from '../models/markup';
import PostNodeBuilder from '../models/post-node-builder';
import Section from '../models/_section';
import Marker from '../models/marker';
import { Cloneable } from '../models/_cloneable';
/**
 * parses an element into a section, ignoring any non-markup
 * elements contained within
 * @private
 */
interface SectionParserOptions {
    plugins?: SectionParserPlugin[];
}
interface SectionParserState {
    section?: Cloneable<Section> | null;
    text?: string;
    markups?: Markup[];
}
interface SectionParseEnv {
    addSection: (section: Cloneable<Section>) => void;
    addMarkerable: (marker: Marker) => void;
    nodeFinished(): void;
}
export declare type SectionParserPlugin = (node: Node, builder: PostNodeBuilder, env: SectionParseEnv) => void;
declare type SectionParserNode = HTMLElement | Text | Comment;
export default class SectionParser {
    builder: PostNodeBuilder;
    plugins: SectionParserPlugin[];
    sections: Cloneable<Section>[];
    state: SectionParserState;
    constructor(builder: PostNodeBuilder, options?: SectionParserOptions);
    parse(element: HTMLElement): Cloneable<Section>[];
    runPlugins(node: Node): boolean;
    parseNode(node: SectionParserNode): void;
    parseElementNode(element: HTMLElement): void;
    parseTextNode(textNode: Text): void;
    _updateStateFromElement(element: SectionParserNode): void;
    _closeCurrentSection(): void;
    _markupsFromElement(element: HTMLElement | Text): Markup[];
    _isValidMarkupForElement(tagName: string, element: HTMLElement): boolean;
    _markupsFromElementStyle(element: HTMLElement): Markup[];
    _createMarker(): void;
    _getSectionDetails(element: HTMLElement | Text): {
        sectionType: string;
        tagName: string;
        inferredTagName: boolean;
    };
    _createSectionFromElement(element: Comment | HTMLElement): Cloneable<Section>;
    _isSkippable(element: Node): boolean;
}
export {};
