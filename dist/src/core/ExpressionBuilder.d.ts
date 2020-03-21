import { ExpressionNodeGroup } from "@/core/ExpressionNodes";
import { ICondition, IExpressionNode, IExpressionNodeGroupJSON } from "@/core/Interfaces";
export default class ExpressionBuilder {
    readonly root: ExpressionNodeGroup;
    private _context;
    static GROUP: string;
    static NODE: string;
    constructor(root?: ExpressionNodeGroup | IExpressionNodeGroupJSON);
    get context(): ExpressionNodeGroup;
    private _validateIndex;
    private _fluentInsertion;
    private _insert;
    insert(node: IExpressionNode, index: number): ExpressionBuilder;
    private _add;
    add(node: IExpressionNode): ExpressionBuilder;
    private _set;
    set(node: IExpressionNode, index: number): ExpressionBuilder;
    delete(index: number): this;
    private static _new;
    addNew(type: string, connectionType?: string, condition?: ICondition): any;
    insertNew(type: string, index: number, connectionType?: string, condition?: ICondition): any;
    setNew(type: string, index: number, connectionType?: string, condition?: ICondition): any;
    contextUp(): this;
    contextToRoot(): this;
    /**
     *
     * @param path {Number[]} - describes a path to the ExpressionNodeGroup in the tree, that is to be set as context
     * @param root
     * @param pathIndex
     */
    private static seekContext;
    contextTo(path: number[]): ExpressionBuilder;
    toJSON(): IExpressionNodeGroupJSON;
    flatten(): Array<ICondition[]>;
}
