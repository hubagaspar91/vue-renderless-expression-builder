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
  public node!: ExpressionNode;

  /**
   * Updates the condition in place and signals the ExpressionBuilderRenderless through events
   * @param fieldName
   * @param operator
   * @param value
   */
  updateCondition(fieldName: string, operator: string, value: string) {
    this.conditionFactory.createAndUpdate(this.node, fieldName, operator, value);
  }

  render() {
    return this.$scopedSlots.default!({
      node: this.node,
      index: this.index,
      updateCondition: this.updateCondition,
      deleteSelf: this.emitDelete,
      conditionFactory: this.conditionFactory
    }) as any
  }
}