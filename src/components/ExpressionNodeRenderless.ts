import { Component, Prop } from 'vue-property-decorator';
import * as Core from "@/core/ExpressionNodes";
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import {ExpressionNode} from "@/core/ExpressionNodes";
import {ICondition} from "@/core/Interfaces";

@Component
export default class ExpressionNodeRenderless extends ExpressionNodeBase {
  @Prop({required: true, type: Core.ExpressionNode}) protected node!: Core.ExpressionNode;

  update(condition: ICondition) {
    this.emitInput(new ExpressionNode(condition, this.node.connectionType));
  }

  render() {
    return this.$scopedSlots.default!({
      node: this.node,
      index: this.index,
      toggleConnectionType: () => this.toggleConnectionType(Core.ExpressionNode.fromJSON),
      update: this.update,
      delete: this.emitDelete
    }) as any
  }
}