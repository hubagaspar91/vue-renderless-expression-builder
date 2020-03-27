import { Component, Prop } from 'vue-property-decorator';
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import {actionTypes} from "@/components/Utils";
import {IExpressionNode} from "@/core/Interfaces";
import ExpressionNodeGroup, {connectionTypes} from "@/core/ExpressionNodeGroup";
import ExpressionNode from "@/core/ExpressionNode";

@Component
export default class ExpressionNodeGroupRenderless extends ExpressionNodeBase {

  /**
   * The node group, represented by the current Vue component instance
   */
  @Prop({required: true, type: ExpressionNodeGroup})
  public node!: ExpressionNodeGroup;

  /**
   * Initializes the insertion of {node}, to the {index} index of the parent ExpressionNodeGroup
   * Emits and event towards the parent ExpressionBuilderRenderless
   * @param node
   * @param index
   */
  public insert(node: IExpressionNode, index: number) {
    this.emitInput(node, actionTypes.INSERT, index);
  }

  /**
   * Initializes the addition of node or node group, by pushing it to the children list of the parent ExpressionNodeGroup
   * Emits and event towards the parent ExpressionBuilderRenderless
   * @param node
   */
  private add(node: IExpressionNode) {
    this.emitInput(node, actionTypes.ADD);
  }

  /**
   * Initializes the addition of a node with the default condition, returned by the ConditionProvider instance
   * injected from the parent ExpressionBuilderRenderless
   */
  public addNode(condition?: object) {
    this.add(new ExpressionNode(condition || this.conditionFactory.create()));
  }

  /**
   * Initializes the addition of an empty node group with the default condition, returned by the ConditionProvider instance
   * injected from the parent ExpressionBuilderRenderless
   */
  public addGroup() {
    this.add(new ExpressionNodeGroup());
  }

  /**
   * Toggles the connection type (and - or) between its child nodes
   */
  toggleConnectionType() {
    if (this.node.connectionType === connectionTypes.AND)
      this.node.connectionType = connectionTypes.OR;
    else
      this.node.connectionType = connectionTypes.AND;
  }

  render() {
    return this.$scopedSlots.default!({
      node: this.node,
      index: this.index,
      toggleConnectionType: this.toggleConnectionType,
      deleteSelf: this.emitDelete,
      insert: this.insert,
      addNode: this.addNode,
      addGroup: this.addGroup,
      conditionFactory: this.conditionFactory
    }) as any
  }
}