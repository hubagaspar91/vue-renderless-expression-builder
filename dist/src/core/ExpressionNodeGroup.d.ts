import { ICondition, IExpressionNode, IExpressionNodeGroupJSON, IExpressionNodeGroupOpts } from "@/core/Interfaces";
import ExpressionNodeBase from "@/core/ExpressionNodeBase";
export declare const connectionTypes: {
    AND: string;
    OR: string;
};
export declare const connectionTypesArray: string[];
/**
 * Validate, whether a nodeGroup to be added, can be added, without its children exceeding the maxDepth
 * If the maxDepth is 3 and the currentDepth is 2
 * A new nodeGroup cannot be added, as its children will be in depth 4
 * If nodeGroup maxDepth is 0, there is no depth limit
 * @param maxDepth
 * @param currentDepth
 * @param groupToInsert
 */
export declare const validateProposedDepth: (maxDepth: number, currentDepth: number, groupToInsert: ExpressionNodeGroup) => boolean;
/**
 * Takes a node group, traverses it's children recursively, and determines its depth
 * @param group
 */
export declare const getNodeGroupDepth: (group: ExpressionNodeGroup) => number;
export default class ExpressionNodeGroup extends ExpressionNodeBase implements IExpressionNode {
    private _children;
    private _maxDepth;
    private _currentDepth;
    private _connectionType;
    constructor(opts?: IExpressionNodeGroupOpts, parentNode?: ExpressionNodeGroup);
    set connectionType(value: string);
    get connectionType(): string;
    /**
     * Setting children of the nodeGroup, but validating the input list, to
     * - only contain IExpressionNode objects
     * - not lead to exceeding the maxDepth defined on the current group
     *
     * Also setting the current nodeGroup instance as parent of the children
     *
     * @param value {IExpressionNode}
     */
    set children(value: IExpressionNode[]);
    get children(): IExpressionNode[];
    /**
     * Max depth of root shouldn't be changed after the object is initialized
     * @param value
     */
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
     * This means, the output can be used for client side list filtering, as:
     *
     * list.filter(elem => flattened.map(group => group.every(condition => validateCondition(condition, elem))).some(groupIsTrue => groupIsTrue))
     *
     *  -> where
     *  -> list is the list of values to filter based on the expression
     *  -> elem is an elem in the list
     *  -> flattened is the flattened expression
     *  -> group is a group of conditions in the flattened expression, between which there is an 'and' connection
     *  -> condition is an object describing a single condition (lastName === "John")
     *  -> validateCondition is a function returning a bool, validating a condition against an elem
     *  -> groupIsTrue a bool, whether all conditions in a group were validated to true, if one group validates to true, the whole expression is true
     */
    flatten(): Array<ICondition[]>;
}
