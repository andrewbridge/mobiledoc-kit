import { PostOpcodeCompiler as PostOpcodeCompiler_0_2, MOBILEDOC_VERSION as MOBILEDOC_VERSION_0_2, MobiledocV0_2 } from './0-2';
import { PostOpcodeCompiler as PostOpcodeCompiler_0_3, MOBILEDOC_VERSION as MOBILEDOC_VERSION_0_3, MobiledocV0_3 } from './0-3';
import { PostOpcodeCompiler as PostOpcodeCompiler_0_3_1, MOBILEDOC_VERSION as MOBILEDOC_VERSION_0_3_1, MobiledocV0_3_1 } from './0-3-1';
import { PostOpcodeCompiler as PostOpcodeCompiler_0_3_2, MOBILEDOC_VERSION as MOBILEDOC_VERSION_0_3_2, MobiledocV0_3_2 } from './0-3-2';
import Post from '../../models/post';
export declare type Mobiledoc = MobiledocV0_2 | MobiledocV0_3 | MobiledocV0_3_1 | MobiledocV0_3_2;
export declare const MOBILEDOC_VERSION = "0.3.2";
interface VersionTypes {
    [MOBILEDOC_VERSION_0_2]: MobiledocV0_2;
    [MOBILEDOC_VERSION_0_3]: MobiledocV0_3;
    [MOBILEDOC_VERSION_0_3_1]: MobiledocV0_3_1;
    [MOBILEDOC_VERSION_0_3_2]: MobiledocV0_3_2;
}
export declare type MobiledocVersion = keyof VersionTypes;
export declare const compilers: {
    "0.2.0": typeof PostOpcodeCompiler_0_2;
    "0.3.0": typeof PostOpcodeCompiler_0_3;
    "0.3.1": typeof PostOpcodeCompiler_0_3_1;
    "0.3.2": typeof PostOpcodeCompiler_0_3_2;
};
declare const _default: {
    render(post: Post, version?: keyof VersionTypes): MobiledocV0_2 | MobiledocV0_3 | MobiledocV0_3_1 | MobiledocV0_3_2;
};
export default _default;
