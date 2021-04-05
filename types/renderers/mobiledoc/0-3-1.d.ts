import Post from '../../models/post';
import { Dict } from '../../utils/types';
import { MobiledocMarker, MobiledocSection, MobiledocMarkerType, MobiledocAtom, MobiledocCard } from './0-3';
export declare const MOBILEDOC_VERSION = "0.3.1";
export declare class PostOpcodeCompiler {
    markupMarkerIds: number[];
    markers: MobiledocMarker[];
    sections: MobiledocSection[];
    items: MobiledocMarker[][];
    markerTypes: MobiledocMarkerType[];
    atomTypes: MobiledocAtom[];
    cardTypes: MobiledocCard[];
    result: MobiledocV0_3_1;
    _markerTypeCache: Dict<number>;
    openMarker(closeCount: number, value: string): void;
    openAtom(closeCount: number, name: string, value: string, payload: {}): void;
    openMarkupSection(tagName: string): void;
    openListSection(tagName: string): void;
    openListItem(): void;
    openImageSection(url: string): void;
    openCardSection(name: string, payload: {}): void;
    openPost(): void;
    openMarkup(tagName: string, attributes: string[]): void;
    _addCardTypeIndex(cardName: string, payload: {}): number;
    _addAtomTypeIndex(atomName: string, atomValue: string, payload: {}): number;
    _findOrAddMarkerTypeIndex(tagName: string, attributesArray: string[]): number;
}
export interface MobiledocV0_3_1 {
    version: typeof MOBILEDOC_VERSION;
    atoms: MobiledocAtom[];
    cards: MobiledocCard[];
    markups: MobiledocMarkerType[];
    sections: MobiledocSection[];
}
declare const _default: {
    /**
     * @param {Post}
     * @return {Mobiledoc}
     */
    render(post: Post): MobiledocV0_3_1;
};
/**
 * Render from post -> mobiledoc
 */
export default _default;
