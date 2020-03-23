import {Component, Prop, Vue} from 'vue-property-decorator';
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {actionTypes, InputEventBody} from "@/components/Utils";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";

@Component
export default class ExpressionBuilderRenderless extends Vue {
  @Prop({type: ExpressionBuilder, required: true}) protected value!: ExpressionBuilder;

  public eventHub: Vue = new Vue();


  created() {
    this.eventHub.$on("input", this.handleInput);
  }

  handleInput(body: InputEventBody) {
    const pathToParent = body.path.slice(0, body.path.length-1),
      index = body.path[body.path.length-1];

    switch (body.action) {
      case actionTypes.SET:
        this.value.contextTo(pathToParent).set(body.node, index);
        break;
      case actionTypes.ADD:
        this.value.contextTo(body.path).add(body.node);
        break;
      case actionTypes.INSERT:
        this.value.contextTo(pathToParent).insert(body.node, index);
        break;
      case actionTypes.DELETE:
        this.value.contextTo(pathToParent).delete(index);
        break;
    }

    this.value.contextToRoot();

    this.$emit("input", this.value);
  }

  get root(): ExpressionNodeGroup {
    return this.value.root;
  }

  render() {
    return null
  }

}