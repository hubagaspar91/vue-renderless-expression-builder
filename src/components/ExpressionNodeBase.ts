import {Component, Inject, Prop, Vue} from "vue-property-decorator";
import {IExpressionNode} from "@/core/Interfaces";
import {actionTypes, InputEventBody} from "@/components/Utils";
import ConditionFactory from "@/conditions/ConditionFactory";
import {PROVIDE_CONDITION_FACTORY_KEY, PROVIDE_EVENT_HUB_KEY} from "@/components/ExpressionBuilderRenderless";

/**
 * Helper to recursively get the path of the current node
 * @param node
 */
const getNodePath = (node: IExpressionNode): number[] => {
  if (!node.parentNode)
    return [];
  else
    return [...getNodePath(node.parentNode), node.parentNode.children.indexOf(node)];
};

@Component({})
export default class ExpressionNodeBase extends Vue {

  /**
   * The node or node group, represented by the current Vue component instance
   */
  @Prop({required: true})
  public node!: IExpressionNode;

  /**
   * Injected eventHub to communicate with its parent ExpressionBuilderRenderless
   */
  @Inject(PROVIDE_EVENT_HUB_KEY)
  eventHub!: Vue;

  /**
   * Injected conditionProvider to create and update conditions of individual nodes
   */
  @Inject(PROVIDE_CONDITION_FACTORY_KEY)
  conditionFactory!: ConditionFactory;

  /**
   * Emit an input event towards the parent ExpressionBuilderRenderless, that initializes a change
   * in the nested expression structure
   * @param node
   * @param action
   * @param index
   */
  emitInput(node?: IExpressionNode, action = "", index?: number): void {
    const path = getNodePath(this.node);
    if (index != undefined)
      path.push(index);
    this.eventHub.$emit("input", {node, path, action} as InputEventBody)
  }

  /**
   * Initializes the deletion of the current node
   */
  emitDelete() {
    this.emitInput(undefined, actionTypes.DELETE);
  }

  get index() {
    return this.node.parentNode
      ? this.node.parentNode.children.indexOf(this.node)
      : -1;
  }
}