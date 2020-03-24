import { IExpressionNodeBase } from "@/core/Interfaces";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
export default class ExpressionNodeBase implements IExpressionNodeBase {
    private _parentNode?;
    constructor(parentNode?: ExpressionNodeGroup);
    get parentNode(): ExpressionNodeGroup | undefined;
    set parentNode(val: ExpressionNodeGroup | undefined);
}
