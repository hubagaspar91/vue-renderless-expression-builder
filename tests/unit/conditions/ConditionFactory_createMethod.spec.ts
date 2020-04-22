import ConditionFactory from "@/conditions/ConditionFactory";
import {
  defaultFieldTypes,
  defaultOperators,
  returnDefaultFieldTypes,
  returnDefaultOperators
} from "@/conditions/Defaults";
import {mockFields} from "../../utils";
import {ConditionFactoryCondition, ConditionFactoryFieldTypeDefinition} from "@/conditions/Interfaces";

let cf: ConditionFactory;

beforeAll(() => {
  cf = new ConditionFactory({
    operators: returnDefaultOperators(),
    fields: mockFields
      .concat({name: "custom", label: "Custom", type: "text"})
      .concat({name: "custom0", label: "Custom0", type: "customFieldType"}),
    fieldTypes: returnDefaultFieldTypes().concat([
      {
        name: "customFieldType",
        label: "CustomFieldType",
        availableOperators: [defaultOperators.EQUALS]
      },
    ])
  });
});

describe("ConditionFactory - create method", () => {
  it("Default", () => {

    const expected: ConditionFactoryCondition = {
      fieldTypeName: defaultFieldTypes.TEXT,
      fieldName: mockFields[0].name,
      operatorName: defaultOperators.EQUALS,
      value: null
    };

    const created = cf.create();
    expect(created.operatorName).toBe(expected.operatorName);
    expect(created.fieldTypeName).toBe(expected.fieldTypeName);
    expect(created.fieldName).toBe(expected.fieldName);
  });

  it("Named - default type", () => {

    const textFieldType = returnDefaultFieldTypes().find(ft => ft.name == "text") as ConditionFactoryFieldTypeDefinition;

    const expected: ConditionFactoryCondition = {
      fieldTypeName: defaultFieldTypes.TEXT,
      fieldName: "custom",
      operatorName: defaultOperators.NOT_EQUALS,
      value: "hello"
    };

    const created = cf.create("custom", defaultOperators.NOT_EQUALS, "hello");
    expect(created.operatorName).toBe(expected.operatorName);
    expect(created.fieldTypeName).toBe(expected.fieldTypeName);
    expect(created.fieldName).toBe(expected.fieldName);

  });

  it("Named - custom type", () => {

    const expected: ConditionFactoryCondition = {
      fieldTypeName: "customFieldType",
      fieldName: "custom0",
      operatorName: defaultOperators.EQUALS,
      value: "hello"
    };

    const created = cf.create("custom0", defaultOperators.EQUALS, "hello");
    expect(created.operatorName).toBe(expected.operatorName);
    expect(created.fieldTypeName).toBe(expected.fieldTypeName);
    expect(created.fieldName).toBe(expected.fieldName);

  });

  it("Undefined operator", () => {
    expect(() => cf.create("custom", "nonExistent", "hello"))
      .toThrow(/[oO]perator .+ does not exist, available options are/);
  });

  it("Undefined field", () => {
    expect(() => cf.create("nonExistent", defaultOperators.EQUALS, "hello"))
      .toThrow(/No such field/);
  });

  it("operator not available for field type", () => {
    expect(() => cf.create("custom0", defaultOperators.NOT_EQUALS, "hello"))
      .toThrow(/is not available for field/);
  });

  it("tests createAndUpdate method", () => {
    const node = {condition: {fieldName: 0, fieldTypeName: 0, operatorName: 0, value: 0}};
    cf.createAndUpdate(node, "custom0", defaultOperators.EQUALS, "hello");
    expect(node.condition.fieldName).toBe("custom0");
    expect(node.condition.fieldTypeName).toBe("customFieldType");
    expect(node.condition.operatorName).toBe(defaultOperators.EQUALS);
    expect(node.condition.value).toBe("hello");
  })

});