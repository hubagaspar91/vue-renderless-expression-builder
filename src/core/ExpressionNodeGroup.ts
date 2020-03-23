import {
  ICondition,
  IExpressionNode,
  IExpressionNodeGroupJSON,
  IExpressionNodeGroupOpts, IExpressionNodeJSON,
  isIExpressionNode
} from "@/core/Interfaces";
import ExpressionNode from "@/core/ExpressionNode";
import ExpressionNodeBase, {connectionTypes} from "@/core/ExpressionNodeBase";

/**
 * Factory fn, returning the default opts object for an ExpressionNodeGroup
 */
const defaultOpts = () => ({maxDepth: 0, currentDepth: 0, children: []});

export default class ExpressionNodeGroup extends ExpressionNodeBase implements IExpressionNode {
  private _children: IExpressionNode[] = [];
  private _maxDepth: number = 0;
  private _currentDepth: number = 0;

  constructor(opts: IExpressionNodeGroupOpts = defaultOpts(),
              connectionType?: string,
              parentNode?: ExpressionNodeGroup) {
    super(connectionType, parentNode);
    opts = {...defaultOpts(), ...opts};
    this.children = opts.children as IExpressionNode[];
    this.maxDepth = opts.maxDepth as number;
    this.currentDepth = opts.currentDepth as number;
  }

  set children(value: IExpressionNode[]) {
    this._children = value.map(node => {
      if (isIExpressionNode(node)) {
        node.parentNode = this;
        return node;
      }
      else throw new Error("Node must by ExpressionNode or ExpressionNodeGroup, got type: " + typeof node);
    });
  }

  get children(): IExpressionNode[] {
    return this._children;
  }

  set maxDepth(value: number) {
    if (!this.parentNode || value == this.parentNode.maxDepth)
      this._maxDepth = value;
    else
      throw new Error("maxDepth cannot be different from that of the parentNode.")
  }

  get maxDepth() {
    return this._maxDepth;
  }

  /**
   * Current depth must be 0 or larger by one than that of the parentNode
   * @param value
   */
  set currentDepth(value: number) {
    if (!this.parentNode && value == 0 || this.parentNode && value - 1 == this.parentNode.currentDepth)
      this._currentDepth = value;
    else
      throw new Error("Invalid current depth value " + value);
  }

  get currentDepth() {
    return this._currentDepth;
  }


  /**
   * Recursively creates a JSON representation of the expression tree
   */
  toJSON(addMaxDepth = true): IExpressionNodeGroupJSON {
    return Object.assign((addMaxDepth ? {maxDepth: this._maxDepth} : {}), {
      connectionType: this.connectionType,
      children: this._children.map(c => c.toJSON(false))
    });
  }

  static isJSONInstance(object: object): object is IExpressionNodeGroupJSON {
    return "children" in object;
  }

  static fromJSON(json: IExpressionNodeGroupJSON,
                  parentNode?: ExpressionNodeGroup,
                  currentDepth = 0): ExpressionNodeGroup {
    const maxDepth = parentNode == undefined  // if top level node
      ? json.maxDepth != undefined  // and max depth is defined
        ? json.maxDepth  // use max depth
        : undefined  // else get default from constructor
      : parentNode.maxDepth;  // if parent node is defined, maxDepth is to be copied from it

    const newGroup = new ExpressionNodeGroup({maxDepth, currentDepth}, json.connectionType, parentNode);
    newGroup.children = json.children.map(cJSON => (ExpressionNodeGroup.isJSONInstance(cJSON))
      ? ExpressionNodeGroup.fromJSON(cJSON as IExpressionNodeGroupJSON, newGroup, currentDepth + 1)
      : ExpressionNode.fromJSON(cJSON as IExpressionNodeJSON, newGroup));
    return newGroup;
  }

  /**
   * Flattens the expression, to a 1 depth array of arrays
   * Where the elements of each array are connected by AND
   * and the arrays are connected by OR
   * This means, the output can be interpreted simply as
   *
   * flattened.some(flattened.map(group => group.every(validateNode)), n => n)
   *
   * It can be used for client side list filtering
   */
  flatten(): Array<ICondition[]> {
    let currentGroup: ICondition[] = [];
    let flattenedList: Array<ICondition[]> = [];
    this.children.forEach(c => {
      if (c instanceof ExpressionNode) {
        if (c.connectionType === connectionTypes.OR) {
          if (currentGroup.length > 0)
            flattenedList.push(currentGroup);
          currentGroup = [Object.assign({}, c.condition)]
        } else currentGroup.push(Object.assign({}, c.condition));
      } else if (c instanceof ExpressionNodeGroup) {
        if (c.children.length > 0) {
          if (currentGroup.length > 0) {
            flattenedList.push(currentGroup);
            currentGroup = [];
          }
          if (c.connectionType === connectionTypes.AND) {
            const newFlattenedList: Array<ICondition[]> = [];
            c.flatten().forEach((g) => {
              if (flattenedList.length > 0)
                flattenedList.forEach(flg => {
                  newFlattenedList.push([...flg, ...g]);
                });
              else newFlattenedList.push(g);
            });
            flattenedList = newFlattenedList;
          } else
            flattenedList = [...flattenedList, ...c.flatten()]
        }
      } else throw new Error("Node cannot be of type " + typeof c);
    });
    if (currentGroup.length > 0)
      flattenedList.push(currentGroup);
    return flattenedList;
  }
}
