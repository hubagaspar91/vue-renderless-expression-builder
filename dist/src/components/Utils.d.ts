import { IExpressionNode } from "@/core/Interfaces";
export interface InputEventBody {
    node: IExpressionNode;
    path: number[];
    action: string;
}
export declare const actionTypes: {
    ADD: string;
    INSERT: string;
    DELETE: string;
    UPDATED: string;
};
