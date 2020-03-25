import { Vue } from 'vue-property-decorator';
import ExpressionBuilder from "@/core/ExpressionBuilder";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
export default class ExpressionBuilderRenderless extends Vue {
    protected value: ExpressionBuilder;
    eventHub: Vue;
    created(): void;
    private _handleInput;
    get root(): ExpressionNodeGroup;
    render(): null;
}
