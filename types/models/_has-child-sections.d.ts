import LinkedList from '../utils/linked-list';
import Section from './_section';
declare type HasChildSections<T extends Section = Section> = {
    sections: LinkedList<T>;
};
export default HasChildSections;
export declare function hasChildSections(section: {}): section is HasChildSections;
