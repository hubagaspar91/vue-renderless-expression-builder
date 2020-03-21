import { Component, Prop, Vue } from 'vue-property-decorator';
import * as Core from "@/core/ExpressionNodes";
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import {actionTypes, InputEventBody} from "@/components/Utils";
import {IExpressionNode} from "@/core/Interfaces";

@Component
export default class ExpressionNodeGroupRenderless extends ExpressionNodeBase {
  @Prop({required: true, type: Core.ExpressionNodeGroup}) protected node!: Core.ExpressionNodeGroup;

  set(node: IExpressionNode, index: number) {
    this.emitInput(node, actionTypes.SET, index);
  }

  insert(node: IExpressionNode, index: number) {
    this.emitInput(node, actionTypes.INSERT, index);
  }

  add(node: IExpressionNode) {
    this.emitInput(node, actionTypes.ADD);
  }

  render() {
    return this.$scopedSlots.default!({
      node: this.node,
      index: this.index,
      toggleConnectionType: () => this.toggleConnectionType(Core.ExpressionNodeGroup.fromJSON),
      delete: this.emitDelete,
      set: this.set,
      insert: this.insert,
      add: this.add
    }) as any
  }
}