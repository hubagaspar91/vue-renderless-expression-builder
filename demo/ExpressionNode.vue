<template>
    <expression-node-renderless :node="node" v-slot="{
     node,  // the current node
     index,  // the index of this node amongst its parent's children
     // function, updates the condition of the current node,
     // takes params: field, operator, value ('firstName', 'startsWith', 'Jo')
     // this can also be done by the injected condition factory's createAndUpdate method, as in the example below
     updateCondition,
     deleteSelf,  // deletes the current node
     conditionFactory  // it stores the defined fields, fieldTypes and operators,
     // and creates new conditions with its create method - injected by the parent ExpressionBuilderRenderless
   }">
        <div class="expression-node">
            <!-- For selecting which field to use in this node's condition -->
            <b-form-select :options="fieldOptions" size="sm"
                           v-model="fieldName"></b-form-select>

            <!-- For selecting which operator to use in this node's condition -->
            <b-form-select :options="operatorOptions" size="sm"
                           v-model="operatorName"></b-form-select>

            <!-- Input component, based on the type of the field selected -->

            <!-- simple input for text -->
            <b-form-input v-if="selectedFieldObject.type === 'text'" v-model="conditionValue"></b-form-input>

            <!-- number input for number -->
            <b-form-input v-else-if="selectedFieldObject.type === 'number'" type="number" v-model="conditionValue"></b-form-input>

            <!-- select component for select type field -->
            <b-form-select v-else-if="selectedFieldObject.type === 'select'" :options="currentSelectTypeFieldChoices"
                           v-model="conditionValue"></b-form-select>

            <!-- radio button component for radio (CHOICE) type field -->
            <b-form-radio-group v-else-if="selectedFieldObject.type === 'radio'" :options="currentSelectTypeFieldChoices"
                           v-model="conditionValue"></b-form-radio-group>

            <!-- an implementation of the boolean field type -->
            <b-form-radio-group v-else-if="selectedFieldObject.type === 'boolean'" :options="boolRadioGroup"
                                v-model="conditionValue"></b-form-radio-group>

            <!-- date picker for date field type -->
            <b-form-datepicker v-else-if="selectedFieldObject.type === 'date'"
                               v-model="conditionValue"></b-form-datepicker>
            <div class="close-container">
                <b-icon-x @click="deleteSelf"></b-icon-x>
            </div>
        </div>
    </expression-node-renderless>
</template>

<script>
  import {Core, Components} from "vue-renderless-expression-builder";

  const {ExpressionNodeRenderless} = Components;

  export default {
    name: "ExpressionNode",
    props: {
      node: {
        type: Core.ExpressionNode,
        required: true
      }
    },
    /**
     * condition factory is available under this name,
     * injected into all child components of the ExpressionBuilderRenderless component
     *
     * it stores field defined on the builder (fields prop)
     * field types defined on the builder (fieldTypes prop)
     * operators defined on the builder (operators)
     *
     * exposes create and createAndUpdate methods
     *
     * create(fieldName, operatorName, value) - creates a condition
     * createAndUpdate(node, fieldName, operatorName, value) - creates a condition and updates the condition the node provided
     *
     * */
    inject: {
      conditions: "$__qb_condition_factory__"
    },
    components: {
      ExpressionNodeRenderless
    },
    data() {
      return {
        // mapping fields to the format supported by the bootstrap select component
        fieldOptions: this.conditions.fields.map(f => ({
          value: f.name,
          text: f.label
        })),

        // creating select options for the bool field type (implemented with bootstrap radio group)
        boolRadioGroup: [
          {
            text: "True",
            value: true
          },
          {
            text: "False",
            value: false
          }
        ]
      }
    },
    methods: {
      /**
       * Returns an operator object {name, label} from an operator name
       */
      getOperator(operatorName) {
        return this.conditions.operators.find(oObj => oObj.name === operatorName)
      }
    },
    computed: {

      // fieldName computed, to use as v-model
      fieldName: {
        get() {
          return this.node.condition.fieldName;
        },
        set(val) {
          // use this fn to validate the choice
          // when changing fields, null-out the value and operator as well, to avoid data inconsistencies
          // this can be better handled, I do this for the sake of simplicity here
          this.conditions.createAndUpdate(this.node, val);
        }
      },

      // operatorName computed, to use as v-model
      operatorName: {
        get() {
          return this.node.condition.operatorName;
        },
        set(val) {
          // use this fn to validate the choice
          this.conditions.createAndUpdate(this.node, this.node.condition.fieldName, val, this.node.condition.value);
        }
      },

      // value computed, to use as v-model
      conditionValue: {
        get() {
          return this.node.condition.value;
        },
        set(val) {
          this.$set(this.node.condition, "value", val);
        }
      },

      /**
       * Returns the field object, from the field's name
       * Field object interface:
       *
       * interface ConditionFactoryField {
       *    type: string;
       *    name: string;
       *    label: string;
       *    operators?: string[];
       *    choices?: any[];  // used, if select-type type is used
       * }
       *
       * @return {*}
       */
      selectedFieldObject() {
        if (this.node.condition.fieldName == null) return;
        return this.conditions.fields.find(f => f.name === this.node.condition.fieldName);
      },

      /**
       * Operators for the current field, mapped to the format supported by bootstrap select and radio components
       * @return {{text: *, value: *}[]|*[]}
       */
      operatorOptions() {
        if (!this.selectedFieldObject) return [];

        return this.selectedFieldObject.operators.map(o => {
          const operatorObj = this.getOperator(o);
          return {
            value: operatorObj.name,
            text: operatorObj.label
          }
        })
      },

      /**
       * Choices for the currently selected field, mapped to the format supported by bootstrap select and radio components
       * @return {{text: *, value: *}[]|*[]}
       */
      currentSelectTypeFieldChoices() {
        if (this.selectedFieldObject.choices && this.selectedFieldObject.choices.length > 0)
          return this.selectedFieldObject.choices.map(c => ({
            value: c.value,
            text: c.name
          }));
        else return [];
      }
    }
  }
</script>

<style scoped lang="scss">
    .expression-node {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.5rem;
        position: relative;

        svg {
            cursor: pointer;
        }

        input, select {
            width: 10rem;
            margin-right: 2rem;
            height: 2rem;
        }
    }
</style>