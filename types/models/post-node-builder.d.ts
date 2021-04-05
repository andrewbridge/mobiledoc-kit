import Atom, { AtomPayload } from './atom';
import Post from './post';
import MarkupSection from './markup-section';
import ListSection from './list-section';
import ListItem from './list-item';
import ImageSection from './image';
import Marker from './marker';
import Markup from './markup';
import Card, { CardPayload } from './card';
import { Type } from './types';
import Markuperable from '../utils/markuperable';
import Section from './_section';
import { Cloneable } from './_cloneable';
import { Dict } from '../utils/types';
/**
 * The PostNodeBuilder is used to create new {@link Post} primitives, such
 * as a MarkupSection, a CardSection, a Markup, etc. Every instance of an
 * {@link Editor} has its own builder instance. The builder can be used
 * inside an {@link Editor#run} callback to programmatically create new
 * Post primitives to insert into the document.
 * A PostNodeBuilder should be read from the Editor, *not* instantiated on its own.
 */
export default class PostNodeBuilder {
    markupCache: Dict<Markup>;
    /**
     * @return {Post} A new, blank post
     */
    createPost(sections?: Cloneable<Section>[]): Post;
    createMarkerableSection(type: Type.LIST_ITEM, tagName: string, markers: Markuperable[]): ListItem;
    createMarkerableSection(type: Type.MARKUP_SECTION, tagName: string, markers: Markuperable[]): MarkupSection;
    createMarkerableSection(type: Exclude<Type, Type.LIST_ITEM & Type.MARKUP_SECTION>, tagName: string, markers: Markuperable[]): never;
    /**
     * @param {tagName} [tagName='P']
     * @param {Marker[]} [markers=[]]
     * @return {MarkupSection}
     */
    createMarkupSection(tagName?: string, markers?: Markuperable[], isGenerated?: boolean, attributes?: {}): MarkupSection;
    createListSection(tagName?: string, items?: ListItem[], attributes?: {}): ListSection;
    createListItem(markers?: Markuperable[]): ListItem;
    createImageSection(url: string): ImageSection;
    /**
     * @param {String} name
     * @param {Object} [payload={}]
     * @return {CardSection}
     */
    createCardSection(name: string, payload?: CardPayload): Card;
    /**
     * @param {String} value
     * @param {Markup[]} [markups=[]]
     * @return {Marker}
     */
    createMarker(value?: string, markups?: Markup[]): Marker;
    /**
     * @param {String} name
     * @param {String} [value='']
     * @param {Object} [payload={}]
     * @param {Markup[]} [markups=[]]
     * @return {Atom}
     */
    createAtom(name: string, value?: string, payload?: AtomPayload, markups?: Markup[]): Atom;
    /**
     * @param {String} tagName
     * @param {Object} attributes Key-value pairs of attributes for the markup
     * @return {Markup}
     */
    createMarkup(tagName: string, attributes?: Dict<string>): Markup;
}
export declare type PostNode = Post | Section | Markuperable | Marker;
