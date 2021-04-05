import Post from '../../models/post';
import { Dict } from '../../utils/types';
import { MobiledocSectionKind, MobiledocMarkerKind } from './constants';
export declare const MOBILEDOC_VERSION = "0.3.0";
export declare type MobiledocMarkupMarker = [MobiledocMarkerKind.MARKUP, number[], number, string];
export declare type MobiledocAtomMarker = [MobiledocMarkerKind.ATOM, number[], number, number];
export declare type MobiledocMarker = MobiledocMarkupMarker | MobiledocAtomMarker;
export declare type MobiledocMarkupSection = [MobiledocSectionKind.MARKUP, string, MobiledocMarker[]];
export declare type MobiledocListSection = [MobiledocSectionKind.LIST, string, MobiledocMarker[][]];
export declare type MobiledocImageSection = [MobiledocSectionKind.IMAGE, string];
export declare type MobiledocCardSection = [MobiledocSectionKind.CARD, number];
export declare type MobiledocSection = MobiledocMarkupSection | MobiledocListSection | MobiledocImageSection | MobiledocCardSection;
export declare type MobiledocAtom = [string, string, {}];
export declare type MobiledocCard = [string, {}];
export declare type MobiledocMarkerType = [string, string[]?];
export declare class PostOpcodeCompiler {
    markupMarkerIds: number[];
    markers: MobiledocMarker[];
    sections: MobiledocSection[];
    items: MobiledocMarker[][];
    markerTypes: MobiledocMarkerType[];
    atomTypes: MobiledocAtom[];
    cardTypes: MobiledocCard[];
    result: MobiledocV0_3;
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
export interface MobiledocV0_3 {
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
    render(post: Post): MobiledocV0_3;
};
/**
 * Render from post -> mobiledoc
 */
export default _default;
