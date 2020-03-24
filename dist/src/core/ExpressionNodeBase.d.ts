import { IExpressionNodeBase } from "@/core/Interfaces";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
export declare const connectionTypes: {
    AND: string;
    OR: string;
};
export declare const connectionTypesArray: string[];
export default class ExpressionNodeBase implements IExpressionNodeBase {
    private _connectionType;
    private _parentNode?;
    constructor(connectionType?: string, parentNode?: ExpressionNodeGroup);
    get parentNode(): ExpressionNodeGroup | undefined;
    set parentNode(val: ExpressionNodeGroup | undefined);
    set connectionType(value: string);
    get connectionType(): string;
}
