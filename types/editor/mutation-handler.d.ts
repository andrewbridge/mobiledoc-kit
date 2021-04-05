import { Option } from '../utils/types';
import Editor from './editor';
import { Logger } from '../utils/log-manager';
import RenderTree from '../models/render-tree';
import Section from '../models/_section';
import RenderNode from '../models/render-node';
export default class MutationHandler {
    editor: Editor;
    logger: Logger;
    renderTree: Option<RenderTree>;
    _isObserving: boolean;
    _observer: Option<MutationObserver>;
    constructor(editor: Editor);
    init(): void;
    destroy(): void;
    suspendObservation(callback: () => void): void;
    stopObserving(): void;
    startObserving(): void;
    reparsePost(): void;
    reparseSections(sections: Section[]): void;
    /**
     * for each mutation:
     *   * find the target nodes:
     *     * if nodes changed, target nodes are:
     *        * added nodes
     *        * the target from which removed nodes were removed
     *     * if character data changed
     *       * target node is the mutation event's target (text node)
     *     * filter out nodes that are no longer attached (parentNode is null)
     *   * for each remaining node:
     *   *  find its section, add to sections-to-reparse
     *   *  if no section, reparse all (and break)
     */
    _handleMutations(mutations: MutationRecord[]): void;
    _findTargetNodes(mutation: MutationRecord): Node[];
    _findSectionRenderNodeFromNode(node: Node): RenderNode<Node>;
    _findRenderNodeFromNode(node: Node): RenderNode<Node>;
    _findSectionFromRenderNode(renderNode: RenderNode): Section;
}
