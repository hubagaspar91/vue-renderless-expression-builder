import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import ExpressionNode from "@/core/ExpressionNode";
export default class ExpressionNodeRenderless extends ExpressionNodeBase {
    /**
     * The node, represented by the current Vue component instance
     */
    node: ExpressionNode;
    /**
     * Emits an event towards the parent ExpressionBuilderRenderless, initializing
     * the update of its condition
     * @param condition
     * @private
     */
    private update;
    /**
     * Creates a new condition with the ConditionProvider, injected from the parent ExpressionBuilderRenderless
     * and sends an event to execute the update
     * @param fieldName
     * @param operator
     * @param value
     */
    updateCondition(fieldName: string, operator: string, value: string): void;
    render(): any;
}
