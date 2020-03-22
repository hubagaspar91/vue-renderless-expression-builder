import { Component, Prop } from 'vue-property-decorator';
import * as Core from "@/core/ExpressionNodes";
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import {actionTypes} from "@/components/Utils";
import {ICondition, IExpressionNode} from "@/core/Interfaces";
import {ExpressionNode, ExpressionNodeGroup} from "@/core/ExpressionNodes";

@Component
export default class ExpressionNodeGroupRenderless extends ExpressionNodeBase {
  @Prop({required: true, type: Core.ExpressionNodeGroup}) protected node!: Core.ExpressionNodeGroup;
  
  private set(node: IExpressionNode, index: number) {
    this.emitInput(node, actionTypes.SET, index);
  }

  private insert(node: IExpressionNode, index: number) {
    this.emitInput(node, actionTypes.INSERT, index);
  }

  private add(node: IExpressionNode) {
    this.emitInput(node, actionTypes.ADD);
  }
  
  public setNode(condition: ICondition, index: number, connectionType?: string) {
    this.set(new ExpressionNode(condition, connectionType), index);
  }

  public setGroup(index: number, connectionType?: string) {
    this.set(new ExpressionNodeGroup(undefined, connectionType), index);
  }

  public insertNode(condition: ICondition, index: number, connectionType?: string) {
    this.insert(new ExpressionNode(condition, connectionType), index);
  }

  public insertGroup(index: number, connectionType?: string) {
    this.insert(new ExpressionNodeGroup(undefined, connectionType), index);
  }

  public addNode(condition: ICondition, connectionType?: string) {
    this.add(new ExpressionNode(condition, connectionType));
  }

  public addGroup(connectionType?: string) {
    this.add(new ExpressionNodeGroup(undefined, connectionType));
  }

  render() {
    return this.$scopedSlots.default!({
      node: this.node,
      index: this.index,
      toggleConnectionType: () => this.toggleConnectionType(Core.ExpressionNodeGroup.fromJSON),
      delete: this.emitDelete,
      setNode: this.setNode,
      setGroup: this.setGroup,
      insertNode: this.insertNode,
      insertGroup: this.insertGroup,
      addNode: this.addNode,
      addGroup: this.addGroup
    }) as any
  }
}