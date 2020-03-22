import { IExpressionNode, IExpressionNodeBase, IExpressionNodeGroupJSON, IExpressionNodeGroupOpts, IExpressionNodeJSON, ICondition } from "@/core/Interfaces";
export declare const connectionTypes: {
    AND: string;
    OR: string;
};
export declare const connectionTypesArray: string[];
declare class ExpressionNodeBase implements IExpressionNodeBase {
    private _connectionType;
    private _parentNode?;
    constructor(connectionType?: string, parentNode?: ExpressionNodeGroup);
    get parentNode(): ExpressionNodeGroup | undefined;
    set parentNode(val: ExpressionNodeGroup | undefined);
    set connectionType(value: string);
    get connectionType(): string;
}
/**
 * Node object, describing a condition
 */
export declare class ExpressionNode extends ExpressionNodeBase implements IExpressionNode {
    private _condition;
    constructor(condition?: ICondition, connectionType?: string, parentNode?: ExpressionNodeGroup);
    get condition(): ICondition;
    set condition(condition: ICondition);
    /**
     * Exports the data as JSON
     */
    toJSON(): IExpressionNodeJSON;
    /**
     * Checks, whether an Object is a valid JSON instance to construct an ExpressionNode from
     * @param obj
     */
    static isJSONInstance(obj: object): obj is IExpressionNodeJSON;
    /**
     * Constructs an ExpressionNode from a JSON representation
     * @param json
     * @param parentNode
     */
    static fromJSON(json: IExpressionNodeJSON, parentNode?: ExpressionNodeGroup): ExpressionNode;
}
export declare class ExpressionNodeGroup extends ExpressionNodeBase implements IExpressionNode {
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
    toJSON(addMAxDepth?: boolean): IExpressionNodeGroupJSON;
    static isJSONInstance(object: object): object is IExpressionNodeGroupJSON;
    static fromJSON(json: IExpressionNodeGroupJSON, parentNode?: ExpressionNodeGroup, currentDepth?: number): ExpressionNodeGroup;
    /**
     * Flattens the expression, to a 1 depth array of arrays
     * Where the elements of each array are connected by AND
     * and the arrays are connected by OR
     * This means, the output can be interpreted simply as
     *
     * flattened.find(flattened.map(group => group.every(validateNode)), n => n)
     */
    flatten(): Array<ICondition[]>;
}
export {};
