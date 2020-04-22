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

Object.freeze(connectionTypes);
Object.freeze(connectionTypesArray);

/**
 * Validate, whether a nodeGroup to be added, can be added, without its children exceeding the maxDepth
 * If the maxDepth is 3 and the currentDepth is 2
 * A new nodeGroup cannot be added, as its children will be in depth 4
 * If nodeGroup maxDepth is 0, there is no depth limit
 * @param maxDepth
 * @param currentDepth
 * @param groupToInsert
 */
export const validateProposedDepth = (maxDepth: number, currentDepth: number, groupToInsert: ExpressionNodeGroup) => {
  return Boolean(maxDepth == 0 || maxDepth > currentDepth + getNodeGroupDepth(groupToInsert))
};

/**
 * Takes a node group, traverses it's children recursively, and determines its depth
 * @param group
 */
export const getNodeGroupDepth = (group: ExpressionNodeGroup) => {
  let depth = 1;  // by default, it adds one depth to the place of insertion
  let childDepths: number[] = [0];  // start with zero, to return zero in case of 0 length children array
  group.children.forEach(child => {
    if (child instanceof ExpressionNodeGroup)
      childDepths.push(getNodeGroupDepth(child))
  });
  return depth + Math.max(...childDepths);
};

/**
 * Factory fn, returning the default opts object for an ExpressionNodeGroup
 */
const defaultOpts = () => ({maxDepth: 0, currentDepth: 0, children: [], connectionType: connectionTypes.AND});

export default class ExpressionNodeGroup extends ExpressionNodeBase implements IExpressionNode {
  private _children: IExpressionNode[] = [];
  private _maxDepth = 0;
  private _currentDepth = 0;
  private _connectionType: string = connectionTypes.AND;

  constructor(opts: IExpressionNodeGroupOpts = defaultOpts(),
              parentNode?: ExpressionNodeGroup) {
    super(parentNode);
    opts = {...defaultOpts(), ...opts};
    this.children = opts.children as IExpressionNode[];
    this._maxDepth = opts.maxDepth as number;
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

  /**
   * Setting children of the nodeGroup, but validating the input list, to
   * - only contain IExpressionNode objects
   * - not lead to exceeding the maxDepth defined on the current group
   *
   * Also setting the current nodeGroup instance as parent of the children
   *
   * this only executes when the children key is reassigned, for instance when manipulating
   * the expression with 3rd party drag & drop libs
   *
   * @param value {IExpressionNode}
   */
  set children(value: IExpressionNode[]) {
    this._children = value.map(node => {
      if (isIExpressionNode(node)) {
        if (node instanceof ExpressionNodeGroup) {
          if (!validateProposedDepth(this.maxDepth, this.currentDepth, node))
            throw new Error("Cannot add group to group, as its children would exceed the maxDepth " + this.maxDepth);
          node.parentNode = this;
          node.maxDepth = this.maxDepth;
          node.currentDepth = this.currentDepth + 1;
        } else node.parentNode = this;
        // adding self as parentNode to all new children, to maintain consistency
        return node;
      }
      else throw new Error("Node must be ExpressionNode or ExpressionNodeGroup, got type: " + typeof node);
    });
  }

  get children(): IExpressionNode[] {
    return this._children;
  }

  /**
   * Max depth of root shouldn't be changed after the object is initialized
   * @param value
   */
  set maxDepth(value: number) {
    if (this.parentNode) {
      if (value == this.parentNode.maxDepth)
        this._maxDepth = value;
      else
        throw new Error("maxDepth cannot be different from that of the parentNode.")
    } else throw new Error("maxDepth of root cannot be set after initialization")
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
    return !(object instanceof ExpressionNodeGroup) && "children" in object && "connectionType" in object;
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
   * This means, the output can be used for client side list filtering, as:
   *
   * list.filter(elem => flattened.map(group => group.every(condition => validateCondition(condition, elem))).some(groupIsTrue => groupIsTrue))
   *
   *  -> where
   *  -> list is the list of values to filter based on the expression
   *  -> elem is an elem in the list
   *  -> flattened is the flattened expression
   *  -> group is a group of conditions in the flattened expression, between which there is an 'and' connection
   *  -> condition is an object describing a single condition (lastName === "John")
   *  -> validateCondition is a function returning a bool, validating a condition against an elem
   *  -> groupIsTrue a bool, whether all conditions in a group were validated to true, if one group validates to true, the whole expression is true
   */
  flatten(): Array<ICondition[]> {
    let flattenedList: Array<ICondition[]> = this.connectionType === connectionTypes.AND ? [[]] : [];
    const nodes = this.children.filter(c => c instanceof ExpressionNode) as ExpressionNode[];
    const groups: ExpressionNodeGroup[] =
      this.children.filter(c => c instanceof ExpressionNodeGroup) as ExpressionNodeGroup[];
    nodes.forEach(node => {
      if (this.connectionType == connectionTypes.AND)
        flattenedList[0].push(node.toJSON());
      else
        flattenedList.push([node.toJSON()]);
    });
    groups.forEach(group => {
      if (this.connectionType == connectionTypes.AND) {
        const newFlattenedList: Array<ICondition[]> = [];
        flattenedList.forEach(conditionGroup =>
          group.flatten().forEach(conditionGroupInner =>
            newFlattenedList.push([...conditionGroup, ...conditionGroupInner])));
        flattenedList = newFlattenedList;
      } else flattenedList = [...flattenedList, ...group.flatten()];
    });
    return flattenedList;
  }
}
