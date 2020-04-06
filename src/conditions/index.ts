import {returnDefaultFieldTypes, returnDefaultOperators} from "@/conditions/Defaults";
import ConditionFactory from "@/conditions/ConditionFactory";
import {defaultFieldTypes, defaultOperators} from "@/conditions/Defaults"

export default {
  ConditionFactory,
  Defaults: {
    returnDefaultOperators,
    returnDefaultFieldTypes,
    defaultFieldTypes,
    defaultOperators
  }
}