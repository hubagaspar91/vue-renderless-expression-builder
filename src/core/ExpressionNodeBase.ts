import {IExpressionNodeBase} from "@/core/Interfaces";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";


export default class ExpressionNodeBase implements IExpressionNodeBase {
  private _parentNode?: ExpressionNodeGroup;

  constructor(parentNode?: ExpressionNodeGroup) {
    this.parentNode = parentNode;
  }

  get parentNode() {
    return this._parentNode as ExpressionNodeGroup;
  }

  set parentNode(val: ExpressionNodeGroup | undefined) {
    if (val instanceof ExpressionNodeGroup)
      this._parentNode = val;
    else if (val != undefined)
      throw new Error("Parent must be undefined or ExpressionNodeGroup");
  }

}
