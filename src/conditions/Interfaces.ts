export interface ConditionProviderField {
  type: string;
  name: string;
  displayName: string;
  availableFilters?: string[];
  availableValues?: any[]  // used for selection, if IN and NOT_IN are enabled
}

export interface ConditionProviderFilterDefinition {
  name: string,
  availableFilters: string[]
}

export interface ConditionProviderFilterValue {
  fieldName: string;
  filterValue: string;
}

export interface ConditionProviderFilter {
  name: string;
  value: ConditionProviderFilterValue
}

export interface ConditionProviderOpts {
  fields: ConditionProviderField[];
  filters: ConditionProviderFilterDefinition[]
}