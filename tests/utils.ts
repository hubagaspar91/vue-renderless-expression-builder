import {IExpressionNodeGroupJSON} from "@/core/Interfaces";
import {ConditionFactoryField} from "@/conditions/Interfaces";
import {defaultFieldTypes, defaultOperators, returnDefaultOperators} from "@/conditions/Defaults";
import ConditionFactory from "@/conditions/ConditionFactory";

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

export const mockFields: ConditionFactoryField[] = [
  {
    name: "test",
    label: "TEST",
    type: defaultFieldTypes.TEXT
  }
];

export const returnConditionProvider = () =>
  new ConditionFactory({fields: mockFields, operators: returnDefaultOperators()});