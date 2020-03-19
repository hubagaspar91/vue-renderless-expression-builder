import { Component, Prop, Vue } from 'vue-property-decorator';
import * as Core from "@/core/ExpressionNodes";
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import {actionTypes, InputEventBody} from "@/components/Utils";
import {IExpressionNode} from "@/core/Interfaces";

@Component
export default class ExpressionNodeGroupRenderless extends ExpressionNodeBase {
  @Prop({required: true, type: Core.ExpressionNodeGroup}) protected value!: Core.ExpressionNodeGroup;

  created() {
   this.$on("input",
     (body: InputEventBody) => this.emitInput(body.value, body.action, body.path));
  }

  set(value: IExpressionNode, index: number) {
    this.emitInput(value, actionTypes.SET, [index]);
  }

  insert(value: IExpressionNode, index: number) {
    this.emitInput(value, actionTypes.INSERT, [index]);
  }

  add(value: IExpressionNode, index: number) {
    this.emitInput(value, actionTypes.ADD);
  }

  render() {
    return this.$scopedSlots.default!({
      node: this.value,
      index: this.index,
      toggleConnectionType: () => this.toggleConnectionType(Core.ExpressionNodeGroup.fromJSON),
      delete: this.emitDelete,
      set: this.set,
      insert: this.insert,
      add: this.add
    }) as any
  }
}