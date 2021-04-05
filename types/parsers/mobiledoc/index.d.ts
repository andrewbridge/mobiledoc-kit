import { MobiledocV0_2 } from '../../renderers/mobiledoc/0-2';
import { MobiledocV0_3 } from '../../renderers/mobiledoc/0-3';
import { MobiledocV0_3_1 } from '../../renderers/mobiledoc/0-3-1';
import { MobiledocV0_3_2 } from '../../renderers/mobiledoc/0-3-2';
import PostNodeBuilder from '../../models/post-node-builder';
import Post from '../../models/post';
declare type Mobiledoc = MobiledocV0_2 | MobiledocV0_3 | MobiledocV0_3_1 | MobiledocV0_3_2;
declare const _default: {
    parse(builder: PostNodeBuilder, mobiledoc: Mobiledoc): Post;
};
export default _default;
