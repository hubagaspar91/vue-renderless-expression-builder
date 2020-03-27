import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import { IExpressionNode } from "@/core/Interfaces";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
export default class ExpressionNodeGroupRenderless extends ExpressionNodeBase {
    /**
     * The node group, represented by the current Vue component instance
     */
    node: ExpressionNodeGroup;
    /**
     * Initializes the insertion of {node}, to the {index} index of the parent ExpressionNodeGroup
     * Emits and event towards the parent ExpressionBuilderRenderless
     * @param node
     * @param index
     */
    insert(node: IExpressionNode, index: number): void;
    /**
     * Initializes the addition of node or node group, by pushing it to the children list of the parent ExpressionNodeGroup
     * Emits and event towards the parent ExpressionBuilderRenderless
     * @param node
     */
    private add;
    /**
     * Initializes the addition of a node with the default condition, returned by the ConditionProvider instance
     * injected from the parent ExpressionBuilderRenderless
     */
    addNode(condition?: object): void;
    /**
     * Initializes the addition of an empty node group with the default condition, returned by the ConditionProvider instance
     * injected from the parent ExpressionBuilderRenderless
     */
    addGroup(): void;
    /**
     * Toggles the connection type (and - or) between its child nodes
     */
    toggleConnectionType(): void;
    render(): any;
}
