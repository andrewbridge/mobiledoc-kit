import Post from '../../models/post';
import { MobiledocSectionKind } from './constants';
export declare const MOBILEDOC_VERSION = "0.2.0";
export declare type MobiledocMarker = [number[], number, string];
export declare type MobiledocMarkerType = [string, string[]?];
export declare type MobiledocMarkupSection = [MobiledocSectionKind.MARKUP, string, MobiledocMarker[]];
export declare type MobiledocListSection = [MobiledocSectionKind.LIST, string, MobiledocMarker[][]];
export declare type MobiledocImageSection = [MobiledocSectionKind.IMAGE, string];
export declare type MobiledocCardSection = [MobiledocSectionKind.CARD, string, {}];
export declare type MobiledocSection = MobiledocMarkupSection | MobiledocListSection | MobiledocImageSection | MobiledocCardSection;
export declare class PostOpcodeCompiler {
    markupMarkerIds: number[];
    markers: MobiledocMarker[];
    sections: MobiledocSection[];
    items: MobiledocMarker[][];
    markerTypes: MobiledocMarkerType[];
    result: MobiledocV0_2;
    _markerTypeCache: {
        [key: string]: number;
    };
    openMarker(closeCount: number, value: string): void;
    openMarkupSection(tagName: string): void;
    openListSection(tagName: string): void;
    openListItem(): void;
    openImageSection(url: string): void;
    openCardSection(name: string, payload: {}): void;
    openPost(): void;
    openMarkup(tagName: string, attributes: string[]): void;
    _findOrAddMarkerTypeIndex(tagName: string, attributesArray: string[]): number;
}
export interface MobiledocV0_2 {
    version: typeof MOBILEDOC_VERSION;
    sections: [MobiledocMarkerType[], MobiledocSection[]];
}
declare const _default: {
    /**
     * @param {Post}
     * @return {Mobiledoc}
     */
    render(post: Post): MobiledocV0_2;
};
/**
 * Render from post -> mobiledoc
 */
export default _default;
