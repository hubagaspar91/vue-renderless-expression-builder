import {IExpressionNodeGroupJSON} from "@/core/Interfaces";

export const testJSON: IExpressionNodeGroupJSON = {
  connectionType: "and",
  maxDepth: 5,
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
