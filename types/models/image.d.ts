import Section from './_section';
import { Option } from '../utils/types';
export default class Image extends Section {
    src: Option<string>;
    constructor();
    clone(): Image;
    canJoin(): boolean;
    get length(): number;
}
