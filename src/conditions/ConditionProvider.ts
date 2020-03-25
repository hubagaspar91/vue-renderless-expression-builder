import {
  ConditionProviderField,
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
    this._fields = opts.fields.map(field => {
      const innerField: ConditionProviderField = {
        type: field.type,
        name: field.name,
        displayName: field.displayName,
        availableValues: field.availableValues,
        availableFilters: []
      };

      // check if all availableFilters are added to filter names
      if (field.availableFilters) {
        (field.availableFilters as string[]).forEach(af => {
          if (!filterNames.includes(af))
            throw new Error(`Filter ${af} is defined as available for field 
          ${field.name}, but was not added in the constructor param.`);
          (innerField.availableFilters as string[]).push(af);
        });
      }

      // setting availableFilters, if it was provided null or empty
      if (!field.availableFilters || field.availableFilters.length == 0) {
        innerField.availableFilters = filterNames.filter(t =>
          defaultAvailableFilters[innerField.type] && defaultAvailableFilters[innerField.type].includes(t));
        if (innerField.availableFilters.length == 0)
          throw new Error(`As per the settings your provided, field ${field.name} would not have any available filters.`);
      }

      return innerField;
    })
  }
}