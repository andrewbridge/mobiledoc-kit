import Section from './_section';
import PostNodeBuilder from './post-node-builder';
export declare enum CardMode {
    DISPLAY = "display",
    EDIT = "edit"
}
export declare function isCardSection(section: {}): section is Card;
export declare type CardPayload = {};
export default class Card<T = CardPayload> extends Section {
    name: string;
    payload: T;
    builder: PostNodeBuilder;
    _initialMode: CardMode;
    isCardSection: boolean;
    constructor(name: string, payload: T);
    textUntil(): string;
    canJoin(): boolean;
    get length(): number;
    clone(): Card<CardPayload>;
    /**
     * set the mode that this will be rendered into initially
     * @private
     */
    setInitialMode(initialMode: CardMode): void;
}
