import {ExpressionNodeGroup} from "@/core/ExpressionNodes";
import {ICondition, IExpressionNode, IExpressionNodeGroupJSON} from "@/core/Interfaces";

const GROUP = "group";
const NODE = "node";

export default class ExpressionBuilder {
  public readonly root: ExpressionNodeGroup;
  private _context: ExpressionNodeGroup;

  static GROUP = GROUP;
  static NODE = NODE;

  constructor(root?: ExpressionNodeGroup | IExpressionNodeGroupJSON) {
    this.root = root
      ? ExpressionNodeGroup.isJSONInstance(root)
        ? ExpressionNodeGroup.fromJSON(root)
        : root
      : new ExpressionNodeGroup();
    this._context = this.root;
  }

  get context() {
    return this._context;
  }

  private _validateIndex(index?: number): boolean {
    return Boolean(index == undefined
      || (index >= 0 && index <= this._context.children.length));
  }

  private _fluentInsertion(node: IExpressionNode, operation: Function, index?: number): ExpressionBuilder {
    let newContext;
    // if valid index
    if (this._validateIndex(index)) {
      node.parentNode = this._context;
      // If group, check if will reach max depth
      if (node instanceof ExpressionNodeGroup) {
        if (this._context.maxDepth > 0 && this._context.currentDepth === (this._context.maxDepth - 2))
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

  contextUp() {
    if (this._context.parentNode)
      this._context = this._context.parentNode;
    return this;
  }

  contextToRoot() {
    this._context = this.root;
    return this;
  }

  /**
   *
   * @param path {Number[]} - describes a path to the ExpressionNodeGroup in the tree, that is to be set as context
   * @param root
   * @param pathIndex
   */
  private static seekContext(path: number[], root: ExpressionNodeGroup, pathIndex = 0): ExpressionNodeGroup | null {
    if (path.length == 0) return null;
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
    const newContext = ExpressionBuilder.seekContext(path, this.root);
    this._context = newContext ? newContext : this._context;
    return this;
  }

  toJSON(): IExpressionNodeGroupJSON {
    return this.root.toJSON();
  }

  flatten(): Array<ICondition[]> {
    return this.root.flatten();
  }
}