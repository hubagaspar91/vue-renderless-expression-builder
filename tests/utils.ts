import {IExpressionNodeGroupJSON} from "@/core/Interfaces";
import {ConditionProviderField} from "@/conditions/Interfaces";
import {fieldTypes, filterTypes} from "@/conditions/Defaults";

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

export const mockFields: ConditionProviderField[] = [
  {
    name: "test",
    displayName: "TEST",
    type: fieldTypes.TEXT
  }
];