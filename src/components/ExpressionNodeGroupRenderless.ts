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

  private groupInsertionWrapper(fn: Function, index?: number, connectionType?: string) {
    connectionType = connectionType == undefined
      ? index != undefined && this.node.children[index]
        ? this.node.children[index].connectionType
        : undefined
      : connectionType;

    fn(new ExpressionNodeGroup(undefined, connectionType), index);
  }

  private nodeInsertionWrapper(fn: Function, condition: ICondition, index?: number, connectionType?: string) {
    connectionType = connectionType == undefined
      ? index != undefined && this.node.children[index]
        ? this.node.children[index].connectionType
        : undefined
      : connectionType;

    fn(new ExpressionNode(condition, connectionType), index);
  }
  
  public setNode(condition: ICondition, index: number, connectionType?: string) {
    this.nodeInsertionWrapper(this.set, condition, index, connectionType);
  }

  public setGroup(index: number, connectionType?: string) {
    this.groupInsertionWrapper(this.set, index, connectionType);
  }

  public insertNode(condition: ICondition, index: number, connectionType?: string) {
    this.nodeInsertionWrapper(this.insert, condition, index, connectionType);
  }

  public insertGroup(index: number, connectionType?: string) {
    this.groupInsertionWrapper(this.insert, index, connectionType);
  }

  public addNode(condition: ICondition, connectionType?: string) {
    this.nodeInsertionWrapper(this.add, condition, undefined, connectionType);
  }

  public addGroup(connectionType?: string) {
    this.groupInsertionWrapper(this.add, undefined, connectionType);
  }

  render() {
    return this.$scopedSlots.default!({
      node: this.node,
      index: this.index,
      toggleConnectionType: () => this.toggleConnectionType(Core.ExpressionNodeGroup.fromJSON),
      deleteNode: this.emitDelete,
      setNode: this.setNode,
      setGroup: this.setGroup,
      insertNode: this.insertNode,
      insertGroup: this.insertGroup,
      addNode: this.addNode,
      addGroup: this.addGroup
    }) as any
  }
}