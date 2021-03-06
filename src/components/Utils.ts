import {IExpressionNode} from "@/core/Interfaces";

export interface InputEventBody {
  node: IExpressionNode;
  path: number[];
  action: string;
}

export const actionTypes = {
  ADD: "add",
  INSERT: "insert",
  DELETE: "delete",
  UPDATED: "updated"
};

Object.freeze(actionTypes);