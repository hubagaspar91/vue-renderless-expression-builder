import {Component, Prop, Vue} from "vue-property-decorator";
import {IExpressionNode} from "@/core/Interfaces";
import {connectionTypes} from "@/core/ExpressionNodes";
import {actionTypes, InputEventBody} from "@/components/Utils";

@Component({})
export default class ExpressionNodeBase extends Vue {
  // IMPORTANT root nodeGroup has to have index -1 always
  @Prop({default: -1}) protected index!: number;
  @Prop() protected value!: IExpressionNode;

  emitInput(value?: IExpressionNode, action = actionTypes.SET, path: number[] = []): void {
    if (this.$parent && this.$parent.$parent) {
      if (this.index >= 0)  // top level element has index = -1
        path.unshift(this.index);
      this.$parent.$parent.$emit("input", {value, path, action} as InputEventBody);
    }
  }

  toggleConnectionType(fromJSON: Function) {
    const json = this.value.toJSON();
    if (json.connectionType === connectionTypes.AND)
      json.connectionType = connectionTypes.OR;
    else
      json.connectionType = connectionTypes.AND;
    this.emitInput(fromJSON(json) as IExpressionNode);
  }

  emitDelete() {
    this.emitInput(undefined, actionTypes.DELETE);
  }
}