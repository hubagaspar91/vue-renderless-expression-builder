import {
  ConditionFactoryField, ConditionFactoryFieldTypeDefinition,
  ConditionFactoryCondition,
  ConditionFactoryOperator,
  ConditionFactoryOpts
} from "@/conditions/Interfaces";
import {
  defaultAvailableOperators,
  returnDefaultFieldTypes,
  returnDefaultOperators,
  selectTypeFields
} from "@/conditions/Defaults";


export default class ConditionFactory {
  private readonly _operators: ConditionFactoryOperator[] = returnDefaultOperators();
  private _fields: ConditionFactoryField[] = [];
  private readonly _fieldTypes: ConditionFactoryFieldTypeDefinition[] = returnDefaultFieldTypes();

  constructor(opts: ConditionFactoryOpts) {
    this._operators = opts.operators || this._operators;
    this._fieldTypes = opts.fieldTypes || this._fieldTypes;

    if (this._operators.length == 0)
      throw new Error("ConditionFactory initialized with 0 operators.");
    if (opts.fields.length == 0)
      throw new Error("ConditionFactory initialized with 0 fields.");
    if (this._fieldTypes.length == 0)
      throw new Error("ConditionFactory initialized with 0 fieldTypes.");
    this._processOpts(opts);
  }

  get fields() {
    return this._fields;
  }

  get operators() {
    return this._operators;
  }

  get fieldTypes() {
    return this._fieldTypes;
  }

  create(fieldName: string = this._fields[0].name,
         operatorName: string = (this._fields[0].operators as string[])[0],
         value: any = null): ConditionFactoryCondition {

    const operator = this._operators.find(f => f.name == operatorName);
    if (operator) {

      const field = this._fields.find(f => f.name == fieldName);
      if (field == undefined)
        throw new Error("No such field " + fieldName);

      if (!(field.operators as string[]).includes(operatorName))
        throw new Error(`Operator ${operatorName} is not available for field ${field.name}`);

      const fieldType = this.fieldTypes.find(ft => ft.name == field.type);
      if (!fieldType)
        throw new Error(`Field type ${field.type} is not defined on the instance. 
          Options are: ${this.fieldTypes.map(ft => ft.name).join(", ")}`);

      return {
        operatorName: operator.name,
        fieldName: field.name,
        fieldTypeName: fieldType.name,
        value
      }

    }
    throw new Error(`Operator type ${operatorName}, does not exist, available options are 
      ${this._operators.map(o => o.name).join(", ")}`);
  }

  private _processOpts(opts: ConditionFactoryOpts) {
    this._fields = opts.fields.map(field => {
      const innerField: ConditionFactoryField = {
        type: field.type,
        name: field.name,
        label: field.label,
        choices: field.choices,
        operators: field.operators
      };

      if (!this.fieldTypes.find(ft => ft.name == innerField.type))
        throw new Error(`Field ${innerField.name} has undefined type ${innerField.type}`);

      if (selectTypeFields.includes(innerField.type) && (!innerField.choices || innerField.choices.length == 0))
        throw new Error(`Need to specify available choices for field ${field.name} of type ${field.type}`);

      // setting operators, if it was provided null or empty
      if (!innerField.operators || innerField.operators.length == 0) {

        // finding the field type object, for the type of the field
        const fieldTypeObject = this._fieldTypes.find(t => t.name == innerField.type);

        if (!fieldTypeObject)
          throw new Error(`Field type ${innerField.type} is not added to the instance`);

        // populating the field's operators from the default, defined in the fieldTypeDefinition
        innerField.operators = this._operators.filter(operator =>
          fieldTypeObject.availableOperators.includes(operator.name)).map(o => o.name);

        if ((innerField.operators as string[]).length == 0)
          throw new Error(`As per the settings your provided, field ${field.name} would not have any available operators.`);

      }

      return innerField;
    })
  }
}