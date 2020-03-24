import {IExpressionNodeGroupJSON} from "@/core/Interfaces";

export const testJSON: IExpressionNodeGroupJSON = {
  connectionType: "and",
  maxDepth: 5,
  children: [
    {
      connectionType: "or",
      children: [
        {
          name: "test",
          value: 1
        }
      ]
    },
    {
      name: "test",
      value: 2
    }
  ]
};
