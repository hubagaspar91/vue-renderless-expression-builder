import { Vue } from 'vue-property-decorator';
import { IExpressionNodeGroupJSON } from "@/core/Interfaces";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import { InputEventBody } from "@/components/Utils";
import { ExpressionNodeGroup } from "@/core/ExpressionNodes";
export default class ExpressionBuilderRenderless extends Vue {
    protected json?: IExpressionNodeGroupJSON;
    eventHub: Vue;
    protected builderInstance: ExpressionBuilder;
    created(): void;
    handleInput(body: InputEventBody): void;
    get root(): ExpressionNodeGroup;
    render(): any;
}
