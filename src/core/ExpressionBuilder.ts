import {ExpressionNode, ExpressionNodeGroup} from "@/core/ExpressionNodes";
import {ICondition, IExpressionNode, IExpressionNodeGroupJSON} from "@/core/Interfaces";

const GROUP = "group";
const NODE = "node";

interface ClassConstructors {
  [index: string]: Function;
}

const classes: ClassConstructors = {
  [GROUP]: (connectionType?: string) => new ExpressionNodeGroup(undefined, connectionType),
  [NODE]: (condition: ICondition, connectionType?: string) => new ExpressionNode(condition, connectionType)
};

export default class ExpressionBuilder {
  private readonly _root: ExpressionNodeGroup;
  private _context: ExpressionNodeGroup;

  static GROUP = GROUP;
  static NODE = NODE;

  constructor(root?: ExpressionNodeGroup | IExpressionNodeGroupJSON) {
    this._root = root
      ? ExpressionNodeGroup.isJSONInstance(root)
        ? ExpressionNodeGroup.fromJSON(root)
        : root
      : new ExpressionNodeGroup();
    this._context = this._root;
  }

  private _validateIndex(index?: number): boolean {
    return Boolean(index == undefined || (index >= 0 || index < this._context.children.length - 1));
  }

  private _fluentInsertion(node: IExpressionNode, operation: Function, index?: number): ExpressionBuilder {
    let newContext;
    // if valid index
    if (this._validateIndex(index)) {
      node.parentNode = this._context;
      // If group, check if will reach max depth
      if (node instanceof ExpressionNodeGroup) {
        if (this._context.currentDepth === (this._context.maxDepth - 1))
          throw new Error("Reached max depth, cannot add new child node.");
        node.maxDepth = this._context.maxDepth;
        node.currentDepth = this._context.currentDepth + 1;
        newContext = node;
      }
      operation(node, index);
      this._context = newContext ? newContext : this._context;
      return this;
    }
    throw new Error("Invalid index " + index);
  }

  private _insert(node: IExpressionNode, index: number): void {
    this._context.children.splice(index, 0, node);
  }

  insert(node: IExpressionNode, index: number) {
    return this._fluentInsertion(node, this._insert.bind(this), index);
  }

  private _add(node: IExpressionNode): void {
    this._context.children.push(node);
  }

  add(node: IExpressionNode) {
    return this._fluentInsertion(node, this._add.bind(this));
  }

  private _set(node: IExpressionNode, index: number): void {
    this._context.children.splice(index, 1, node);
  }

  set(node: IExpressionNode, index: number) {
    return this._fluentInsertion(node, this._set.bind(this), index);
  }

  delete(index: number) {
    if (this._validateIndex(index)) {
      this._context.children.splice(index, 1);
      return this;
    }
    throw new Error("Invalid index " + index);
  }

  private static _new(type: string, operation: Function, index?: number, connectionType?: string, condition?: ICondition) {
    if (type in classes) {
      let newNode;
      if (type == GROUP)
        newNode = classes[type](connectionType);
      else if (type == NODE)
        newNode = classes[type](condition, connectionType);

      return operation(newNode, index);
    }
    throw new Error("Invalid node type " + type);
  }

  addNew(type: string, connectionType?: string, condition?: ICondition) {
    return ExpressionBuilder._new(type, this.add.bind(this), undefined, connectionType, condition);
  }

  insertNew(type: string, index: number, connectionType?: string, condition?: ICondition) {
    return ExpressionBuilder._new(type, this.insert.bind(this), index, connectionType, condition);
  }

  setNew(type: string, index: number, connectionType?: string, condition?: ICondition) {
    return ExpressionBuilder._new(type, this.set.bind(this), index, connectionType, condition);
  }

  contextUp() {
    if (this._context.parentNode)
      this._context = this._context.parentNode;
    return this;
  }

  contextToRoot() {
    this._context = this._root;
    return this;
  }

  private static seekContext(path: number[], root: ExpressionNodeGroup, pathIndex = 0): ExpressionNodeGroup | null {
    // if at the end of the provided path
    const foundNode = root.children[path[pathIndex]];
    if (foundNode && foundNode instanceof ExpressionNodeGroup) {
      if (pathIndex == path.length - 1)
        return foundNode;
      else
        return ExpressionBuilder.seekContext(path, foundNode, pathIndex + 1);
    }
    throw new Error("Invalid path: " + path.join(", "));
  }

  contextTo(path: number[]): ExpressionBuilder {
    const newContext = ExpressionBuilder.seekContext(path, this._root);
    this._context = newContext ? newContext : this._context;
    return this;
  }

  toJSON(): IExpressionNodeGroupJSON {
    return this._root.toJSON();
  }

  flatten(): Array<ICondition[]> {
    return this._root.flatten();
  }
}