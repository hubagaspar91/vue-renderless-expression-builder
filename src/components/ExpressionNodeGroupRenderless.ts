import { Component, Prop } from 'vue-property-decorator';
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import {actionTypes} from "@/components/Utils";
import {IExpressionNode} from "@/core/Interfaces";
import ExpressionNodeGroup, {connectionTypes} from "@/core/ExpressionNodeGroup";
import ExpressionNode from "@/core/ExpressionNode";

@Component
export default class ExpressionNodeGroupRenderless extends ExpressionNodeBase {
  @Prop({required: true, type: ExpressionNodeGroup}) protected node!: ExpressionNodeGroup;

  public insert(node: IExpressionNode, index: number) {
    this.emitInput(node, actionTypes.INSERT, index);
  }

  private add(node: IExpressionNode) {
    this.emitInput(node, actionTypes.ADD);
  }

  public addNode() {
    this.add(new ExpressionNode());
  }

  public addGroup() {
    this.add(new ExpressionNodeGroup());
  }

  toggleConnectionType() {
    const json = this.node.toJSON();
    if (json.connectionType === connectionTypes.AND)
      json.connectionType = connectionTypes.OR;
    else
      json.connectionType = connectionTypes.AND;
    this.emitInput(ExpressionNodeGroup.fromJSON(json));
  }

  render() {
    return this.$scopedSlots.default!({
      node: this.node,
      index: this.index,
      toggleConnectionType: this.toggleConnectionType,
      deleteSelf: this.emitDelete,
      insert: this.insert,
      addNode: this.addNode,
      addGroup: this.addGroup
    }) as any
  }
}