import { IExpressionNode } from "@/core/Interfaces";
export interface InputEventBody {
    node: IExpressionNode;
    path: number[];
    action: string;
}
export declare const actionTypes: {
    ADD: string;
    INSERT: string;
    SET: string;
    DELETE: string;
    ADD_NEW: string;
    INSERT_NEW: string;
    SET_NEW: string;
};
