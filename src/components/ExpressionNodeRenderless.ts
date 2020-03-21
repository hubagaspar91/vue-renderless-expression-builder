import { Component, Prop, Vue } from 'vue-property-decorator';
import * as Core from "@/core/ExpressionNodes";
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import {ExpressionNode} from "@/core/ExpressionNodes";

@Component
export default class ExpressionNodeRenderless extends ExpressionNodeBase {
  @Prop({required: true, type: Core.ExpressionNode}) protected node!: Core.ExpressionNode;

  update(value: ExpressionNode) {
    this.emitInput(value);
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