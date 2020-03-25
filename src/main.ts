import ExpressionBuilder from "@/core/ExpressionBuilder";
import ExpressionNode from "@/core/ExpressionNode";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import ImportedComponents from "./components";
import errorTypes from "@/core/Errors";
import ConditionProvider from "@/conditions/ConditionProvider";
import {filterTypes, returnDefaultFilters} from "@/conditions/Defaults";

export const Core = {
  ExpressionBuilder,
  ExpressionNodeGroup,
  ExpressionNode,
  ErrorTypes: errorTypes
};
export const Components = ImportedComponents;

const cp = new ConditionProvider({
  filters: returnDefaultFilters(),
  fields: [
    {
      type: "text",
      name: "fasz",
      displayName: "Fasz"
    },
    {
      type: "number",
      name: "faszhosst",
      displayName: "Fasz Hossz"
    },
    {
      type: "text",
      name: "genyofajta",
      displayName: "Genyo Fajta",
      availableFilters: [filterTypes.EQUALS, filterTypes.NOT_EQUALS],
      availableValues: [
        "szép",
        "csúnya",
        "közép"
      ]
    }
  ]
});

console.log(cp);
console.log(cp.createFieldFilter());