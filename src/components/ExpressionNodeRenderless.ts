import { Component, Prop } from 'vue-property-decorator';
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import ExpressionNode from "@/core/ExpressionNode";
import {ICondition} from "@/core/Interfaces";

@Component
export default class ExpressionNodeRenderless extends ExpressionNodeBase {
  @Prop({required: true, type: ExpressionNode}) protected node!: ExpressionNode;

  update(condition: ICondition) {
    this.emitInput(new ExpressionNode(condition, this.node.connectionType));
  }

  render() {
    return this.$scopedSlots.default!({
      node: this.node,
      index: this.index,
      toggleConnectionType: () => this.toggleConnectionType(ExpressionNode.fromJSON),
      updateCondition: this.update,
      deleteSelf: this.emitDelete
    }) as any
  }
}