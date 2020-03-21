import { Vue } from "vue-property-decorator";
import { IExpressionNode } from "@/core/Interfaces";
export default class ExpressionNodeBase extends Vue {
    protected node: IExpressionNode;
    eventHub: Vue;
    emitInput(node?: IExpressionNode, action?: string, index?: number): void;
    toggleConnectionType(fromJSON: Function): void;
    emitDelete(): void;
    get index(): number;
}
