import {ConditionProviderFilter, ConditionProviderFilterDefinition} from "@/conditions/Interfaces";

export const fieldTypes = {
  TEXT: "text",
  DATE: "date",
  NUMBER: "number",
  BOOLEAN: "boolean"
};

export const filterTypes = {
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  GREATER_THAN: "graterThan",
  LOWER_THAN: "lowerThan",
  IN: "in",
  NOT_IN: "notIn",
  STARTS_WITH: "startsWith",
  NOT_STARTS_WITH: "notStartsWith",
  ENDS_WITH: "endsWith",
  NOT_ENDS_WITH: "notEndsWith",
  IS_EMPTY: "isEmpty",
  NOT_IS_EMPTY: "notIsEmpty",
  IS_NULL: "isNull",
  NOT_IS_NULL: "notIsNull"
};

export const defaultAvailableFilters = {
  [fieldTypes.TEXT]: [
    filterTypes.CONTAINS,
    filterTypes.NOT_CONTAINS,
    filterTypes.EQUALS,
    filterTypes.NOT_EQUALS,
    filterTypes.IS_EMPTY,
    filterTypes.NOT_IS_EMPTY,
    filterTypes.ENDS_WITH,
    filterTypes.NOT_ENDS_WITH,
    filterTypes.STARTS_WITH,
    filterTypes.NOT_STARTS_WITH,
    filterTypes.IS_NULL,
    filterTypes.NOT_IS_NULL,
    filterTypes.IN,
    filterTypes.NOT_IN
  ],
  [fieldTypes.DATE]: [
    filterTypes.EQUALS,
    filterTypes.NOT_EQUALS,
    filterTypes.IS_NULL,
    filterTypes.NOT_IS_NULL,
    filterTypes.GREATER_THAN,
    filterTypes.LOWER_THAN
  ],
  [fieldTypes.NUMBER]: [
    filterTypes.EQUALS,
    filterTypes.NOT_EQUALS,
    filterTypes.IS_NULL,
    filterTypes.NOT_IS_NULL,
    filterTypes.GREATER_THAN,
    filterTypes.LOWER_THAN
  ],
  [fieldTypes.BOOLEAN]: [
    filterTypes.EQUALS,
    filterTypes.NOT_EQUALS,
    filterTypes.IS_NULL,
    filterTypes.NOT_IS_NULL
  ],
};

export const returnDefaultFilters = (): ConditionProviderFilterDefinition[] => Object.values(filterTypes).map(t => ({
  name: t,
  availableFilters: defaultAvailableFilters[t]
}));