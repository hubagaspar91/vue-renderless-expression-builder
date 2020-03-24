import {
  ICondition,
  IExpressionNode,
  IExpressionNodeGroupJSON,
  IExpressionNodeGroupOpts, IExpressionNodeJSON,
  isIExpressionNode
} from "@/core/Interfaces";
import ExpressionNode from "@/core/ExpressionNode";
import ExpressionNodeBase from "@/core/ExpressionNodeBase";

export const connectionTypes = {
  AND: "and",
  OR: "or"
};

export const connectionTypesArray = Object.values(connectionTypes);

/**
 * Factory fn, returning the default opts object for an ExpressionNodeGroup
 */
const defaultOpts = () => ({maxDepth: 0, currentDepth: 0, children: [], connectionType: connectionTypes.AND});

export default class ExpressionNodeGroup extends ExpressionNodeBase implements IExpressionNode {
  private _children: IExpressionNode[] = [];
  private _maxDepth: number = 0;
  private _currentDepth: number = 0;
  private _connectionType: string = connectionTypes.AND;

  constructor(opts: IExpressionNodeGroupOpts = defaultOpts(),
              parentNode?: ExpressionNodeGroup) {
    super(parentNode);
    opts = {...defaultOpts(), ...opts};
    this.children = opts.children as IExpressionNode[];
    this.maxDepth = opts.maxDepth as number;
    this.currentDepth = opts.currentDepth as number;
    this.connectionType = opts.connectionType as string;
  }

  set connectionType(value: string) {
    if (Object.values(connectionTypesArray).includes(value))
      this._connectionType = value;
    else
      throw new Error("ConnectionType not supported, possible values: " + connectionTypesArray.join(", "));
  }

  get connectionType() {
    return this._connectionType;
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
    return "children" in object && "connectionType" in object;
  }

  static fromJSON(json: IExpressionNodeGroupJSON,
                  parentNode?: ExpressionNodeGroup,
                  currentDepth = 0): ExpressionNodeGroup {
    const maxDepth = parentNode == undefined  // if top level node
      ? json.maxDepth != undefined  // and max depth is defined
        ? json.maxDepth  // use max depth
        : undefined  // else get default from constructor
      : parentNode.maxDepth;  // if parent node is defined, maxDepth is to be copied from it

    const newGroup = new ExpressionNodeGroup({maxDepth, currentDepth, connectionType: json.connectionType}, parentNode);
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
    let flattenedList: Array<ICondition[]> = this.connectionType === connectionTypes.AND
      ? [[]]
      : [];
    let nodes = this.children.filter(c => c instanceof ExpressionNode) as ExpressionNode[];
    let groups: ExpressionNodeGroup[] =
      this.children.filter(c => c instanceof ExpressionNodeGroup) as ExpressionNodeGroup[];
    nodes.forEach(node => {
      if (this.connectionType == connectionTypes.AND)
        flattenedList[0].push(node.toJSON());
      else
        flattenedList.push([node.toJSON()]);
    });
    groups.forEach(group => {
      if (this.connectionType == connectionTypes.AND) {
        let newFlattenedList: Array<ICondition[]> = [];
        flattenedList.forEach(conditionGroup =>
          group.flatten().forEach(conditionGroupInner =>
            newFlattenedList.push([...conditionGroup, ...conditionGroupInner])));
        flattenedList = newFlattenedList;
      } else flattenedList = [...flattenedList, ...group.flatten()];
    });
    return flattenedList;
  }
}
