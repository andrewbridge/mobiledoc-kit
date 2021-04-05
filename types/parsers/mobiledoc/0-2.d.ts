import { MobiledocMarkerType, MobiledocV0_2, MobiledocSection, MobiledocMarker, MobiledocCardSection, MobiledocImageSection, MobiledocMarkupSection, MobiledocListSection } from '../../renderers/mobiledoc/0-2';
import { ForEachable } from '../../utils/array-utils';
import PostNodeBuilder from '../../models/post-node-builder';
import Post from '../../models/post';
import Markup from '../../models/markup';
import ListSection from '../../models/list-section';
import Markerable from '../../models/_markerable';
export default class MobiledocParser {
    builder: PostNodeBuilder;
    markups: Markup[];
    markerTypes: Markup[];
    constructor(builder: PostNodeBuilder);
    /**
     * @param {Mobiledoc}
     * @return {Post}
     */
    parse({ sections: sectionData }: MobiledocV0_2): Post;
    parseMarkerTypes(markerTypes: MobiledocMarkerType[]): Markup[];
    parseMarkerType([tagName, attributesArray]: MobiledocMarkerType): Markup;
    parseSections(sections: ForEachable<MobiledocSection>, post: Post): void;
    parseSection(section: MobiledocSection, post: Post): void;
    parseCardSection([, name, payload]: MobiledocCardSection, post: Post): void;
    parseImageSection([, src]: MobiledocImageSection, post: Post): void;
    parseMarkupSection([, tagName, markers]: MobiledocMarkupSection, post: Post): void;
    parseListSection([, tagName, items]: MobiledocListSection, post: Post): void;
    parseListItems(items: MobiledocMarker[][], section: ListSection): void;
    parseListItem(markers: MobiledocMarker[], section: ListSection): void;
    parseMarkers(markers: MobiledocMarker[], parent: Markerable): void;
    parseMarker([markerTypeIndexes, closeCount, value]: [number[], number, string], parent: Markerable): void;
}
