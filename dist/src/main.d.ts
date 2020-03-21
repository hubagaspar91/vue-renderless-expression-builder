import ExpressionBuilder from "@/core/ExpressionBuilder";
import { ExpressionNode, ExpressionNodeGroup } from "@/core/ExpressionNodes";
export declare const Core: {
    ExpressionBuilder: typeof ExpressionBuilder;
    ExpressionNodeGroup: typeof ExpressionNodeGroup;
    ExpressionNode: typeof ExpressionNode;
};
export declare const Components: {
    ExpressionBuilderRenderless: typeof import("./components/ExpressionBuilderRenderless").default;
    ExpressionNodeRenderless: typeof import("./components/ExpressionNodeRenderless").default;
    ExpressionNodeGroupRenderless: typeof import("./components/ExpressionNodeGroupRenderless").default;
};
