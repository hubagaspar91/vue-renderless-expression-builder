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

export function isIExpressionNode(obj: object): obj is IExpressionNode {
    return "toJSON" in obj && "parentNode" in obj;
}

/**
 * Condition object schema for {ExpressionNode}
 */
export interface ICondition {
    [index: string]: any;
}

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
    // the same as ICondition
}

export interface IExpressionNodeGroupJSON {
    connectionType: string;
    children: (IExpressionNodeJSON|IExpressionNodeGroupJSON)[];
    maxDepth?: number;
}
