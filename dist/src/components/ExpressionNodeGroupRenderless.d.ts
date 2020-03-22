import * as Core from "@/core/ExpressionNodes";
import ExpressionNodeBase from "@/components/ExpressionNodeBase";
import { ICondition } from "@/core/Interfaces";
export default class ExpressionNodeGroupRenderless extends ExpressionNodeBase {
    protected node: Core.ExpressionNodeGroup;
    private set;
    private insert;
    private add;
    private groupInsertionWrapper;
    private nodeInsertionWrapper;
    setNode(condition: ICondition, index: number, connectionType?: string): void;
    setGroup(index: number, connectionType?: string): void;
    insertNode(condition: ICondition, index: number, connectionType?: string): void;
    insertGroup(index: number, connectionType?: string): void;
    addNode(condition: ICondition, connectionType?: string): void;
    addGroup(connectionType?: string): void;
    render(): any;
}
