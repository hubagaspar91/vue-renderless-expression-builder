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
            <!-- For selecting which field to use in this node's condition -->
            <b-form-select @change="onChange(updateCondition)" :options="fieldOptions" size="sm"
                           v-model="selectedField"></b-form-select>

            <!-- For selecting which operator to use in this node's condition -->
            <b-form-select @change="onChange(updateCondition)" :options="operatorOptions" size="sm"
                           v-model="selectedOperator"></b-form-select>

            <!-- Input component, based on the type of the field selected -->

            <!-- simple input for text -->
            <b-form-input v-if="selectedFieldObject.type === 'text'" @change="onChange(updateCondition)"
                          v-model="value"></b-form-input>

            <!-- number input for number -->
            <b-form-input v-else-if="selectedFieldObject.type === 'number'" type="number" @change="onChange(updateCondition)"
                          v-model="value"></b-form-input>

            <!-- select component for select type field -->
            <b-form-select v-else-if="selectedFieldObject.type === 'select'" :options="currentSelectTypeFieldChoices" @change="onChange(updateCondition)"
                           v-model="value"></b-form-select>

            <!-- radio button component for radio (CHOICE) type field -->
            <b-form-radio-group v-else-if="selectedFieldObject.type === 'radio'" :options="currentSelectTypeFieldChoices" @input="onChange(updateCondition)"
                           v-model="value"></b-form-radio-group>

            <!-- an implementation of the boolean field type -->
            <b-form-radio-group v-else-if="selectedFieldObject.type === 'boolean'" :options="boolRadioGroup" @input="onChange(updateCondition)"
                                v-model="value"></b-form-radio-group>

            <!-- date picker for date field type -->
            <b-form-datepicker v-else-if="selectedFieldObject.type === 'date'" @input="onChange(updateCondition)"
                               v-model="value"></b-form-datepicker>
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
    // condition factory is available under this name,
    // injected into all child components of the ExpressionBuilderRenderless component
    inject: ["$__qb_condition_factory__"],
    components: {
      ExpressionNodeRenderless
    },
    data() {
      return {
        // mapping fields to the format supported by the bootstrap select component
        fieldOptions: this.$__qb_condition_factory__.fields.map(f => ({
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
        ],

        // field name of the current condition
        selectedField: null,

        // operator name of the current condition
        selectedOperator: null,

        // filter value of the current condition
        value: null
      }
    },
    created() {
      // initialize the local variables from the node on create
      this.selectedField = this.node.condition.fieldName;
      this.selectedOperator = this.node.condition.operatorName;
      this.value = this.node.condition.value;
    },
    methods: {
      /**
       * Updates the current node's condition, using the updateCondition fn from the scoped slots
       * @param updateCondition
       * @param field
       * @param operator
       * @param value
       */
      update(updateCondition, {field, operator, value}) {
        updateCondition(field, operator, value);
      },

      /**
       * Returns an operator object {name, label} from an operator name
       */
      getOperator(operatorName) {
        return this.$__qb_condition_factory__.operators.find(oObj => oObj.name === operatorName)
      },

      /**
       * Updates the current node's condition, using the updateCondition fn from the scoped slots
       * @param updateCondition
       */
      onChange(updateCondition) {
        if (this.selectedField && this.selectedOperator)
          this.update(updateCondition, {
            field: this.selectedField,
            operator: this.selectedOperator,
            value: this.value
          })
      }
    },
    computed: {

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
        if (this.selectedField == null) return;
        return this.$__qb_condition_factory__.fields.find(f => f.name === this.selectedField);
      },

      /**
       * Operators for the current field, mapped to the format supported by bootstrap select and radio components
       * @return {{text: *, value: *}[]|*[]}
       */
      operatorOptions() {
        if (!this.selectedField) return [];

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
    },
    watch: {

      /**
       * Reset the value var, whenever the field type is changed, i.e. text -> date
       * not to generate inconsistent states
       * @param newVal
       * @param oldVal
       */
      "selectedFieldObject.type"(newVal, oldVal) {
        if (oldVal !== newVal) {
          this.value = null;
        }
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