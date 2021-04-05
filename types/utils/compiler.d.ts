import { ForEachable, HasLength } from './array-utils';
import { Type } from '../models/types';
import Post from '../models/post';
import Image from '../models/image';
import ListSection from '../models/list-section';
import MarkupSection from '../models/markup-section';
import ListItem from '../models/list-item';
import Card from '../models/card';
import Marker from '../models/marker';
import Markup from '../models/markup';
import Section from '../models/_section';
import Markuperable from './markuperable';
export declare type OpcodeName = 'openPost' | 'openMarkupSection' | 'openListSection' | 'openListItem' | 'openImageSection' | 'openCardSection' | 'openMarker' | 'openAtom' | 'openMarkup' | 'openAtom';
export declare type Opcode = [OpcodeName, ...unknown[]];
export declare type Opcodes = Opcode[];
export declare type Compiler = {
    [key in OpcodeName]?: (...params: any[]) => void;
};
export declare type CompileNode = Section | Markup | Markuperable | Post;
interface Visitor {
    [Type.POST]: (node: Post, opcodes: Opcodes) => void;
    [Type.MARKUP_SECTION]: (node: MarkupSection, opcodes: Opcodes) => void;
    [Type.LIST_SECTION]: (node: ListSection, opcodes: Opcodes) => void;
    [Type.LIST_ITEM]: (node: ListItem, opcodes: Opcodes) => void;
    [Type.IMAGE_SECTION]: (node: Image, opcodes: Opcodes) => void;
    [Type.CARD]: (node: Card, opcodes: Opcodes) => void;
    [Type.MARKER]: (node: Marker, opcodes: Opcodes) => void;
    [Type.MARKUP]: (node: Markup, opcodes: Opcodes) => void;
}
export declare function visit(visitor: Visitor, node: CompileNode, opcodes: Opcodes): void;
export declare function compile(compiler: Compiler, opcodes: Opcodes): void;
declare type CompileNodes = ForEachable<CompileNode> & HasLength<CompileNode>;
export declare function visitArray(visitor: Visitor, nodes: CompileNodes, opcodes: Opcodes): void;
export {};
