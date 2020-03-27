import { Vue } from "vue-property-decorator";
import { IExpressionNode } from "@/core/Interfaces";
import ConditionFactory from "@/conditions/ConditionFactory";
export default class ExpressionNodeBase extends Vue {
    /**
     * The node or node group, represented by the current Vue component instance
     */
    node: IExpressionNode;
    /**
     * Injected eventHub to communicate with its parent ExpressionBuilderRenderless
     */
    eventHub: Vue;
    /**
     * Injected conditionProvider to create and update conditions of individual nodes
     */
    conditionFactory: ConditionFactory;
    /**
     * Emit an input event towards the parent ExpressionBuilderRenderless, that initializes a change
     * in the nested expression structure
     * @param node
     * @param action
     * @param index
     */
    emitInput(node?: IExpressionNode, action?: string, index?: number): void;
    /**
     * Initializes the deletion of the current node
     */
    emitDelete(): void;
    get index(): number;
}
