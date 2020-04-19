# Renderless Expression Builder for Vue.js

This is something I needed for a project, where I had to build an expression (or query) builder, with a layout drastically different from the standard query builder interface (such as the [jQuery QueryBuilder](https://querybuilder.js.org/)), but with very similar functionality. This library is a layout-agnostic implementaiton, meaning, that it aims to serve as a core for flexibly creating query builder components with different complexities and specifications.

[Demo implementation (with Bootstrap Vue)](http://devel.gasparhuba.hu/vue-renderless-expression-builder-examples/)  
[Demo code](https://github.com/hubagaspar91/vue-renderless-expression-builder/tree/master/demo)

## What it does:
- Creates and manages the nested structure (nodes and node groups)
- Let's you define a set of available fields for filtering (First Name, Created At, etc.), field types (date, text, number, bool, etc.), and operators (equals, contains, etc.).
- Let's you define a max depth for the query generated by the builder
- Based on the above parameters, creates the actual conditions for the individual expression nodes

## What it does not do:
- Provide any layout implementation

## Installation

```bash
npm install vue-renderless-expression-builder
```

Available named exports are:
- Core - the underlying model objects
- Components - the actual renderless components
- Conditions - the default conditions and conditionFactory class, used internally by the renderless components

## Components

### ExpressionNodeRenderless

Props:
| Prop  | Type  | Description  |
|---|---|---|
| `node` | `Core.ExpressionNode` | node represented by the component |

Available scopedSlots:
| Slot  | Type  | Description  |
|---|---|---|
| `node` | `Core.ExpressionNode` | node object, represented by the component |
| `index` | `number` | index of the current node, in its parent's children array |
| `updateCondition` | `Function(fieldName: string, operatorName: string, value: any)` | calls ConditionFactory.create with the params and updates the condition of the current node |
| `deleteSelf` | `Function` | deletes the current node |
| `conditionFactory` | `ConditionFactory` | condition factory instance |

### ExpressionNodeGroupRenderless
Props:
| Prop  | Type  | Description  |
|---|---|---|
| `node` | Core.ExpressionNodeGroup | node group represented by the component |

Available scopedSlots:
| Slot  | Type  | Description  |
|---|---|---|
| `node` | `Core.ExpressionNodeGroup` | node group object, represented by the component |
| `index` | `number` | index of the current node, in its parent's children array |
| `deleteSelf` | `Function` | deletes the current node |
| `conditionFactory` | `ConditionFactory` | condition factory instance |
| `toggleConnectionType` | `Function` | toggles group's connection type between 'and' and 'or' |
| `addNode` | `Function(condition: Object?)` | adds a node at the end of the childrens array of the group |
| `addGroup` | `Function` | adds a node group at the end of the childrens array of the group |
| `insert` | `Function(node: Core.ExpressionNode(Group), index: number)` | inserts a node or node group at a given index |

### ExpressionBuilderRenderless

Props:
| Prop  | Type  | Description  |
|---|---|---|
| `value` | `Core.ExpressionBuilder?` | ExpressionBuilder instance to be represented by the component |
| `fields` | `ConditionFactoryField[]` (below) | list of user defined fields to be used in the builder |
| `operators` | `ConditionFactoryOperator[]` (below) | a list of operators available in the builder - default: Conditions.returnDefaultOperators |
| `fieldTypes` | `ConditionFactoryFieldTypeDefinition[]` (below) | a list of field types available in the builder - default: Conditions.returnDefaultFieldTypes | 
| `eventHub` | `Vue?` | eventHub, that the builder and nodes use to communicate |

Provided keys ([provide/inject API](https://vuejs.org/v2/api/#provide-inject)):
| Key  | Type  | Description  |
|---|---|---|
| `$__qb_condition_factory__` | `ConditionFactory` | ConditionFactory, that's injected to all ExpressionNodeRenderless and ExpressionNodeGroupRenderless components, but you can inject in the implementations as well |
| `$__qb__event_hub__` | `Vue` | eventHub, that the builder and nodes use to communicate |

## Core

### Core.ExpressionNode

| Member  | Type  | Description  |
|---|---|---|
| `parentNode`  | `Core.ExpressionNodeGroup`  | The node group containing this node  |
| `toJSON`  | `Function`  | Returns a json representation of the current condition object  |
| `fromJSON` (static) | `Function(json: Object)`  |Creates a new Core.ExpressionNode instance from a json representation |
| `condition` | `Object` | Can be any object, however, the conditionFactory creates the condition objects with a specific schema - see below  |

Condition object schema:
```js
{
  fieldName: "string",  // name of the field (fisrtName, dateOfBirth, etc.)
  operatorName: "string",  // name of the operator (equals, contains, etc.)
  fieldTypeName: "string"  // name of the field type (text, date, etc.)
  value: any  // condition value
}
```

### Core.ExpressionNodeGroup
Core.ExpressionNodeGroup constructor params:  
| Param  | Type  | Description  |
|---|---|---|
| `opts` | `Object` | default: {maxDepth: 0, currentDepth: 0, children: [], connectionType: "and"} |
| `parentNode` | `Core.ExpressionNodeGroup` | The node group containing this node |
  
Core.ExpressionNodeGroup members:  
| Member  | Type  | Description  |
|---|---|---|
| `parentNode`  | `Core.ExpressionNodeGroup`  | The node group containing this node  |
| `maxDepth` | `number` | the max depth of the nested structure, defaults to 0 (meaning infinite depth)|
| `currentDepth` | `number` | the depth of the current node group in the current nested strucure |
| `toJSON`  | `Function`  | Recursively creates a json representation of the current node group and its children   |
| `fromJSON` (static)  | `Function(json: Object)`  | reates a new Core.ExpressionNodeGroup object from a json representation |
| `flatten` | `Function` | returns a 1 depth array of arrays, flattening the nested condition, where the elements of each array are conditions of ExpressionNodes and are connected by AND and the inner arrays are connected by OR, so the result can be used for client-side filtering like this: list.filter(elem => flattened.map(group => group.every(condition => validateCondition(condition, elem))).some(groupIsTrue => groupIsTrue)) |

### Core.ExpressionBuilder
Core.ExpressionBuilder constructor params
| Param  | Type  | Description  |
|---|---|---|
| `root` | `Core.ExpressionNodeGroup?` or `Object?` (json representation) | if it's undefined, a new Core.ExpressionNodeGroup is created |
| `errorHandler` | `Function(key: string, msg: string)` | called when an error occurs (like reaching max depth), can be used for notifying the user of errors |
  
Core.ExpressionBuilder members:
| Member  | Type  | Description  |
|---|---|---|
| `root` | `Core.ExpressionNodeGroup` | the root node group of the current expression/query |
| `context` | `Core.ExpressionNodeGroup` | the current context, for which insertion and deletion method calls apply |
| `insert` | `Function(node: Core.ExpressionNode(Group), index: number)` | Inserts a node or node group at a given index in the children array of the context node group. If a node group was inserted, sets it as the new context. Returns the context, for fluent editing |
| `set` | `Function(node: Core.ExpressionNode(Group), index: number)` | Sets a node at a for a given index in the children array of the context node group. If a node group was inserted, sets it as the new context, Returns the context, for fluent editing |
| `delete` | `Function(index: number)` | Deletes a node from a given index in the children array of the context node group. Returns the context, for fluent editing |
| `add` | `Function(node: Core.ExpressionNode(Group))` | Inserts a node or node group at the end of the children array of the context node group. If a node group was inserted, sets it as the new context, Returns the context, for fluent editing |
| `contextUp` | `Function` | sets the parentNode of the current context as the new context |
| `contextToRoot` | `Function` | sets the root as the new context |
| `contextTo` | `Function(path: number[])` | sets a node group by a path from the root, as the new context ie. the first child of the root node can be set as context by calling contextTo([0]) |
| `flatten` | `Function` | Calls the faltten method of the root Core.ExprssionNodeGroup |
| `toJSON`  | `Function`  | Calls the toJSON method of the root Core.ExpressionNodeGroup  |  

## Conditions

### ConditionFactory

ConditionFactory constructor opts

```ts
interface ConditionFactoryOpts {
  fields: ConditionFactoryField[];
  operators?: ConditionFactoryOperator[];
  fieldTypes?: ConditionFactoryFieldTypeDefinition[];
}
```

| Param  | Type  | Description  |
|---|---|---|
| `fields` | `ConditionFactoryField[]` (below) | list of user defined fields to be used with the conditionFactory |
| `operators` | `ConditionFactoryOperator[]` (below) | a list of operators available in the conditionFactory - default: returnDefaultOperators |
| `fieldTypes` | `ConditionFactoryFieldTypeDefinition[]` (below) | a list of field types available in the conditionFactory - default: returnDefaultFieldTypes |

ConditionFactory members:
| Member  | Type  | Description  |
|---|---|---|
| `fields` | `ConditionFactoryField[]` | fields provided in the constructors |
| `operators` | `ConditionFactoryOperator[]` | operators provided in the constructor |
| `fieldTypes` | `ConditionFactoryFieldTypeDefinition[]` | fieldTypes provided in the constructor | 
| `create` | `Function(fieldName: string, operatorName: string, value: any)` | returns: `ConditionFactoryCondition` (below) |

```ts
interface ConditionFactoryField {
  type: string;
  name: string;
  label: string;
  operators?: string[];
  choices?: any[];  // used, if select-type type is used
}

interface ConditionFactoryOperator {
  name: string;
  label: string;  // operator display name
}

interface ConditionFactoryFieldTypeDefinition {
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
```

### Defaults

`defaultFieldTypes`
```js
const defaultFieldTypes = {
  TEXT: "text",
  DATE: "date",
  NUMBER: "number",
  BOOLEAN: "boolean",
  CHOICE: "radio",
  MULTIPLE_CHOICE: "multipleChoice",
  SELECT: "select"
};
```

`defaultOperators`
```js
const defaultOperators = {
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  GREATER_THAN: "graterThan",
  LOWER_THAN: "lowerThan",
  IN: "in",
  NOT_IN: "notIn",
  STARTS_WITH: "startsWith",
  NOT_STARTS_WITH: "notStartsWith",
  ENDS_WITH: "endsWith",
  NOT_ENDS_WITH: "notEndsWith",
  IS_EMPTY: "isEmpty",
  NOT_IS_EMPTY: "notIsEmpty",
  IS_NULL: "isNull",
  NOT_IS_NULL: "notIsNull",
  IS_ONE_OF: "isOneOf",
  NOT_IS_ONE_OF: "notIsOneOf"
};
```

`returnDefaultFieldTypes`
```js
[{
    "name": "text",
    "availableOperators": ["equals", "notEquals", "contains", "notContains", "isEmpty", "notIsEmpty", "endsWith", "notEndsWith", "startsWith", "notStartsWith", "isNull", "notIsNull", "in", "notIn"]
}, {
    "name": "date",
    "availableOperators": ["equals", "notEquals", "isNull", "notIsNull", "graterThan", "lowerThan"]
}, {
    "name": "number",
    "availableOperators": ["equals", "notEquals", "isNull", "notIsNull", "graterThan", "lowerThan"]
}, {
    "name": "boolean",
    "availableOperators": ["equals"]
}, {
    "name": "radio",
    "availableOperators": ["equals", "notEquals"]
}, {
    "name": "multipleChoice",
    "availableOperators": ["in", "notIn"]
}, {
    "name": "select",
    "availableOperators": ["equals", "notEquals"]
}]
```

`returnDefaultOperators`
```js
[{
    "name": "equals",
    "label": "equals"
}, {
    "name": "notEquals",
    "label": "not equals"
}, {
    "name": "contains",
    "label": "contains"
}, {
    "name": "notContains",
    "label": "not contains"
}, {
    "name": "graterThan",
    "label": "greater than"
}, {
    "name": "lowerThan",
    "label": "lower than"
}, {
    "name": "in",
    "label": "in"
}, {
    "name": "notIn",
    "label": "not in"
}, {
    "name": "startsWith",
    "label": "starts with"
}, {
    "name": "notStartsWith",
    "label": "doesn't start with"
}, {
    "name": "endsWith",
    "label": "ends with"
}, {
    "name": "notEndsWith",
    "label": "doesn't end with"
}, {
    "name": "isEmpty",
    "label": "is empty"
}, {
    "name": "notIsEmpty",
    "label": "is not empty"
}, {
    "name": "isNull",
    "label": "is null"
}, {
    "name": "notIsNull",
    "label": "is not null"
}, {
    "name": "isOneOf"
}, {
    "name": "notIsOneOf"
}]
```
