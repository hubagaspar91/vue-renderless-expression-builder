import {Component, Prop, Vue} from "vue-property-decorator";
import {IExpressionNode} from "@/core/Interfaces";
import {connectionTypes} from "@/core/ExpressionNodeBase";
import {actionTypes, InputEventBody} from "@/components/Utils";

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
  @Prop({required: true}) eventHub!: Vue;

  emitInput(node?: IExpressionNode, action = actionTypes.SET, index?: number ): void {
    let path = getNodePath(this.node);
    if (index != undefined)
      path.push(index);
    this.eventHub.$emit("input", {node, path, action} as InputEventBody)
  }

  toggleConnectionType(fromJSON: Function) {
    const json = this.node.toJSON();
    if (json.connectionType === connectionTypes.AND)
      json.connectionType = connectionTypes.OR;
    else
      json.connectionType = connectionTypes.AND;
    this.emitInput(fromJSON(json) as IExpressionNode);
  }

  emitDelete() {
    this.emitInput(undefined, actionTypes.DELETE);
  }

  get index() {
    if (this.node.parentNode)
      return this.node.parentNode.children.indexOf(this.node);
    else
      return -1
  }
}