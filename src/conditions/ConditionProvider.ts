import {
  ConditionProviderField, ConditionProviderFieldTypeDefinition,
  ConditionProviderFilter,
  ConditionProviderFilterDefinition,
  ConditionProviderOpts
} from "@/conditions/Interfaces";
import {defaultAvailableFilters, returnDefaultFilters} from "@/conditions/Defaults";


export default class ConditionProvider {
  private _filters: ConditionProviderFilterDefinition[] = returnDefaultFilters();
  private _fields: ConditionProviderField[] = [];

  constructor(opts: ConditionProviderOpts) {
    if (opts.filters.length == 0)
      throw new Error("ConditionProvider initialized with 0 filters.");
    if (opts.fields.length == 0)
      throw new Error("ConditionProvider initialized with 0 fields.");
    this._processOpts(opts);
  }

  get fields() {
    return this._fields;
  }

  get filters() {
    return this._filters;
  }

  createFieldFilter(fieldName: string = this._fields[0].name,
                    filterType: string = (this._fields[0].availableFilters as string[])[0],
                    value: any = null): ConditionProviderFilter {
    const filterNames = this._filters.map(f => f.name);
    if (filterNames.includes(filterType)) {
      const field = this._fields.find(f => f.name == fieldName);
      if (field == undefined) throw new Error("No such field " + fieldName);
      return {
        name: filterType,
        value: {
          fieldName: field.name,
          filterValue: value
        }
      }
    }
    throw new Error(`Filter type ${filterType}, does not exist, provided options are ${filterNames.join(", ")}`);
  }

  private _processOpts(opts: ConditionProviderOpts) {
    this._filters = JSON.parse(JSON.stringify(opts.filters));
    const filterNames = this._filters.map(f => f.name);
    const customFieldNames = opts.customFieldTypes ? opts.customFieldTypes.map(t => t.name) : [];

    this._fields = opts.fields.map(field => {
      const innerField: ConditionProviderField = {
        type: field.type,
        name: field.name,
        displayName: field.displayName,
        availableValues: field.availableValues,
        availableFilters: []
      };

      // setting availableFilters, if it was provided null or empty
      if (!field.availableFilters || field.availableFilters.length == 0) {

        innerField.availableFilters = filterNames.filter(filterName => {
          // if filter is of a default filter type
          if (defaultAvailableFilters[innerField.type])

            // return true, if defaultAvailableFilter for the default filed type include it
            return defaultAvailableFilters[innerField.type].includes(filterName);

          // if the current field is of custom field type defined on the instance
          else if (opts.customFieldTypes && customFieldNames.includes(innerField.type))

            // return true, if the defaultAvailableFields of the customFieldType contain it
            return (opts.customFieldTypes.find(t => t.name) as ConditionProviderFieldTypeDefinition)
              .defaultAvailableFilters.includes(filterName);

          return false;
        });

        if (innerField.availableFilters.length == 0)
          throw new Error(`As per the settings your provided, field ${field.name} would not have any available filters.`);
      }

      return innerField;
    })
  }
}