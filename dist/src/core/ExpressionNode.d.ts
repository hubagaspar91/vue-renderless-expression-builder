import ExpressionNodeBase from "@/core/ExpressionNodeBase";
import { ICondition, IExpressionNode, IExpressionNodeJSON } from "@/core/Interfaces";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
/**
 * Node object, describing a condition
 */
export default class ExpressionNode extends ExpressionNodeBase implements IExpressionNode {
    private _condition;
    constructor(condition?: ICondition, parentNode?: ExpressionNodeGroup);
    get condition(): ICondition;
    set condition(condition: ICondition);
    /**
     * Exports the data as JSON
     */
    toJSON(): IExpressionNodeJSON;
    /**
     * Constructs an ExpressionNode from a JSON representation
     * @param json
     * @param parentNode
     */
    static fromJSON(json: IExpressionNodeJSON, parentNode?: ExpressionNodeGroup): ExpressionNode;
}
