export interface ConditionFactoryField {
    type: string;
    name: string;
    label: string;
    operators?: string[];
    choices?: any[];
}
export interface ConditionFactoryOperator {
    name: string;
    label: string;
}
export interface ConditionFactoryFieldTypeDefinition {
    name: string;
    availableOperators: string[];
    label: string;
}
export interface ConditionFactoryCondition {
    fieldName: string;
    fieldTypeName: string;
    operatorName: string;
    value: any;
}
export interface ConditionFactoryOpts {
    fields: ConditionFactoryField[];
    operators?: ConditionFactoryOperator[];
    fieldTypes?: ConditionFactoryFieldTypeDefinition[];
}
