import { MobiledocMarkerType, MobiledocCard, MobiledocAtom, MobiledocMarker, MobiledocCardSection, MobiledocImageSection, MobiledocMarkupSection, MobiledocListSection } from '../../renderers/mobiledoc/0-3';
import { ForEachable } from '../../utils/array-utils';
import Markup from '../../models/markup';
import PostNodeBuilder from '../../models/post-node-builder';
import { MobiledocV0_3_2, MobiledocAttributedMarkupSection, MobiledocAttributedListSection, MobiledocAttributedSection } from '../../renderers/mobiledoc/0-3-2';
import Post from '../../models/post';
import { MobiledocMarkerKind } from '../../renderers/mobiledoc/constants';
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
    parse({ sections, markups: markerTypes, cards: cardTypes, atoms: atomTypes }: MobiledocV0_3_2): Post;
    parseMarkerTypes(markerTypes: MobiledocMarkerType[]): Markup[];
    parseMarkerType([tagName, attributesArray]: MobiledocMarkerType): Markup;
    parseCardTypes(cardTypes: MobiledocCard[]): MobiledocCard[];
    parseCardType([cardName, cardPayload]: MobiledocCard): MobiledocCard;
    parseAtomTypes(atomTypes: MobiledocAtom[]): MobiledocAtom[];
    parseAtomType([atomName, atomValue, atomPayload]: MobiledocAtom): MobiledocAtom;
    parseSections(sections: ForEachable<MobiledocAttributedSection>, post: Post): void;
    parseSection(section: MobiledocAttributedSection, post: Post): void;
    getAtomTypeFromIndex(index: number): MobiledocAtom;
    getCardTypeFromIndex(index: number): MobiledocCard;
    parseCardSection([, cardIndex]: MobiledocCardSection, post: Post): void;
    parseImageSection([, src]: MobiledocImageSection, post: Post): void;
    parseMarkupSection([, tagName, markers, attributesArray]: MobiledocMarkupSection | MobiledocAttributedMarkupSection, post: Post): void;
    parseListSection([, tagName, items, attributesArray]: MobiledocListSection | MobiledocAttributedListSection, post: Post): void;
    parseListItems(items: MobiledocMarker[][], section: ListSection): void;
    parseListItem(markers: MobiledocMarker[], section: ListSection): void;
    parseMarkers(markers: MobiledocMarker[], parent: Markerable): void;
    parseMarker([type, markerTypeIndexes, closeCount, value]: MobiledocMarker, parent: Markerable): void;
    buildMarkerType(type: MobiledocMarkerKind, value: string | number): import("../../models/atom").default | import("../../models/marker").default;
}
