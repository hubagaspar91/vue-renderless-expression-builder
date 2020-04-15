export interface ConditionFactoryField {
  type: string;
  name: string;
  label: string;
  operators?: string[];
  choices?: any[];  // used, if select-type type is used
}

export interface ConditionFactoryOperator {
  name: string;
  label: string;  // operator display name
}

export interface ConditionFactoryFieldTypeDefinition {
  name: string;
  availableOperators: string[];  // operators available by default for the field type
  label: string;  // display name for the field type
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