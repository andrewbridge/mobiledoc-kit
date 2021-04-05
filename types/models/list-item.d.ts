import Markerable from './_markerable';
import Section from './_section';
import Marker from './marker';
import Markuperable from '../utils/markuperable';
import ListSection from './list-section';
export declare const VALID_LIST_ITEM_TAGNAMES: string[];
export default class ListItem extends Markerable {
    isListItem: boolean;
    isNested: boolean;
    section: Section | null;
    parent: ListSection;
    constructor(tagName: string, markers?: Markuperable[]);
    isValidTagName(normalizedTagName: string): boolean;
    splitAtMarker(marker: Marker, offset?: number): [Section, Section];
    get post(): import("./post").default;
}
export declare function isListItem(section: Section): section is ListItem;
