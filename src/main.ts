import * as Ex from "./core/ExpressionNodes";
import * as I from "./core/Interfaces";
import ExpressionBuilder from "@/core/ExpressionBuilder";

const test: I.IExpressionNodeGroupJSON = {
  connectionType: "and",
  opts: {
    children: [
      {
        connectionType: "or",
        opts: {
          maxDepth: 5,
          currentDepth: 1,
          children: [
            {
              connectionType: "and",
              condition: {
                name: "dick",
                value: 1
              }
            }
          ]
        }
      },
      {
        connectionType: "and",
        condition: {
          name: "dick",
          value: 2
        }
      }
    ],
    maxDepth: 5,
    currentDepth: 0
  }
};

const ext = Ex.ExpressionNodeGroup.fromJSON(test);
const builder = new ExpressionBuilder();
builder
  .addNew(ExpressionBuilder.NODE, undefined, {name: "fasz", value: 0})
  .addNew(ExpressionBuilder.GROUP, "and")
  .addNew(ExpressionBuilder.NODE, "or", {name: "fasz", value: 1})
  .addNew(ExpressionBuilder.NODE, "or", {name: "fasz", value: 2});
console.log(builder);

console.log(builder.flatten());

export default Ex;