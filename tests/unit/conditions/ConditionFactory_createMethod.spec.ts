import ConditionFactory from "@/conditions/ConditionFactory";
import {
  defaultOperatorLabels,
  defaultOperators,
  returnDefaultFieldTypes,
  returnDefaultOperators
} from "@/conditions/Defaults";
import {mockFields} from "../../utils";
import {ConditionFactoryCondition, ConditionFactoryFieldTypeDefinition} from "@/conditions/Interfaces";

let cp: ConditionFactory;

beforeAll(() => {
  cp = new ConditionFactory({
    operators: returnDefaultOperators(),
    fields: mockFields
      .concat({name: "custom", label: "Custom", type: "text"})
      .concat({name: "custom0", label: "Custom0", type: "customFieldType"}),
    fieldTypes: returnDefaultFieldTypes().concat([
      {
        name: "customFieldType",
        label: "CustomFieldType",
        availableOperators: [defaultOperators.EQUALS]
      }
    ])
  });
});

describe("ConditionFactory - creatFieldFilter method", () => {
  it("Default", () => {

    const textFieldType = returnDefaultFieldTypes().find(ft => ft.name == "text") as ConditionFactoryFieldTypeDefinition;

    const expected: ConditionFactoryCondition = {
      fieldType: textFieldType,
      field: Object.assign(mockFields[0], {operators: textFieldType.availableOperators, choices: undefined}),
      operator: {
        name: defaultOperators.EQUALS,
        label: defaultOperatorLabels[defaultOperators.EQUALS]
      },
      value: null
    };

    const created = cp.create();
    expect(created.operator).toStrictEqual(expected.operator);
    expect(created.fieldType.availableOperators.sort()).toStrictEqual(expected.fieldType.availableOperators.sort());
    expect(created.fieldType.name).toBe(expected.fieldType.name);
    expect(created.field.name).toBe(expected.field.name);
  });

  it("Named - default type", () => {

    const textFieldType = returnDefaultFieldTypes().find(ft => ft.name == "text") as ConditionFactoryFieldTypeDefinition;

    const expected: ConditionFactoryCondition = {
      fieldType: textFieldType,
      field: Object.assign({name: "custom", label: "Custom", type: "text"},
        {operators: textFieldType.availableOperators, choices: undefined}),
      operator: {
        name: defaultOperators.NOT_EQUALS,
        label: defaultOperatorLabels[defaultOperators.NOT_EQUALS]
      },
      value: "hello"
    };

    const created = cp.create("custom", defaultOperators.NOT_EQUALS, "hello");
    expect(created.operator).toStrictEqual(expected.operator);
    expect(created.fieldType.availableOperators.sort()).toStrictEqual(expected.fieldType.availableOperators.sort());
    expect(created.fieldType.name).toBe(expected.fieldType.name);
    expect(created.field.name).toBe(expected.field.name);

  });

  it("Named - custom type", () => {

    const expected: ConditionFactoryCondition = {
      fieldType: {
        name: "customFieldType",
        label: "CustomFieldType",
        availableOperators: [defaultOperators.EQUALS]
      },
      field: {name: "custom0", label: "Custom0", type: "customFieldType",
        operators: [defaultOperators.EQUALS], choices: undefined},
      operator: {
        name: defaultOperators.EQUALS,
        label: defaultOperatorLabels[defaultOperators.EQUALS]
      },
      value: "hello"
    };

    const created = cp.create("custom0", defaultOperators.EQUALS, "hello");
    expect(created.operator).toStrictEqual(expected.operator);
    expect(created.fieldType.availableOperators.sort()).toStrictEqual(expected.fieldType.availableOperators.sort());
    expect(created.fieldType.name).toBe(expected.fieldType.name);
    expect(created.field.name).toBe(expected.field.name);

  });

  it("Undefined operator", () => {
    expect(() => cp.create("custom", "nonExistent", "hello"))
      .toThrow(/[oO]perator .+ does not exist, available options are/);
  });

  it("Undefined field", () => {
    expect(() => cp.create("nonExistent", defaultOperators.EQUALS, "hello"))
      .toThrow(/No such field/);
  });

  it("operator not available for field type", () => {
    expect(() => cp.create("custom0", defaultOperators.NOT_EQUALS, "hello"))
      .toThrow(/is not available for field/);
  });

});