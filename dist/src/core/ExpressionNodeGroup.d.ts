import { ICondition, IExpressionNode, IExpressionNodeGroupJSON, IExpressionNodeGroupOpts } from "@/core/Interfaces";
import ExpressionNodeBase from "@/core/ExpressionNodeBase";
export default class ExpressionNodeGroup extends ExpressionNodeBase implements IExpressionNode {
    private _children;
    private _maxDepth;
    private _currentDepth;
    constructor(opts?: IExpressionNodeGroupOpts, connectionType?: string, parentNode?: ExpressionNodeGroup);
    set children(value: IExpressionNode[]);
    get children(): IExpressionNode[];
    set maxDepth(value: number);
    get maxDepth(): number;
    /**
     * Current depth must be 0 or larger by one than that of the parentNode
     * @param value
     */
    set currentDepth(value: number);
    get currentDepth(): number;
    /**
     * Recursively creates a JSON representation of the expression tree
     */
    toJSON(addMaxDepth?: boolean): IExpressionNodeGroupJSON;
    static isJSONInstance(object: object): object is IExpressionNodeGroupJSON;
    static fromJSON(json: IExpressionNodeGroupJSON, parentNode?: ExpressionNodeGroup, currentDepth?: number): ExpressionNodeGroup;
    /**
     * Flattens the expression, to a 1 depth array of arrays
     * Where the elements of each array are connected by AND
     * and the arrays are connected by OR
     * This means, the output can be interpreted simply as
     *
     * flattened.some(flattened.map(group => group.every(validateNode)), n => n)
     *
     * It can be used for client side list filtering
     */
    flatten(): Array<ICondition[]>;
}
