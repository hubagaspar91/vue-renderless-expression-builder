import * as Core from "@/core/ExpressionNodes";
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import { ExpressionNode } from "@/core/ExpressionNodes";
export default class ExpressionNodeRenderless extends ExpressionNodeBase {
    protected node: Core.ExpressionNode;
    update(value: ExpressionNode): void;
    render(): any;
}
