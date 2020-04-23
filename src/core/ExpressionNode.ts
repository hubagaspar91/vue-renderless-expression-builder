import ExpressionNodeBase from "@/core/ExpressionNodeBase";
import {ICondition, IExpressionNode, IExpressionNodeJSON} from "@/core/Interfaces";
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

    // checks for type
    this.condition = condition;
  }

  get condition() {
    return this._condition;
  }

  set condition(condition) {
    this._condition = condition;
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