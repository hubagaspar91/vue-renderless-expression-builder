import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import ExpressionNode from "@/core/ExpressionNode";
export default class ExpressionNodeRenderless extends ExpressionNodeBase {
    /**
     * The node, represented by the current Vue component instance
     */
    node: ExpressionNode;
    /**
     * Updates the condition in place and signals the ExpressionBuilderRenderless through events
     * @param fieldName
     * @param operator
     * @param value
     */
    updateCondition(fieldName: string, operator: string, value: string): void;
    render(): any;
}
