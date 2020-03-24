import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import { IExpressionNode } from "@/core/Interfaces";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
export default class ExpressionNodeGroupRenderless extends ExpressionNodeBase {
    protected node: ExpressionNodeGroup;
    insert(node: IExpressionNode, index: number): void;
    private add;
    addNode(): void;
    addGroup(): void;
    toggleConnectionType(): void;
    render(): any;
}
