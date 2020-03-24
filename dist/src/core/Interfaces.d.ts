/**
 * Interface for {ExpressionNodeBase}
 */
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
export interface IExpressionNodeBase {
    parentNode?: ExpressionNodeGroup;
}
/**
 * Interface for node types, inheriting from {ExpressionNodeBase}
 */
export interface IExpressionNode extends IExpressionNodeBase {
    toJSON(addMaxDepth?: boolean): IExpressionNodeJSON | IExpressionNodeGroupJSON;
}
export declare function isIExpressionNode(obj: Object): obj is IExpressionNode;
/**
 * Condition object schema for {ExpressionNode}
 */
export interface ICondition {
    name: string | null;
    value: any;
}
export declare function isICondition(obj: object): obj is ICondition;
/**
 * Options object, describing data for {ExpressionNodeGroup}
 */
export interface IExpressionNodeGroupOpts {
    connectionType?: string;
    children?: IExpressionNode[];
    maxDepth?: number;
    currentDepth?: number;
}
/**
 * JSON representations of nodes and their data
 */
export interface IExpressionNodeJSON extends ICondition {
}
export interface IExpressionNodeGroupJSON {
    connectionType: string;
    children: (IExpressionNodeJSON | IExpressionNodeGroupJSON)[];
    maxDepth?: number;
}
