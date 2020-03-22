import { Vue } from 'vue-property-decorator';
import { IExpressionNodeGroupJSON } from "@/core/Interfaces";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import { InputEventBody } from "@/components/Utils";
export default class ExpressionBuilderRenderless extends Vue {
    protected JSON?: IExpressionNodeGroupJSON;
    eventHub: Vue;
    protected builderInstance: ExpressionBuilder;
    created(): void;
    handleInput(body: InputEventBody): void;
    get root(): import("../core/ExpressionNodes").ExpressionNodeGroup;
    render(): any;
}
