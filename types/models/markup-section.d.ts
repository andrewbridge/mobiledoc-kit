import Markerable from './_markerable';
import Marker from './marker';
import Markuperable from '../utils/markuperable';
import Section from './_section';
export declare const VALID_MARKUP_SECTION_TAGNAMES: string[];
export declare const MARKUP_SECTION_ELEMENT_NAMES: string[];
export declare const DEFAULT_TAG_NAME: string;
declare const MarkupSection_base: new (...args: any[]) => Markerable & import("./_attributable").Attributable;
export default class MarkupSection extends MarkupSection_base {
    isMarkupSection: boolean;
    isGenerated: boolean;
    _inferredTagName: boolean;
    constructor(tagName?: string, markers?: Markuperable[], attributes?: {});
    isValidTagName(normalizedTagName: string): boolean;
    splitAtMarker(marker: Marker, offset?: number): [Section, Section];
}
export declare function isMarkupSection(section: Section): section is MarkupSection;
export declare function hasInferredTagName(section: Section): section is MarkupSection;
export {};
