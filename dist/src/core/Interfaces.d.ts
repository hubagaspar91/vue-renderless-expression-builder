import { ExpressionNodeGroup } from "@/core/ExpressionNodes";
/**
 * Interface for {ExpressionNodeBase}
 */
export interface IExpressionNodeBase {
    connectionType: string;
    parentNode?: ExpressionNodeGroup;
}
/**
 * Interface for node types, inheriting from {ExpressionNodeBase}
 */
export interface IExpressionNode extends IExpressionNodeBase {
    toJSON(addMAxDepth?: boolean): IExpressionNodeJSON | IExpressionNodeGroupJSON;
}
/**
 * Condition object schema for {ExpressionNode}
 */
export interface ICondition {
    name: string;
    value: any;
}
/**
 * Options object, describing data for {ExpressionNodeGroup}
 */
export interface IExpressionNodeGroupOpts {
    children?: IExpressionNode[];
    maxDepth?: number;
    currentDepth?: number;
}
/**
 * JSON representations of nodes and their data
 */
interface IExpressionNodeBaseJSON {
    connectionType: string;
}
export interface IExpressionNodeJSON extends IExpressionNodeBaseJSON {
    condition: ICondition;
}
export interface IExpressionNodeGroupJSON extends IExpressionNodeBaseJSON {
    children: (IExpressionNodeJSON | IExpressionNodeGroupJSON)[];
    maxDepth?: number;
}
export {};
