import { Vue } from 'vue-property-decorator';
import ExpressionBuilder from "@/core/ExpressionBuilder";
import { InputEventBody } from "@/components/Utils";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
export default class ExpressionBuilderRenderless extends Vue {
    protected value: ExpressionBuilder;
    eventHub: Vue;
    created(): void;
    handleInput(body: InputEventBody): void;
    get root(): ExpressionNodeGroup;
    render(): null;
}
