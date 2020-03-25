import {ICondition, IExpressionNode, IExpressionNodeGroupJSON} from "@/core/Interfaces";
import errorTypes, {handleError} from "@/core/Errors";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";

export default class ExpressionBuilder {
  public readonly root: ExpressionNodeGroup;
  private readonly errorHandler?: Function;
  private _context: ExpressionNodeGroup;

  constructor(root?: ExpressionNodeGroup | IExpressionNodeGroupJSON, errorHandler?: Function) {
    this.root = root  // if root is defined
      ? ExpressionNodeGroup.isJSONInstance(root)  // and is a json representation
        ? ExpressionNodeGroup.fromJSON(root)  // parse it
        : root  // else use root as root, as it's an ExpressionNodeGroup
      : new ExpressionNodeGroup();  // else create an empty ExpressionNodeGroup
    this._context = this.root;
    this.errorHandler = errorHandler;
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
        if (this.context.maxDepth > 0 && this.context.currentDepth >= (this.context.maxDepth - 2)) {
          handleError(errorTypes.MAX_DEPTH_REACHED, this.errorHandler, this.context.maxDepth);
          return this;
        }
        node.maxDepth = this._context.maxDepth;
        node.currentDepth = this._context.currentDepth + 1;
        newContext = node;
      }
      operation(node, index);
      this._context = newContext ? newContext : this._context;
      return this;
    }
    handleError(errorTypes.INVALID_INDEX_INSERT, this.errorHandler, index);
    return this;
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
    if (index >= 0 && index <= this.context.children.length-1)
      this._context.children.splice(index, 1);
    else handleError(errorTypes.INVALID_INDEX_DELETE, this.errorHandler, index);
    return this;
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
  private seekContext(path: number[], root: ExpressionNodeGroup, pathIndex = 0): ExpressionNodeGroup {
    const foundNode = root.children[path[pathIndex]];
    if (foundNode && foundNode instanceof ExpressionNodeGroup) {
      if (pathIndex == path.length - 1)
        return foundNode;
      else
        return this.seekContext(path, foundNode, pathIndex + 1);
    }
    if (path.length > 0) // if path is not empty, but no node group found, error
      handleError(errorTypes.INVALID_CONTEXT_PATH, this.errorHandler, path);
    return this.root;  // return root if [] is the path
  }

  contextTo(path: number[] = []): ExpressionBuilder {
    this._context = this.seekContext(path, this.root);
    return this;
  }

  toJSON(): IExpressionNodeGroupJSON {
    return this.root.toJSON();
  }

  flatten(): Array<ICondition[]> {
    return this.root.flatten();
  }
}