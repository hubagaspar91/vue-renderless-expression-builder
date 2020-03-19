import {
  IExpressionNode,
  IExpressionNodeBase,
  IExpressionNodeGroupJSON,
  IExpressionNodeGroupOpts,
  IExpressionNodeJSON,
  ICondition
} from "@/core/Interfaces";

export const connectionTypes = {
  AND: "and",
  OR: "or"
};

export const connectionTypesArray = Object.values(connectionTypes);


class ExpressionNodeBase implements IExpressionNodeBase {
  private _connectionType: string = connectionTypes.AND;
  public parentNode?: ExpressionNodeGroup;

  constructor(connectionType: string = connectionTypes.AND, parentNode?: ExpressionNodeGroup) {
    this.connectionType = connectionType;
    this.parentNode = parentNode;
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

}

/**
 * Node object, describing a condition
 */
export class ExpressionNode extends ExpressionNodeBase implements IExpressionNode {
  public condition: ICondition;

  constructor(condition: ICondition,
              connectionType?: string,
              parentNode?: ExpressionNodeGroup) {
    super(connectionType, parentNode);
    this.condition = condition;
  }

  /**
   * Exports the data as JSON
   */
  toJSON(): IExpressionNodeJSON {
    return {
      connectionType: this.connectionType,
      condition: {...this.condition}
    }
  }

  /**
   * Checks, whether an Object is a valid JSON instance to construct an ExpressionNode from
   * @param object
   */
  static isJSONInstance(object: object): object is IExpressionNodeJSON {
    return "condition" in object;
  }

  /**
   * Constructs an ExpressionNode from a JSON representation
   * @param json
   * @param parentNode
   */
  static fromJSON(json: IExpressionNodeJSON, parentNode?: ExpressionNodeGroup): ExpressionNode {
    return new ExpressionNode(json.condition, json.connectionType, parentNode)
  }
}

const defaultOpts = () => ({maxDepth: 0, currentDepth: 0, children: []});

export class ExpressionNodeGroup extends ExpressionNodeBase implements IExpressionNode {
  private _children: IExpressionNode[];
  private _maxDepth: number;
  private _currentDepth: number;

  constructor(opts: IExpressionNodeGroupOpts = defaultOpts(),
              connectionType?: string,
              parentNode?: ExpressionNodeGroup) {
    super(connectionType, parentNode);
    opts = {...defaultOpts(), ...opts};
    this._children = opts.children as IExpressionNode[];
    this._maxDepth = opts.maxDepth as number;
    this._currentDepth = opts.currentDepth as number;
  }

  set children(value: IExpressionNode[]) {
    this._children = value;
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
  toJSON(addMAxDepth: boolean = true): IExpressionNodeGroupJSON {
    return Object.assign((addMAxDepth ? {maxDepth: this._maxDepth} : {}), {
      connectionType: this.connectionType,
      children: this._children.map(c => c.toJSON(false))
    });
  }

  static isJSONInstance(object: object): object is IExpressionNodeGroupJSON {
    return "children" in object;
  }

  static fromJSON(json: IExpressionNodeGroupJSON, parentNode?: ExpressionNodeGroup, currentDepth = 0): ExpressionNodeGroup {
    const maxDepth = parentNode == undefined  // if top level node
      ? json.maxDepth != undefined  // and max depth is defined
        ? json.maxDepth  // use max depth
        : undefined  // else get default from constructor
      : parentNode.maxDepth;  // if parent node is defined, maxDepth is to be copied from it

    const newGroup = new ExpressionNodeGroup({maxDepth, currentDepth}, json.connectionType, parentNode);
    console.log(json);
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
   * flattened.find(flattened.map(group => group.every(validateNode)), n => n)
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
