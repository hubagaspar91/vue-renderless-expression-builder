import ConditionFactory from "@/conditions/ConditionFactory";
import {mockFields} from "../../utils";
import {
  defaultAvailableOperators, defaultFieldTypes,
  defaultOperators,
  returnDefaultFieldTypes,
  returnDefaultOperators, selectTypeFields
} from "@/conditions/Defaults";
import {ConditionFactoryField, ConditionFactoryFieldTypeDefinition} from "@/conditions/Interfaces";

describe("ConditionFactory - initialization", () => {
  it("With 1 simple field, and default operators", () => {
    const cp = new ConditionFactory({
      fields: mockFields
    });
    expect(cp.operators).toStrictEqual(returnDefaultOperators());
    expect(cp.fields).toHaveLength(1);
    const defaultAvailableOperatorsCopy = Object.assign([], defaultAvailableOperators[mockFields[0].type]);
    expect((cp.fields[0].operators as string[]).sort())
      .toStrictEqual(defaultAvailableOperatorsCopy.sort());
  });

  it("With 1 simple, and another custom field", () => {
    const fieldWithCustomType = {name: "test0", type: "custom", label: "Custom"};

    const customFieldType: ConditionFactoryFieldTypeDefinition = {
      name: "custom",
      label: "Custom",
      availableOperators: [defaultOperators.EQUALS, defaultOperators.NOT_EQUALS]
    };

    const cp = new ConditionFactory({
      fields: mockFields.concat(fieldWithCustomType),
      fieldTypes: returnDefaultFieldTypes().concat([customFieldType])
    });

    expect(cp.operators).toStrictEqual(returnDefaultOperators());
    expect(cp.fields).toHaveLength(2);
    expect((cp.fields[1].name)).toBe(fieldWithCustomType.name);
    expect((cp.fields[1].label)).toBe(fieldWithCustomType.label);
    expect((cp.fields[1].type)).toBe(fieldWithCustomType.type);
    expect((cp.fields[1].operators as string[])).toHaveLength(2);
    expect((cp.fields[1].operators as string[])).toContain(defaultOperators.EQUALS);
    expect((cp.fields[1].operators as string[])).toContain(defaultOperators.NOT_EQUALS);
  });

  it("with 1 simple field with overwritten operators", () => {
    const fields = JSON.parse(JSON.stringify(mockFields));
    fields[0].operators = [defaultOperators.EQUALS];
    const cp = new ConditionFactory({fields});
    expect(cp.fields).toHaveLength(1);
    expect(cp.fields[0].operators).toHaveLength(1);
    expect((cp.fields[0].operators as Array<String>)[0]).toBe(defaultOperators.EQUALS);
  });

  it("Without operators", () => {
    expect(() =>
      new ConditionFactory({fields: mockFields, operators: []}))
      .toThrow(/ConditionFactory initialized with 0 operators/);
  });

  it("Without fields", () => {
    expect(() =>
      new ConditionFactory({fields: [], operators: returnDefaultOperators()}))
      .toThrow(/ConditionFactory initialized with 0 fields/);
  });

  it("Without fieldTypes", () => {
    expect(() =>
      new ConditionFactory({fieldTypes: [], fields: mockFields, operators: returnDefaultOperators()}))
      .toThrow(/ConditionFactory initialized with 0 fieldTypes/);
  });

  it("With a field that has no available operators", () => {
    const fieldWithCustomType =
      {name: "test0", type: "custom", label: "Custom"};

    const customFieldType: ConditionFactoryFieldTypeDefinition = {
      name: "custom",
      label: "Custom",
      availableOperators: ["custom", "filters"],
    };

    expect(() => new ConditionFactory({
      fields: mockFields.concat(fieldWithCustomType),
      fieldTypes: returnDefaultFieldTypes().concat([customFieldType])
    })).toThrow(/would not have any available operators/);

  });

  it("With a field with undefined filedType", () => {
    const fieldWithCustomType =
      {name: "test0", type: "custom", label: "Custom"};


    expect(() => new ConditionFactory({
      fields: mockFields.concat(fieldWithCustomType)
    })).toThrow(/Field test0 has undefined type custom/);

  });

  it("With a select-type field, that has no choices", () => {
    const selectTypeField: ConditionFactoryField = {
      name: "selectTypeField",
      label: "STF",
      type: defaultFieldTypes.SELECT
    };
    expect(() => new ConditionFactory({
      fields: mockFields.concat([selectTypeField])
    })).toThrow(/Need to specify available choices/);
  });

  it("With a select-type field, that has zero choices", () => {
    const selectTypeField: ConditionFactoryField = {
      name: "selectTypeField",
      label: "STF",
      type: defaultFieldTypes.SELECT,
      choices: []
    };
    expect(() => new ConditionFactory({
      fields: mockFields.concat([selectTypeField])
    })).toThrow(/Need to specify available choices/);
  })
});