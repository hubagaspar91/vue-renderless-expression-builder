import {Component, Prop, Vue} from 'vue-property-decorator';
import {IExpressionNodeGroupJSON} from "@/core/Interfaces";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {actionTypes, InputEventBody} from "@/components/Utils";
import {ExpressionNodeGroup} from "@/core/ExpressionNodes";

@Component
export default class ExpressionBuilderRenderless extends Vue {
  @Prop() protected json?: IExpressionNodeGroupJSON;

  public eventHub: Vue = new Vue();

  protected builderInstance!: ExpressionBuilder;

  created() {
    this.builderInstance = new ExpressionBuilder(this.json);
    this.$emit("update-expression", this.root);
    this.eventHub.$on("input", this.handleInput);
  }

  handleInput(body: InputEventBody) {
    const pathToParent = body.path.slice(0, body.path.length-1),
      index = body.path[body.path.length-1];

    switch (body.action) {
      case actionTypes.SET:
        this.builderInstance.contextTo(pathToParent).set(body.node, index);
        break;
      case actionTypes.ADD:
        this.builderInstance.contextTo(body.path).add(body.node);
        break;
      case actionTypes.INSERT:
        this.builderInstance.contextTo(pathToParent).insert(body.node, index);
        break;
      case actionTypes.DELETE:
        this.builderInstance.contextTo(pathToParent).delete(index);
        break;
    }

    this.$emit("update-expression", this.root);
  }

  get root(): ExpressionNodeGroup {
    return this.builderInstance.root;
  }

  render() {
    return this.$scopedSlots.default!({
      eventHub: this.eventHub,
      root: this.root
    }) as any
  }

}