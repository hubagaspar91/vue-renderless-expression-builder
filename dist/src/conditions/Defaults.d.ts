import { ConditionFactoryFieldTypeDefinition, ConditionFactoryOperator } from "@/conditions/Interfaces";
/**
 * Default filed types available in the expression builder
 */
export declare const defaultFieldTypes: {
    TEXT: string;
    DATE: string;
    NUMBER: string;
    BOOLEAN: string;
    CHOICE: string;
    MULTIPLE_CHOICE: string;
    SELECT: string;
};
/**
 * Labels (display names) for the default field types
 */
export declare const defaultFieldTypeLabels: Record<string, string>;
/**
 * Kind of logical operators available in the expression builder, their place in a condition
 * Field {operator} conditionValue
 */
export declare const defaultOperators: Record<string, string>;
/**
 * Lists of default available operators for every default field type
 * Can be extended from input params
 */
export declare const defaultAvailableOperators: Record<string, string[]>;
/**
 * Labels (display names) for the default operators
 */
export declare const defaultOperatorLabels: Record<string, string>;
/**
 * Default field types that require a select-type render implementation
 */
export declare const selectTypeFields: string[];
/**
 * Factory fn, returning the default operators with their default labels
 */
export declare const returnDefaultOperators: () => ConditionFactoryOperator[];
/**
 * Return the default field type objects
 */
export declare const returnDefaultFieldTypes: () => ConditionFactoryFieldTypeDefinition[];
