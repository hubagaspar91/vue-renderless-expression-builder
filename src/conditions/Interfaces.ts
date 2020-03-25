export interface ConditionProviderField {
  type: string;
  name: string;
  displayName: string;
  availableFilters?: string[];
  availableValues?: any[];  // used, if select-type render is used
}

export interface ConditionProviderFilterDefinition {
  name: string; // filter name
  renderComponent?: string;  // custom component name string, used fo rendering the filter
}

export interface ConditionProviderFieldTypeDefinition {
  name: string;
  defaultAvailableFilters: string[];
}

export interface ConditionProviderFilterValue {
  fieldName: string;
  filterValue: string;
}

export interface ConditionProviderFilter {
  name: string;
  value: ConditionProviderFilterValue;
}

export interface ConditionProviderOpts {
  fields: ConditionProviderField[];
  filters: ConditionProviderFilterDefinition[];
  customFieldTypes?: ConditionProviderFieldTypeDefinition[];
}