import * as Core from "@/core/ExpressionNodes";
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import { IExpressionNode } from "@/core/Interfaces";
export default class ExpressionNodeGroupRenderless extends ExpressionNodeBase {
    protected node: Core.ExpressionNodeGroup;
    set(node: IExpressionNode, index: number): void;
    insert(node: IExpressionNode, index: number): void;
    add(node: IExpressionNode): void;
    render(): any;
}
