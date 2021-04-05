import { MobiledocMarkerType, MobiledocMarkupSection, MobiledocSection, MobiledocCard, MobiledocAtom, MobiledocCardSection, MobiledocImageSection, MobiledocListSection, MobiledocMarker } from '../../renderers/mobiledoc/0-3';
import { ForEachable } from '../../utils/array-utils';
import { MobiledocMarkerKind } from '../../renderers/mobiledoc/constants';
import PostNodeBuilder from '../../models/post-node-builder';
import { MobiledocV0_3_1 } from '../../renderers/mobiledoc/0-3-1';
import Markup from '../../models/markup';
import Post from '../../models/post';
import ListSection from '../../models/list-section';
import Markerable from '../../models/_markerable';
export default class MobiledocParser {
    builder: PostNodeBuilder;
    markups: Markup[];
    markerTypes: Markup[];
    cardTypes: MobiledocCard[];
    atomTypes: MobiledocAtom[];
    constructor(builder: PostNodeBuilder);
    /**
     * @param {Mobiledoc}
     * @return {Post}
     */
    parse({ sections, markups: markerTypes, cards: cardTypes, atoms: atomTypes }: MobiledocV0_3_1): Post;
    parseMarkerTypes(markerTypes: MobiledocMarkerType[]): Markup[];
    parseMarkerType([tagName, attributesArray]: MobiledocMarkerType): Markup;
    parseCardTypes(cardTypes: MobiledocCard[]): MobiledocCard[];
    parseCardType([cardName, cardPayload]: MobiledocCard): MobiledocCard;
    parseAtomTypes(atomTypes: MobiledocAtom[]): MobiledocAtom[];
    parseAtomType([atomName, atomValue, atomPayload]: MobiledocAtom): MobiledocAtom;
    parseSections(sections: ForEachable<MobiledocSection>, post: Post): void;
    parseSection(section: MobiledocSection, post: Post): void;
    getAtomTypeFromIndex(index: number): MobiledocAtom;
    getCardTypeFromIndex(index: number): MobiledocCard;
    parseCardSection([, cardIndex]: MobiledocCardSection, post: Post): void;
    parseImageSection([, src]: MobiledocImageSection, post: Post): void;
    parseMarkupSection([, tagName, markers]: MobiledocMarkupSection, post: Post): void;
    parseListSection([, tagName, items]: MobiledocListSection, post: Post): void;
    parseListItems(items: MobiledocMarker[][], section: ListSection): void;
    parseListItem(markers: MobiledocMarker[], section: ListSection): void;
    parseMarkers(markers: MobiledocMarker[], parent: Markerable): void;
    parseMarker([type, markerTypeIndexes, closeCount, value]: MobiledocMarker, parent: Markerable): void;
    buildMarkerType(type: MobiledocMarkerKind, value: string | number): import("../../models/atom").default | import("../../models/marker").default;
}
