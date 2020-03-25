import { Component, Prop } from 'vue-property-decorator';
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import ExpressionNode from "@/core/ExpressionNode";
import {ICondition} from "@/core/Interfaces";

@Component
export default class ExpressionNodeRenderless extends ExpressionNodeBase {

  /**
   * The node, represented by the current Vue component instance
   */
  @Prop({required: true, type: ExpressionNode})
  protected node!: ExpressionNode;

  /**
   * Emits an event towards the parent ExpressionBuilderRenderless, initializing
   * the update of its condition
   * @param condition
   * @private
   */
  private update(condition: ICondition) {
    this.emitInput(new ExpressionNode(condition));
  }

  /**
   * Creates a new condition with the ConditionProvider, injected from the parent ExpressionBuilderRenderless
   * and sends an event to execute the update
   * @param fieldName
   * @param filterType
   * @param value
   */
  updateCondition(fieldName: string, filterType: string, value: string) {
    this.update(this.conditionProvider.createFieldFilter(fieldName, filterType, value))
  }

  render() {
    return this.$scopedSlots.default!({
      node: this.node,
      index: this.index,
      updateCondition: this.updateCondition,
      deleteSelf: this.emitDelete
    }) as any
  }
}