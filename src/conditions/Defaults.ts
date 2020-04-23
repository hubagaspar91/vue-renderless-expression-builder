import {ConditionFactoryFieldTypeDefinition, ConditionFactoryOperator} from "@/conditions/Interfaces";

/**
 * Default filed types available in the expression builder
 */
export const defaultFieldTypes = {
  TEXT: "text",
  DATE: "date",
  NUMBER: "number",
  BOOLEAN: "boolean",
  CHOICE: "radio",
  MULTIPLE_CHOICE: "multipleChoice",
  SELECT: "select"
};

/**
 * Labels (display names) for the default field types
 */
export const defaultFieldTypeLabels: Record<string, string> = {
  [defaultFieldTypes.TEXT]: "text",
  [defaultFieldTypes.DATE]: "date",
  [defaultFieldTypes.NUMBER]: "number",
  [defaultFieldTypes.BOOLEAN]: "boolean",
  [defaultFieldTypes.CHOICE]: "radio",
  [defaultFieldTypes.MULTIPLE_CHOICE]: "multiple choice",
  [defaultFieldTypes.SELECT]: "select"
};

/**
 * Kind of logical operators available in the expression builder, their place in a condition
 * Field {operator} conditionValue
 */
export const defaultOperators: Record<string, string> = {
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
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

/**
 * Lists of default available operators for every default field type
 * Can be extended from input params
 */
export const defaultAvailableOperators: Record<string, string[]> = {
  [defaultFieldTypes.TEXT]: [
    defaultOperators.EQUALS,
    defaultOperators.NOT_EQUALS,
    defaultOperators.IS_EMPTY,
    defaultOperators.NOT_IS_EMPTY,
    defaultOperators.ENDS_WITH,
    defaultOperators.NOT_ENDS_WITH,
    defaultOperators.STARTS_WITH,
    defaultOperators.NOT_STARTS_WITH,
    defaultOperators.IS_NULL,
    defaultOperators.NOT_IS_NULL,
    defaultOperators.IN,
    defaultOperators.NOT_IN
  ],
  [defaultFieldTypes.DATE]: [
    defaultOperators.EQUALS,
    defaultOperators.NOT_EQUALS,
    defaultOperators.IS_NULL,
    defaultOperators.NOT_IS_NULL,
    defaultOperators.GREATER_THAN,
    defaultOperators.LOWER_THAN
  ],
  [defaultFieldTypes.NUMBER]: [
    defaultOperators.EQUALS,
    defaultOperators.NOT_EQUALS,
    defaultOperators.IS_NULL,
    defaultOperators.NOT_IS_NULL,
    defaultOperators.GREATER_THAN,
    defaultOperators.LOWER_THAN
  ],
  [defaultFieldTypes.BOOLEAN]: [
    defaultOperators.EQUALS
  ],
  [defaultFieldTypes.CHOICE]: [
    defaultOperators.EQUALS,
    defaultOperators.NOT_EQUALS
  ],
  [defaultFieldTypes.MULTIPLE_CHOICE]: [
    defaultOperators.IN,
    defaultOperators.NOT_IN
  ],
  [defaultFieldTypes.SELECT]: [
    defaultOperators.EQUALS,
    defaultOperators.NOT_EQUALS
  ]
};

/**
 * Labels (display names) for the default operators
 */
export const defaultOperatorLabels: Record<string, string> = {
  [defaultOperators.EQUALS]: "equals",
  [defaultOperators.NOT_EQUALS]: "not equals",
  [defaultOperators.GREATER_THAN]: "greater than",
  [defaultOperators.LOWER_THAN]: "lower than",
  [defaultOperators.IN]: "in",
  [defaultOperators.NOT_IN]: "not in",
  [defaultOperators.STARTS_WITH]: "starts with",
  [defaultOperators.NOT_STARTS_WITH]: "doesn't start with",
  [defaultOperators.ENDS_WITH]: "ends with",
  [defaultOperators.NOT_ENDS_WITH]: "doesn't end with",
  [defaultOperators.IS_EMPTY]: "is empty",
  [defaultOperators.NOT_IS_EMPTY]: "is not empty",
  [defaultOperators.IS_NULL]: "is null",
  [defaultOperators.NOT_IS_NULL]: "is not null"
};

/**
 * Default field types that require a select-type render implementation
 */
export const selectTypeFields = [
  defaultFieldTypes.SELECT,
  defaultFieldTypes.MULTIPLE_CHOICE,
  defaultFieldTypes.CHOICE
];

/**
 * Factory fn, returning the default operators with their default labels
 */
export const returnDefaultOperators = (): ConditionFactoryOperator[] => Object.values(defaultOperators).map(t => ({
  name: t,
  label: defaultOperatorLabels[t]
}));

/**
 * Return the default field type objects
 */
export const returnDefaultFieldTypes = (): ConditionFactoryFieldTypeDefinition[] => Object.values(defaultFieldTypes).map(ft => ({
  name: ft,
  label: defaultFieldTypeLabels[ft],
  availableOperators: defaultAvailableOperators[ft]
}));

Object.freeze(defaultFieldTypes);
Object.freeze(defaultFieldTypeLabels);
Object.freeze(defaultOperators);
Object.freeze(defaultOperatorLabels);
Object.freeze(defaultAvailableOperators);
Object.keys(defaultAvailableOperators).forEach(key => {
  Object.freeze(defaultAvailableOperators[key]);
});
Object.freeze(selectTypeFields);

