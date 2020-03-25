import {Component, Inject, Prop, Vue} from "vue-property-decorator";
import {IExpressionNode} from "@/core/Interfaces";
import {actionTypes, InputEventBody} from "@/components/Utils";
import ConditionProvider from "@/conditions/ConditionProvider";
import {provideConditionProviderKey, provideEventHubKey} from "@/components/ExpressionBuilderRenderless";

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
  @Prop({required: true}) protected node!: IExpressionNode;

  @Inject(provideEventHubKey) eventHub!: Vue;
  @Inject(provideConditionProviderKey) conditionProvider!: ConditionProvider;

  emitInput(node?: IExpressionNode, action = actionTypes.SET, index?: number): void {
    const path = getNodePath(this.node);
    if (index != undefined)
      path.push(index);
    this.eventHub.$emit("input", {node, path, action} as InputEventBody)
  }

  emitDelete() {
    this.emitInput(undefined, actionTypes.DELETE);
  }

  get index() {
    return this.node.parentNode
      ? this.node.parentNode.children.indexOf(this.node)
      : -1;
  }
}