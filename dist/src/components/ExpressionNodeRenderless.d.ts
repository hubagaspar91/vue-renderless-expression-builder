import * as Core from "@/core/ExpressionNodes";
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import { ICondition } from "@/core/Interfaces";
export default class ExpressionNodeRenderless extends ExpressionNodeBase {
    protected node: Core.ExpressionNode;
    update(condition: ICondition): void;
    render(): any;
}
