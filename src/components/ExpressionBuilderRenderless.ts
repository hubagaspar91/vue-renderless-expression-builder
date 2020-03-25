import {Component, Prop, Provide, Vue} from 'vue-property-decorator';
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {actionTypes, InputEventBody} from "@/components/Utils";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import {returnDefaultFilters} from "@/conditions/Defaults";
import {ConditionProviderField, ConditionProviderFilterDefinition} from "@/conditions/Interfaces";
import ConditionProvider from "@/conditions/ConditionProvider";

export const provideEventHubKey = "$__qb_event_hub__";
export const provideConditionProviderKey = "$__qb_condition_provider__";

@Component
export default class ExpressionBuilderRenderless extends Vue {
  @Prop({type: ExpressionBuilder, required: true}) protected value!: ExpressionBuilder;

  @Provide(provideEventHubKey)
  @Prop({type: Vue, required: false, default: () => new Vue()})
  eventHub!: Vue;

  @Prop({type: Array, required: false, default: returnDefaultFilters}) filters?: ConditionProviderFilterDefinition[];
  @Prop({type: Array, required: true}) fields!: ConditionProviderField[];

  @Provide(provideConditionProviderKey) conditionProvider = new ConditionProvider({
    filters: this.filters as ConditionProviderFilterDefinition[],
    fields: this.fields
  });

  created() {
    this.eventHub.$on("input", this._handleInput);
  }

  private _handleInput(body: InputEventBody) {
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
    return null
  }

}