import * as Ex from "./core/ExpressionNodes";
import * as I from "./core/Interfaces";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {connectionTypes} from "./core/ExpressionNodes";

const test: I.IExpressionNodeGroupJSON = {
  connectionType: "and",
  children: [
    {
      connectionType: "or",
      children: [
        {
          connectionType: "and",
          condition: {
            name: "test",
            value: 1
          }
        }
      ]
    },
    {
      connectionType: "or",
      condition: {
        name: "test",
        value: 2
      }
    }
  ]
};

const ext = Ex.ExpressionNodeGroup.fromJSON(test);
const builder = new ExpressionBuilder();
builder
  .addNew(ExpressionBuilder.NODE, undefined, {name: "fasz", value: 0})
  .addNew(ExpressionBuilder.GROUP, connectionTypes.AND);
console.log(builder);
//console.log(builder.toJSON());

export default Ex;