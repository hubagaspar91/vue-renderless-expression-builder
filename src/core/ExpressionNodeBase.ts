import {IExpressionNodeBase} from "@/core/Interfaces";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";

export const connectionTypes = {
  AND: "and",
  OR: "or"
};

export const connectionTypesArray = Object.values(connectionTypes);


export default class ExpressionNodeBase implements IExpressionNodeBase {
  private _connectionType: string = connectionTypes.AND;
  private _parentNode?: ExpressionNodeGroup;

  constructor(connectionType: string = connectionTypes.AND, parentNode?: ExpressionNodeGroup) {
    this.connectionType = connectionType;
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

  set connectionType(value: string) {
    if (Object.values(connectionTypesArray).includes(value))
      this._connectionType = value;
    else
      throw new Error("ConnectionType not supported, possible values: " + connectionTypesArray.join(", "));
  }

  get connectionType() {
    return this._connectionType;
  }

}
