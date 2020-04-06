# Renderless Expression Builder for Vue.js

This is something I needed for a project, where I had to build an expression (or query) builder, with a layout drastically different from the standard query builder interface (such as the [jQuery QueryBuilder](https://querybuilder.js.org/)), but with very similar functionality. This library is a layout-agnostic implementaiton, meaning, that it aims to serve as a core for flexibly creating query builder components with different complexities and specifications.

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

## Example implementation
The working expression builder comprises of 3 components:
- ExpressionNode (building on ExpressionNodeRenderless, from the lib) - representing one condition
- ExpressionNodeGroup (building on ExpressionNodeGroupRenderless, from the lib) - representing a group of expression nodes, connected by either 'and' or 'or'
- ExpressionBuilder (building on ExpressionBuilderRenderless, from the lib) - Manages the nested structure, inserts, deletes nodes, injects the dependencies into its child nodes and node groups

### ExpressionNode

Core.ExpressionNode members:

| Member  | Type  | Description  |
|---|---|---|
| parentNode  | Core.ExpressionNodeGroup  | The node group containing this node  |
| toJSON  | function  | Returns a json representation of the current condition object  |
| fromJSON (static)  | function  |Creates a new Core.ExpressionNode instance from a json representation |
| condition |Object  | Can be any object, however, the conditionFactory creates the condition objects with a specific schema - see below  |

Condition object schema:
```js

{
  field: {
    type: string,
    name: string,
    label: string,
    operators?: string[],
    choices?: any[]  // used, if select-type type is used
  },
  fieldType: {
    name: string,
    availableOperators: string[],  // operators available by default for the field type
    label: string,  // display name for the field type
  },
  operator: {
    name: string,
    label: string
  }
  value: any;
}
```
#### Sample component implementation

```vue
<template>
    <expression-node-renderless :node="node" v-slot="{
     node,  // the current node
     index,  // the index of this node amongst its parent's children
     updateCondition,  // function, updates the condition of the current node,
     // takes params: field, operator, value ('firstName', 'startsWith', 'Jo')
     deleteSelf,  // deletes the current node
     conditionFactory  // it stores the defined fields, fieldTypes and operators,
     // and creates new conditions with its create method - injected by the parent ExpressionBuilderRenderless
   }">
        <div class="expression-node">
            <!-- Choosing the field from the ones provided when initialized the ExpressionBuilder -->
            <label for="field">Field</label>
            <select name="field" id="field" v-model="selectedField">
                <option v-for="field in conditionFactory.fields" :value="field">
                    {{field.label}}
                </option>
            </select>

            <!-- Choosing an operator from the ones that are available for the chosen field -->
            <label for="operator">Operator</label>
            <select name="operator" id="operator" v-model="selectedOperator">
                <option v-for="operator in selectedField.operators" :value="operator">
                    {{operator.label}}
                </option>
            </select>

            <!-- Providing the actual filter value for the current condition,
            this can be a custom component in case of different field types - ie a date picker for field type 'date' -->
            <label for="value">Value</label>
            <input type="text" id="value" v-model="value">

            <!-- Ideally, saving should happen automatically,
            this is just to showcase the usage of updateCondition, which simply calls conditionFactory.create -->
            <button @click="updateCondition(selectedField.name, selectedOperator.name, value)">Save</button>
        </div>
    </expression-node-renderless>
</template>
<script>
  import {Components, Core} from "vue-renderless-expression-builder";
  const {ExpressionNodeRenderless} = Components;

  export default {
    name: "ExpressionNode",
    components: {
      ExpressionNodeRenderless
    },
    props: {
      node: {
        // The model for the node
        type: Core.ExpressionNode,
        required: true
      }
    },
    data() {
      return {
        selectedField: null,
        selectedOperator: null,
        value: null
      }
    },
    watch: {
      selectedField() {
        this.selectedOperator = this.value = null;
      }
    }
  }
</script>
```

### ExpressionNodeGroup
Core.ExpressionNodeGroup constructor params:  
- opts:
  - type: Object
  - default: {maxDepth: 0, currentDepth: 0, children: [], connectionType: connectionTypes.AND}
- parentNode (optional)
  - type: core.ExpressionNodeGroup
  - desc: its parent node group, undefined if it is the root  
  
Core.ExpressionNodeGroup members:  
| Member  | Type  | Description  |
|---|---|---|
| parentNode  | Core.ExpressionNodeGroup  | The node group containing this node  |
| maxDepth | number | the max depth of the nested structure, defaults to 0 (meaning infinite depth)|
|currentDepth | number | the depth of the current node group in the current nested strucure |
| toJSON  | function  | Recursively creates a json representation of the current node group and its children   |
| fromJSON (static)  | function  |Creates a new Core.ExpressionNodeGroup object from a json representation |
| flatten | function | returns a 1 depth array of arrays, flattening the nested condition, Where the elements of each array are connected by AND and the inner arrays are connected by OR, so the result can be used for client-side filtering like this: flattened.some(flattened.map(group => group.every(validateNode)), n => n) |

#### Sample component implementation

```vue
<template>
   <expression-node-group-renderless :node="node" v-slot="{
     node,  // the current node (node group in this case)
     index,  // the index of this node amongst its parent's children, if it is the root, returns -1
     deleteSelf,  // deletes the current node group with all its children
     toggleConnectionType,  // toggles between 'and' and 'or', or 'all', and 'any'
     insert,  // inserts a new node, at a given index
     addNode,  // pushes a node to the end of the children list of this node group
     addGroup,  // pushes a node group to the end of the children list of this node group
     conditionFactory  // it stores the defined fields, fieldTypes and operators, and creates new conditions with its create method
   }">
       <div class="expression-node-group">
           <!-- The connection type property of the node group determines, whether all or any of their children have to eval to true, in order for the group to eval to true -->
           <div class="toggle-ct" @click="toggleConnectionType">
               <span :class="{selected: node.connectionType === 'and'}">AND</span>
               <span :class="{selected: node.connectionType === 'or'}">OR</span>
           </div>
           <ul>
               <li v-for="child in node.children">
                   <!-- The ExpressionNodeGroup component has to be recursive by nature -->
                   <expression-node-group v-if="child.children" :node="child"></expression-node-group>
                   <expression-node v-else :node="child"></expression-node>
               </li>
           </ul>
       </div>
   </expression-node-group-renderless>
</template>
<script>
  import {Components, Core} from "vue-renderless-expression-builder";
  const {ExpressionNodeGroupRenderless} = Components;
  import ExpressionNode from "./ExpressionNode" // your own implementation

  export default {
    name: "ExpressionNodeGroup",
    components: {
      ExpressionNodeGroupRenderless,
      // This is your implementation of the ExpressionNodeRenderless
      ExpressionNode
    },
    props: {
      // the model for the node group
      node: {
        type: Core.ExpressionNodeGroup,
        required: true
      }
    }
  }
</script>
```
### ExpressionBuilder
Core.ExpressionBuilder constructor params
- root
  - type: null (creates a new root node) | Core.ExpressionNodeGroup | Object (json representation of Core.ExpressionNodeGroup)
- errorHandler 
  - type: function
  - desc: called when an error occurs (like reaching max depth), can be used for notifying the user of errors
  
Core.ExpressionBuilder members:
| Member  | Type  | Description  |
|---|---|---|
|root | Core.ExpressionNodeGroup | the root node group of the current expression/query |
|context | Core.ExpressionNodeGroup | the current context, for which insertion and deletion method calls apply |
| insert | function(node, index) | Inserts a node or node group at a given index in the children array of the context node group. If a node group was inserted sets it as the new context. Returns the context, for fluent editing |
| set | function(node, index) | Sets a node at a for a given index in the children array of the context node group. If a node group was inserted sets it as the new context, Returns the context, for fluent editing |
|delete | function(index) | Deletes a node from a given index in the children array of the context node group. Returns the context, for fluent editing |
| add | function(node) | Inserts a node or node group at the end of the children array of the context node group. If a node group was inserted sets it as the new context, Returns the context, for fluent editing |
| contextUp | function | sets the parentNode of the current context as the new context |
| contextToRoot | function | sets the root as the new context |
| contextTo | function(path: numbert[]) | sets a node group by a path from the root, as the new context ie. the first child of the root node can be set as context by calling contextTo([0]) |
|flatten | function | Calls the faltten method of the root Core.ExprssionNodeGroup |
| toJSON  | function  | Calls the toJSON method of the root Core.ExprssionNodeGroup  |  



#### Sample component implementation

```vue
<template>
    <!-- The Core.ExpressionBuilder object instance is the model for the renderless expression builder -->
    <expression-builder-renderless v-model="builder" :fields="fields" :fieldTypes="fieldTypes" :operators="operators">
        <!-- This is your implementation of the ExpressionNodeGroupRenderless  -->
        <expression-node-group :node="builder.root"></expression-node-group>
    </expression-builder-renderless>
</template>
<script>
  import {Components, Core, Conditions} from "vue-renderless-expression-builder";
  const {ExpressionBuilderRenderless} = Components;
  const {defaultFieldTypes, returnDefaultFieldTypes, returnDefaultOperators} = Conditions;
    
    export default {
      name: "ExpressionBuilder",
      components: {
        ExpressionBuilderRenderless,
        // This is your implementation of the ExpressionNodeGroupRenderless
        ExpressionNodeGroup
      },
      props: {
        // the model for the builder
        builder: {
          type: Core.ExpressionBuilder,
          default: new Core.ExpressionBuilder()
        }
      },
      data() {
        return {
          fields: [
            {
              name: "firstName",
              type: defaultFieldTypes.TEXT,
              label: "First Name"
            },
            {
              name: "lastName",
              type: defaultFieldTypes.TEXT,
              label: "Last Name"
            },
            {
              name: "dateOfBirth",
              type: defaultFieldTypes.DATE,
              label: "Date of Birth",
              // If you specify operators for a field here, only these will be available
              // If you do not specify, the availableOperators of the fieldType will apply
              operators: [defaultOperators.GREATER_THAN]
            }
          ],
          
          /**
           * Returns the default fieldTypes, defined in the lib
           * the object describing a field type looks like this:
           * {
           *     name: {string},
           *     label: {string},
           *     availableOperators: {string[]} - a list of operator names, available for the field type by default
           * }
           */
          
          fieldTypes: returnDefaultFieldTypes(),
          
          /**
           * Returns the default operators, defined in the lib
           * the object describing an operator looks like this:
           * {
           *     name: {string},
           *     label: {string}
           * }
           */
          operators: returnDefaultOperators()
        }
      },
      watch: {
        builder() {
          // builder.toJSON() returns a JSON representation of the created query
          this.$emit("builder-updated", this.builder.toJSON())
        }
      }
    }
</script>
```
