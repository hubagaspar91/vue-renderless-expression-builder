import {Component, Prop, Provide, Vue} from 'vue-property-decorator';
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {actionTypes, InputEventBody} from "@/components/Utils";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import {returnDefaultFieldTypes, returnDefaultOperators} from "@/conditions/Defaults";
import {
  ConditionFactoryField,
  ConditionFactoryFieldTypeDefinition,
  ConditionFactoryOperator
} from "@/conditions/Interfaces";
import ConditionFactory from "@/conditions/ConditionFactory";

export const PROVIDE_EVENT_HUB_KEY = "$__qb_event_hub__";
  export const PROVIDE_CONDITION_FACTORY_KEY = "$__qb_condition_factory__";


@Component
export default class ExpressionBuilderRenderless extends Vue {
  /**
   * Builder object, doing all the work, creating and preserving the consistency of the nested expression structure
   */
  @Prop({type: ExpressionBuilder, required: true})
  protected value!: ExpressionBuilder;

  /**
   * Event hub, through which nodes send the proposed state changes to the builder for execution, or dismissal
   * Also injected in child nodes
   */
  @Provide(PROVIDE_EVENT_HUB_KEY)
  @Prop({type: Vue, required: false, default: () => new Vue()})
  eventHub!: Vue;

  /**
   * Filters, available for usage on the current builder instance
   */
  @Prop({type: Array, required: false, default: returnDefaultOperators})
  operators?: ConditionFactoryOperator[];

  /**
   * Fields available for filtering on the current builder instance
   */
  @Prop({type: Array, required: true})
  fields!: ConditionFactoryField[];

  /**
   * Field types available on the instance
   */
  @Prop({type: Array, required: false, default: returnDefaultFieldTypes})
  fieldTypes?: ConditionFactoryFieldTypeDefinition[];

  /**
   * Service for processing fields and filters into a factory service
   * That creates individual conditions from field, filter and value
   */
  @Provide(PROVIDE_CONDITION_FACTORY_KEY)
  conditionProvider = new ConditionFactory({
    operators: this.operators as ConditionFactoryOperator[],
    fields: this.fields,
    fieldTypes: this.fieldTypes
  });

  created() {
    this.eventHub.$on("input", this.handleInput);
  }

  /**
   * Handles the input events from the child nodes, that suggests and change is to be made in the
   * Expression structure
   * @param body
   * @private
   */
  private handleInput(body: InputEventBody) {
    const pathToParent = body.path.slice(0, body.path.length-1),
      index = body.path[body.path.length-1];

    switch (body.action) {
      case actionTypes.SET:
        this.value.contextTo(pathToParent).set(body.node, index);
        break;
      case actionTypes.ADD:
        this.value.contextTo(body.path).add(body.node);
        break;
      case actionTypes.INSERT:
        this.value.contextTo(pathToParent).insert(body.node, index);
        break;
      case actionTypes.DELETE:
        this.value.contextTo(pathToParent).delete(index);
        break;
    }

    this.value.contextToRoot();

    this.$emit("input", this.value);
  }

  get root(): ExpressionNodeGroup {
    return this.value.root;
  }

  render() {
    return this.$scopedSlots.default!({}) as any
  }

}