import ExpressionBuilder from "@/core/ExpressionBuilder";
import ExpressionNode from "@/core/ExpressionNode";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
export declare const Core: {
    ExpressionBuilder: typeof ExpressionBuilder;
    ExpressionNodeGroup: typeof ExpressionNodeGroup;
    ExpressionNode: typeof ExpressionNode;
    ErrorTypes: {
        MAX_DEPTH_REACHED: string;
        INVALID_INDEX_INSERT: string;
        INVALID_INDEX_DELETE: string;
        INVALID_CONTEXT_PATH: string;
    };
};
export declare const Components: {
    ExpressionBuilderRenderless: typeof import("./components/ExpressionBuilderRenderless").default;
    ExpressionNodeRenderless: typeof import("./components/ExpressionNodeRenderless").default;
    ExpressionNodeGroupRenderless: typeof import("./components/ExpressionNodeGroupRenderless").default;
};
export declare const Conditions: {
    ConditionFactory: typeof import("./conditions/ConditionFactory").default;
    Defaults: {
        returnDefaultOperators: () => import("./conditions/Interfaces").ConditionFactoryOperator[];
        returnDefaultFieldTypes: () => import("./conditions/Interfaces").ConditionFactoryFieldTypeDefinition[];
    };
};
