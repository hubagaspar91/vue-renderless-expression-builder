import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import ExpressionNode from "@/core/ExpressionNode";
import { ICondition } from "@/core/Interfaces";
export default class ExpressionNodeRenderless extends ExpressionNodeBase {
    protected node: ExpressionNode;
    update(condition: ICondition): void;
    render(): any;
}
