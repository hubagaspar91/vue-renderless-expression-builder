import {Component, Prop, Vue} from 'vue-property-decorator';
import {IExpressionNodeGroupJSON} from "@/core/Interfaces";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {actionTypes, InputEventBody} from "@/components/Utils";

@Component
export default class ExpressionBuilderRenderless extends Vue {
  @Prop() protected JSON?: IExpressionNodeGroupJSON;

  protected builderInstance!: ExpressionBuilder;

  created() {
    this.builderInstance = new ExpressionBuilder(this.JSON);
    this.$on("input", this.handleInput);
  }

  handleInput(body: InputEventBody) {
    const pathToParent = body.path.slice(0, body.path.length-1),
      index = body.path[body.path.length-1];

    switch (body.action) {
      case actionTypes.SET:
        this.builderInstance.contextTo(pathToParent).set(body.value, index);
        break;
      case actionTypes.ADD:
        this.builderInstance.contextTo(body.path).add(body.value);
        break;
      case actionTypes.INSERT:
        this.builderInstance.contextTo(pathToParent).insert(body.value, index);
        break;
      case actionTypes.DELETE:
        this.builderInstance.contextTo(pathToParent).delete(index);
        break;
    }
  }

}