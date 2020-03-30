import { ICondition, IExpressionNode, IExpressionNodeGroupJSON } from "@/core/Interfaces";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
export default class ExpressionBuilder {
    readonly root: ExpressionNodeGroup;
    private readonly errorHandler?;
    private _context;
    constructor(root?: ExpressionNodeGroup | IExpressionNodeGroupJSON, errorHandler?: Function);
    get context(): ExpressionNodeGroup;
    private _validateIndex;
    /**
     * Wraps an operation, by validating whether
     * - Insertion is done to a valid index
     * - If inserting a group, that its children don't exceed the maxDepth
     * @param node
     * @param operation
     * @param index
     * @private
     */
    private _fluentInsertion;
    private _insert;
    insert(node: IExpressionNode, index: number): ExpressionBuilder;
    private _add;
    add(node: IExpressionNode): ExpressionBuilder;
    private _set;
    set(node: IExpressionNode, index: number): ExpressionBuilder;
    delete(index: number): this;
    contextUp(): this;
    contextToRoot(): this;
    /**
     *
     * @param path {Number[]} - describes a path to the ExpressionNodeGroup in the tree, that is to be set as context
     * @param root
     * @param pathIndex
     */
    private seekContext;
    contextTo(path?: number[]): ExpressionBuilder;
    toJSON(): IExpressionNodeGroupJSON;
    flatten(): Array<ICondition[]>;
}
