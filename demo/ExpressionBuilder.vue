<template>
    <!-- propagate input, for your component to work with v-model -->
    <expression-builder-renderless :fields="fields" :fieldTypes="fieldTypes" :operators="operators" :value="value"
                                   @input="emitInput">
        <!-- the root expression node group, initialized from the root of the Core.ExpressionBuilder instance -->
        <expression-node-group :node="value.root"></expression-node-group>
    </expression-builder-renderless>
</template>

<script>
  import {Core, Components, Conditions} from "vue-renderless-expression-builder";
  import ExpressionNodeGroup from "./ExpressionNodeGroup";
  const country = require("country-list-js");

  const {defaultFieldTypes, returnDefaultFieldTypes, returnDefaultOperators} = Conditions.Defaults;

  const {ExpressionBuilderRenderless} = Components;

  export default {
    name: "ExpressionBuilder",
    props: {
      value: {
        type: Core.ExpressionBuilder,
        required: true
      }
    },
    components: {
      // the renderless builder component
      ExpressionBuilderRenderless,

      // your node group component, created from ExpressionNodeGroupRenderless
      ExpressionNodeGroup
    },
    data() {
      return {
        // field types - same as the default value, if you omit this prop
        fieldTypes: returnDefaultFieldTypes(),

        // operators - same as the default value, if you omit this prop
        operators: returnDefaultOperators(),

        // fields - the fields you want to make available in the expression builder
        fields: [
          {
            name: "firstName",
            label: "First Name",
            type: defaultFieldTypes.TEXT
          },
          {
            name: "lastName",
            label: "Last Name",
            type: defaultFieldTypes.TEXT
          },
          {
            name: "sex",
            label: "Sex",
            type: defaultFieldTypes.CHOICE,
            choices: [
              {
                name: "Male",
                value: "male"
              },
              {
                name: "Female",
                value: "female"
              }
            ]
          },
          {
            name: "dateOfBirth",
            label: "Date of Birth",
            type: defaultFieldTypes.DATE
          },
          {
            name: "countryOfBirth",
            label: "Country of Birth",
            type: defaultFieldTypes.SELECT,
            choices: Object.values(country.all).map(c => ({
              name: c.name,
              value: c.iso3
            }))
          },
          {
            name: "isCurrentlyEmployed",
            label: "Currently Employed",
            type: defaultFieldTypes.BOOLEAN
          },
          {
            name: "yearlyIncome",
            label: "Yearly Income",
            type: defaultFieldTypes.NUMBER
          }
        ]
      }
    },
    methods: {
      // emit input - for your component to work with v-model
      emitInput(val) {
        this.$emit("input", val)
      }
    }
  }
</script>

<style scoped>

</style>