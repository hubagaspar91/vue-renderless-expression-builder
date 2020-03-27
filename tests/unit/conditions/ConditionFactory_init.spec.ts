import ConditionFactory from "@/conditions/ConditionFactory";
import {mockFields} from "../../utils";
import {
  defaultAvailableOperators,
  defaultOperators,
  returnDefaultFieldTypes,
  returnDefaultOperators
} from "@/conditions/Defaults";
import {ConditionFactoryFieldTypeDefinition} from "@/conditions/Interfaces";

describe("ConditionProvider - initialization", () => {
  it("With 1 simple field, and default operators", () => {
    const cp = new ConditionFactory({
      fields: mockFields
    });
    expect(cp.operators).toStrictEqual(returnDefaultOperators());
    expect(cp.fields).toHaveLength(1);
    expect((cp.fields[0].operators as string[]).sort())
      .toStrictEqual(defaultAvailableOperators[mockFields[0].type].sort());
  });

  it("With 1 simple, and another custom field, implicitly defined", () => {
    const fieldWithCustomType =
      {name: "test0", type: "custom", label: "Custom", operators: [defaultOperators.EQUALS, defaultOperators.NOT_EQUALS]};
    const cp = new ConditionFactory({
      fields: mockFields.concat(fieldWithCustomType),
      operators: returnDefaultOperators()
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

  it("With 1 simple, and another custom field, explicitly defined", () => {
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
});