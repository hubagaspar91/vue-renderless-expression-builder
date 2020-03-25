import ExpressionNodeBase from "@/core/ExpressionNodeBase";
import {ICondition, IExpressionNode, IExpressionNodeJSON, isICondition} from "@/core/Interfaces";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";

/**
 * Default condition factory for ExpressionNode
 */
const defaultCondition = () => ({name: null, value: null});


/**
 * Node object, describing a condition
 */
export default class ExpressionNode extends ExpressionNodeBase implements IExpressionNode {
  private _condition: ICondition = defaultCondition();

  constructor(condition: ICondition = defaultCondition(),
              parentNode?: ExpressionNodeGroup) {
    super(parentNode);

    // to check for type
    this.condition = condition;
  }

  get condition() {
    return this._condition;
  }

  set condition(condition) {
    if (isICondition(condition)) this._condition = condition;
    else throw new Error("Condition object must contain 'name' and 'value' keys.")
  }

  /**
   * Exports the data as JSON
   */
  toJSON(): IExpressionNodeJSON {
    return JSON.parse(JSON.stringify(this.condition));
  }

  /**
   * Constructs an ExpressionNode from a JSON representation
   * @param json
   * @param parentNode
   */
  static fromJSON(json: IExpressionNodeJSON, parentNode?: ExpressionNodeGroup): ExpressionNode {
    return new ExpressionNode(json, parentNode)
  }
}