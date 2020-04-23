import { __decorate } from 'tslib';
import { Vue, Prop, Provide, Component, Inject } from 'vue-property-decorator';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

var _errorTypeMessageFact;

var errorTypes = {
  MAX_DEPTH_REACHED: "maxDepthReached",
  INVALID_INDEX_INSERT: "invalidIndexInsert",
  INVALID_INDEX_DELETE: "invalidIndexDelete",
  INVALID_CONTEXT_PATH: "invalidContextPath"
};
var errorTypeMessageFactoryMap = (_errorTypeMessageFact = {}, defineProperty(_errorTypeMessageFact, errorTypes.MAX_DEPTH_REACHED, function (maxDepth) {
  return "Cannot add group to group, as its children would exceed the maximum depth ".concat(maxDepth);
}), defineProperty(_errorTypeMessageFact, errorTypes.INVALID_INDEX_INSERT, function (index) {
  return "Cannot insert node to non-existent index: ".concat(index);
}), defineProperty(_errorTypeMessageFact, errorTypes.INVALID_INDEX_DELETE, function (index) {
  return "Cannot delete node from non-existent index: ".concat(index);
}), defineProperty(_errorTypeMessageFact, errorTypes.INVALID_CONTEXT_PATH, function (path) {
  return "Invalid context path [".concat(path.join(", "), "], new context must be an ExpressionNodeGroup node");
}), _errorTypeMessageFact);
Object.freeze(errorTypes);
Object.freeze(errorTypeMessageFactoryMap);
/**
 * Logs the error to the console, and invokes the custom error handler, provided on the ExpressionNodeBuilder instance
 * @param type
 * @param customHandler
 * @param factoryParam
 */

var handleError = function handleError(type, customHandler, factoryParam) {
  var msg = errorTypeMessageFactoryMap[type](factoryParam);
  if (customHandler) customHandler(type, msg);
  console.error(msg);
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var objectSpread2 = _objectSpread2;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var isNativeReflectConstruct = _isNativeReflectConstruct;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

function _createSuper(Derived) {
  return function () {
    var Super = getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return possibleConstructorReturn(this, result);
  };
}

var createSuper = _createSuper;

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

function isIExpressionNode(obj) {
  return "toJSON" in obj && "parentNode" in obj;
}

var ExpressionNodeBase = /*#__PURE__*/function () {
  function ExpressionNodeBase(parentNode) {
    classCallCheck(this, ExpressionNodeBase);

    this.parentNode = parentNode;
  }

  createClass(ExpressionNodeBase, [{
    key: "parentNode",
    get: function get() {
      return this._parentNode;
    },
    set: function set(val) {
      if (val instanceof ExpressionNodeGroup) this._parentNode = val;else if (val != undefined) throw new Error("Parent must be undefined or ExpressionNodeGroup");
    }
  }]);

  return ExpressionNodeBase;
}();

/**
 * Default condition factory for ExpressionNode
 */

var defaultCondition = function defaultCondition() {
  return {
    name: null,
    value: null
  };
};
/**
 * Node object, describing a condition
 */


var ExpressionNode = /*#__PURE__*/function (_ExpressionNodeBase) {
  inherits(ExpressionNode, _ExpressionNodeBase);

  var _super = createSuper(ExpressionNode);

  function ExpressionNode() {
    var _this;

    var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCondition();
    var parentNode = arguments.length > 1 ? arguments[1] : undefined;

    classCallCheck(this, ExpressionNode);

    _this = _super.call(this, parentNode);
    _this._condition = defaultCondition(); // checks for type

    _this.condition = condition;
    return _this;
  }

  createClass(ExpressionNode, [{
    key: "toJSON",

    /**
     * Exports the data as JSON
     */
    value: function toJSON() {
      return JSON.parse(JSON.stringify(this.condition));
    }
    /**
     * Constructs an ExpressionNode from a JSON representation
     * @param json
     * @param parentNode
     */

  }, {
    key: "condition",
    get: function get() {
      return this._condition;
    },
    set: function set(condition) {
      if (condition instanceof Object) this._condition = condition;else throw new Error("Condition must be an object.");
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json, parentNode) {
      return new ExpressionNode(json, parentNode);
    }
  }]);

  return ExpressionNode;
}(ExpressionNodeBase);

var connectionTypes = {
  AND: "and",
  OR: "or"
};
var connectionTypesArray = Object.values(connectionTypes);
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

var validateProposedDepth = function validateProposedDepth(maxDepth, currentDepth, groupToInsert) {
  return Boolean(maxDepth == 0 || maxDepth > currentDepth + getNodeGroupDepth(groupToInsert));
};
/**
 * Takes a node group, traverses it's children recursively, and determines its depth
 * @param group
 */

var getNodeGroupDepth = function getNodeGroupDepth(group) {
  var depth = 1; // by default, it adds one depth to the place of insertion

  var childDepths = [0]; // start with zero, to return zero in case of 0 length children array

  group.children.forEach(function (child) {
    if (child instanceof ExpressionNodeGroup) childDepths.push(getNodeGroupDepth(child));
  });
  return depth + Math.max.apply(Math, childDepths);
};
/**
 * Factory fn, returning the default opts object for an ExpressionNodeGroup
 */

var defaultOpts = function defaultOpts() {
  return {
    maxDepth: 0,
    currentDepth: 0,
    children: [],
    connectionType: connectionTypes.AND
  };
};

var ExpressionNodeGroup = /*#__PURE__*/function (_ExpressionNodeBase) {
  inherits(ExpressionNodeGroup, _ExpressionNodeBase);

  var _super = createSuper(ExpressionNodeGroup);

  function ExpressionNodeGroup() {
    var _this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOpts();
    var parentNode = arguments.length > 1 ? arguments[1] : undefined;

    classCallCheck(this, ExpressionNodeGroup);

    _this = _super.call(this, parentNode);
    _this._children = [];
    _this._maxDepth = 0;
    _this._currentDepth = 0;
    _this._connectionType = connectionTypes.AND;
    opts = objectSpread2({}, defaultOpts(), {}, opts);
    _this.children = opts.children;
    _this._maxDepth = opts.maxDepth;
    _this.currentDepth = opts.currentDepth;
    _this.connectionType = opts.connectionType;
    return _this;
  }

  createClass(ExpressionNodeGroup, [{
    key: "toJSON",

    /**
     * Recursively creates a JSON representation of the expression tree
     */
    value: function toJSON() {
      var addMaxDepth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return Object.assign(addMaxDepth ? {
        maxDepth: this._maxDepth
      } : {}, {
        connectionType: this.connectionType,
        children: this._children.map(function (c) {
          return c.toJSON(false);
        })
      });
    }
  }, {
    key: "flatten",

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
    value: function flatten() {
      var _this2 = this;

      var flattenedList = this.connectionType === connectionTypes.AND ? [[]] : [];
      var nodes = this.children.filter(function (c) {
        return c instanceof ExpressionNode;
      });
      var groups = this.children.filter(function (c) {
        return c instanceof ExpressionNodeGroup;
      });
      nodes.forEach(function (node) {
        if (_this2.connectionType == connectionTypes.AND) flattenedList[0].push(node.toJSON());else flattenedList.push([node.toJSON()]);
      });
      groups.forEach(function (group) {
        if (_this2.connectionType == connectionTypes.AND) {
          var newFlattenedList = [];
          flattenedList.forEach(function (conditionGroup) {
            return group.flatten().forEach(function (conditionGroupInner) {
              return newFlattenedList.push([].concat(toConsumableArray(conditionGroup), toConsumableArray(conditionGroupInner)));
            });
          });
          flattenedList = newFlattenedList;
        } else flattenedList = [].concat(toConsumableArray(flattenedList), toConsumableArray(group.flatten()));
      });
      return flattenedList;
    }
  }, {
    key: "connectionType",
    set: function set(value) {
      if (Object.values(connectionTypesArray).includes(value)) this._connectionType = value;else throw new Error("ConnectionType not supported, possible values: " + connectionTypesArray.join(", "));
    },
    get: function get() {
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

  }, {
    key: "children",
    set: function set(value) {
      var _this3 = this;

      this._children = value.map(function (node) {
        if (isIExpressionNode(node)) {
          if (node instanceof ExpressionNodeGroup) {
            if (!validateProposedDepth(_this3.maxDepth, _this3.currentDepth, node)) throw new Error("Cannot add group to group, as its children would exceed the maxDepth " + _this3.maxDepth);
            node.parentNode = _this3;
            node.maxDepth = _this3.maxDepth;
            node.currentDepth = _this3.currentDepth + 1;
          } else node.parentNode = _this3; // adding self as parentNode to all new children, to maintain consistency


          return node;
        } else throw new Error("Node must be ExpressionNode or ExpressionNodeGroup, got type: " + _typeof_1(node));
      });
    },
    get: function get() {
      return this._children;
    }
    /**
     * Max depth of root shouldn't be changed after the object is initialized
     * @param value
     */

  }, {
    key: "maxDepth",
    set: function set(value) {
      if (this.parentNode) {
        if (value == this.parentNode.maxDepth) this._maxDepth = value;else throw new Error("maxDepth cannot be different from that of the parentNode.");
      } else throw new Error("maxDepth of root cannot be set after initialization");
    },
    get: function get() {
      return this._maxDepth;
    }
    /**
     * Current depth must be 0 or larger by one than that of the parentNode
     * @param value
     */

  }, {
    key: "currentDepth",
    set: function set(value) {
      if (!this.parentNode && value == 0 || this.parentNode && value - 1 == this.parentNode.currentDepth) this._currentDepth = value;else throw new Error("Invalid current depth value " + value);
    },
    get: function get() {
      return this._currentDepth;
    }
  }], [{
    key: "isJSONInstance",
    value: function isJSONInstance(object) {
      return !(object instanceof ExpressionNodeGroup) && "children" in object && "connectionType" in object;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json, parentNode) {
      var currentDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var maxDepth = parentNode == undefined // if top level node
      ? json.maxDepth != undefined // and max depth is defined
      ? json.maxDepth // use max depth
      : undefined // else get default from constructor
      : parentNode.maxDepth; // if parent node is defined, maxDepth is to be copied from it

      var newGroup = new ExpressionNodeGroup({
        maxDepth: maxDepth,
        currentDepth: currentDepth,
        connectionType: json.connectionType
      }, parentNode);
      newGroup.children = json.children.map(function (cJSON) {
        return ExpressionNodeGroup.isJSONInstance(cJSON) ? ExpressionNodeGroup.fromJSON(cJSON, newGroup, currentDepth + 1) : ExpressionNode.fromJSON(cJSON, newGroup);
      });
      return newGroup;
    }
  }]);

  return ExpressionNodeGroup;
}(ExpressionNodeBase);

var ExpressionBuilder = /*#__PURE__*/function () {
  function ExpressionBuilder(root, errorHandler) {
    classCallCheck(this, ExpressionBuilder);

    this.root = root != undefined // if root is defined
    ? ExpressionNodeGroup.isJSONInstance(root) // and is a json representation
    ? ExpressionNodeGroup.fromJSON(root) // parse it
    : root // else use root as root, as it's an ExpressionNodeGroup
    : new ExpressionNodeGroup(); // else create an empty ExpressionNodeGroup

    this._context = this.root;
    this.errorHandler = errorHandler;
  }

  createClass(ExpressionBuilder, [{
    key: "_validateIndex",
    value: function _validateIndex(index) {
      return Boolean(index == undefined || index >= 0 && index <= this._context.children.length);
    }
    /**
     * Wraps an operation, by validating whether
     * - Insertion is done to a valid index
     * - If inserting a group, that its children don't exceed the maxDepth
     * @param node
     * @param operation
     * @param index
     * @private
     */

  }, {
    key: "_fluentInsertion",
    value: function _fluentInsertion(node, operation, index) {
      var newContext; // if valid index

      if (this._validateIndex(index)) {
        // If group, check if will reach max depth
        if (node instanceof ExpressionNodeGroup) {
          if (!validateProposedDepth(this.context.maxDepth, this.context.currentDepth, node)) {
            handleError(errorTypes.MAX_DEPTH_REACHED, this.errorHandler, this.context.maxDepth);
            return this;
          }

          node.parentNode = this._context;
          node.maxDepth = this._context.maxDepth;
          node.currentDepth = this._context.currentDepth + 1;
          newContext = node;
        } else node.parentNode = this._context;

        operation(node, index);
        this._context = newContext ? newContext : this._context;
        return this;
      }

      handleError(errorTypes.INVALID_INDEX_INSERT, this.errorHandler, index);
      return this;
    }
  }, {
    key: "_insert",
    value: function _insert(node, index) {
      this._context.children.splice(index, 0, node);
    }
  }, {
    key: "insert",
    value: function insert(node, index) {
      return this._fluentInsertion(node, this._insert.bind(this), index);
    }
  }, {
    key: "_add",
    value: function _add(node) {
      this._context.children.push(node);
    }
  }, {
    key: "add",
    value: function add(node) {
      return this._fluentInsertion(node, this._add.bind(this));
    }
  }, {
    key: "_set",
    value: function _set(node, index) {
      this._context.children.splice(index, 1, node);
    }
  }, {
    key: "set",
    value: function set(node, index) {
      return this._fluentInsertion(node, this._set.bind(this), index);
    }
  }, {
    key: "delete",
    value: function _delete(index) {
      if (index >= 0 && index <= this.context.children.length - 1) this._context.children.splice(index, 1);else handleError(errorTypes.INVALID_INDEX_DELETE, this.errorHandler, index);
      return this;
    }
  }, {
    key: "contextUp",
    value: function contextUp() {
      if (this._context.parentNode) this._context = this._context.parentNode;
      return this;
    }
  }, {
    key: "contextToRoot",
    value: function contextToRoot() {
      this._context = this.root;
      return this;
    }
    /**
     *
     * @param path {Number[]} - describes a path to the ExpressionNodeGroup in the tree, that is to be set as context
     * @param root
     * @param pathIndex
     */

  }, {
    key: "seekContext",
    value: function seekContext(path, root) {
      var pathIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var foundNode = root.children[path[pathIndex]];

      if (foundNode && foundNode instanceof ExpressionNodeGroup) {
        if (pathIndex == path.length - 1) return foundNode;else return this.seekContext(path, foundNode, pathIndex + 1);
      }

      if (path.length > 0) // if path is not empty, but no node group found, error
        handleError(errorTypes.INVALID_CONTEXT_PATH, this.errorHandler, path);
      return this.root; // return root if [] is the path
    }
  }, {
    key: "contextTo",
    value: function contextTo() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this._context = this.seekContext(path, this.root);
      return this;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.root.toJSON();
    }
  }, {
    key: "flatten",
    value: function flatten() {
      return this.root.flatten();
    }
  }, {
    key: "context",
    get: function get() {
      return this._context;
    }
  }]);

  return ExpressionBuilder;
}();

var actionTypes = {
  ADD: "add",
  INSERT: "insert",
  SET: "set",
  DELETE: "delete",
  UPDATED: "updated"
};
Object.freeze(actionTypes);

var _defaultFieldTypeLabe, _defaultAvailableOper, _defaultOperatorLabel;

/**
 * Default filed types available in the expression builder
 */
var defaultFieldTypes = {
  TEXT: "text",
  DATE: "date",
  NUMBER: "number",
  BOOLEAN: "boolean",
  CHOICE: "radio",
  MULTIPLE_CHOICE: "multipleChoice",
  SELECT: "select"
};
/**
 * Labels (display names) for the default field types
 */

var defaultFieldTypeLabels = (_defaultFieldTypeLabe = {}, defineProperty(_defaultFieldTypeLabe, defaultFieldTypes.TEXT, "text"), defineProperty(_defaultFieldTypeLabe, defaultFieldTypes.DATE, "date"), defineProperty(_defaultFieldTypeLabe, defaultFieldTypes.NUMBER, "number"), defineProperty(_defaultFieldTypeLabe, defaultFieldTypes.BOOLEAN, "boolean"), defineProperty(_defaultFieldTypeLabe, defaultFieldTypes.CHOICE, "radio"), defineProperty(_defaultFieldTypeLabe, defaultFieldTypes.MULTIPLE_CHOICE, "multiple choice"), defineProperty(_defaultFieldTypeLabe, defaultFieldTypes.SELECT, "select"), _defaultFieldTypeLabe);
/**
 * Kind of logical operators available in the expression builder, their place in a condition
 * Field {operator} conditionValue
 */

var defaultOperators = {
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  GREATER_THAN: "graterThan",
  LOWER_THAN: "lowerThan",
  IN: "in",
  NOT_IN: "notIn",
  STARTS_WITH: "startsWith",
  NOT_STARTS_WITH: "notStartsWith",
  ENDS_WITH: "endsWith",
  NOT_ENDS_WITH: "notEndsWith",
  IS_EMPTY: "isEmpty",
  NOT_IS_EMPTY: "notIsEmpty",
  IS_NULL: "isNull",
  NOT_IS_NULL: "notIsNull"
};
/**
 * Lists of default available operators for every default field type
 * Can be extended from input params
 */

var defaultAvailableOperators = (_defaultAvailableOper = {}, defineProperty(_defaultAvailableOper, defaultFieldTypes.TEXT, [defaultOperators.EQUALS, defaultOperators.NOT_EQUALS, defaultOperators.IS_EMPTY, defaultOperators.NOT_IS_EMPTY, defaultOperators.ENDS_WITH, defaultOperators.NOT_ENDS_WITH, defaultOperators.STARTS_WITH, defaultOperators.NOT_STARTS_WITH, defaultOperators.IS_NULL, defaultOperators.NOT_IS_NULL, defaultOperators.IN, defaultOperators.NOT_IN]), defineProperty(_defaultAvailableOper, defaultFieldTypes.DATE, [defaultOperators.EQUALS, defaultOperators.NOT_EQUALS, defaultOperators.IS_NULL, defaultOperators.NOT_IS_NULL, defaultOperators.GREATER_THAN, defaultOperators.LOWER_THAN]), defineProperty(_defaultAvailableOper, defaultFieldTypes.NUMBER, [defaultOperators.EQUALS, defaultOperators.NOT_EQUALS, defaultOperators.IS_NULL, defaultOperators.NOT_IS_NULL, defaultOperators.GREATER_THAN, defaultOperators.LOWER_THAN]), defineProperty(_defaultAvailableOper, defaultFieldTypes.BOOLEAN, [defaultOperators.EQUALS]), defineProperty(_defaultAvailableOper, defaultFieldTypes.CHOICE, [defaultOperators.EQUALS, defaultOperators.NOT_EQUALS]), defineProperty(_defaultAvailableOper, defaultFieldTypes.MULTIPLE_CHOICE, [defaultOperators.IN, defaultOperators.NOT_IN]), defineProperty(_defaultAvailableOper, defaultFieldTypes.SELECT, [defaultOperators.EQUALS, defaultOperators.NOT_EQUALS]), _defaultAvailableOper);
/**
 * Labels (display names) for the default operators
 */

var defaultOperatorLabels = (_defaultOperatorLabel = {}, defineProperty(_defaultOperatorLabel, defaultOperators.EQUALS, "equals"), defineProperty(_defaultOperatorLabel, defaultOperators.NOT_EQUALS, "not equals"), defineProperty(_defaultOperatorLabel, defaultOperators.GREATER_THAN, "greater than"), defineProperty(_defaultOperatorLabel, defaultOperators.LOWER_THAN, "lower than"), defineProperty(_defaultOperatorLabel, defaultOperators.IN, "in"), defineProperty(_defaultOperatorLabel, defaultOperators.NOT_IN, "not in"), defineProperty(_defaultOperatorLabel, defaultOperators.STARTS_WITH, "starts with"), defineProperty(_defaultOperatorLabel, defaultOperators.NOT_STARTS_WITH, "doesn't start with"), defineProperty(_defaultOperatorLabel, defaultOperators.ENDS_WITH, "ends with"), defineProperty(_defaultOperatorLabel, defaultOperators.NOT_ENDS_WITH, "doesn't end with"), defineProperty(_defaultOperatorLabel, defaultOperators.IS_EMPTY, "is empty"), defineProperty(_defaultOperatorLabel, defaultOperators.NOT_IS_EMPTY, "is not empty"), defineProperty(_defaultOperatorLabel, defaultOperators.IS_NULL, "is null"), defineProperty(_defaultOperatorLabel, defaultOperators.NOT_IS_NULL, "is not null"), _defaultOperatorLabel);
/**
 * Default field types that require a select-type render implementation
 */

var selectTypeFields = [defaultFieldTypes.SELECT, defaultFieldTypes.MULTIPLE_CHOICE, defaultFieldTypes.CHOICE];
/**
 * Factory fn, returning the default operators with their default labels
 */

var returnDefaultOperators = function returnDefaultOperators() {
  return Object.values(defaultOperators).map(function (t) {
    return {
      name: t,
      label: defaultOperatorLabels[t]
    };
  });
};
/**
 * Return the default field type objects
 */

var returnDefaultFieldTypes = function returnDefaultFieldTypes() {
  return Object.values(defaultFieldTypes).map(function (ft) {
    return {
      name: ft,
      label: defaultFieldTypeLabels[ft],
      availableOperators: defaultAvailableOperators[ft]
    };
  });
};
Object.freeze(defaultFieldTypes);
Object.freeze(defaultFieldTypeLabels);
Object.freeze(defaultOperators);
Object.freeze(defaultOperatorLabels);
Object.freeze(defaultAvailableOperators);
Object.keys(defaultAvailableOperators).forEach(function (key) {
  Object.freeze(defaultAvailableOperators[key]);
});
Object.freeze(selectTypeFields);

var ConditionFactory = /*#__PURE__*/function () {
  function ConditionFactory(opts) {
    classCallCheck(this, ConditionFactory);

    this._operators = returnDefaultOperators();
    this._fields = [];
    this._fieldTypes = returnDefaultFieldTypes();
    this._operators = opts.operators || this._operators;
    this._fieldTypes = opts.fieldTypes || this._fieldTypes;
    this._eventHub = opts.eventHub;
    if (this._operators.length == 0) throw new Error("ConditionFactory initialized with 0 operators.");
    if (opts.fields.length == 0) throw new Error("ConditionFactory initialized with 0 fields.");
    if (this._fieldTypes.length == 0) throw new Error("ConditionFactory initialized with 0 fieldTypes.");

    this._processOpts(opts);
  }

  createClass(ConditionFactory, [{
    key: "create",
    value: function create() {
      var fieldName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._fields[0].name;
      var operatorName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._fields[0].operators[0];
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var operator = this._operators.find(function (f) {
        return f.name == operatorName;
      });

      if (operator) {
        var field = this._fields.find(function (f) {
          return f.name == fieldName;
        });

        if (field == undefined) throw new Error("No such field " + fieldName);
        if (!field.operators.includes(operatorName)) throw new Error("Operator ".concat(operatorName, " is not available for field ").concat(field.name));
        var fieldType = this.fieldTypes.find(function (ft) {
          return ft.name == field.type;
        });
        if (!fieldType) throw new Error("Field type ".concat(field.type, " is not defined on the instance. \n          Options are: ").concat(this.fieldTypes.map(function (ft) {
          return ft.name;
        }).join(", ")));
        return {
          operatorName: operator.name,
          fieldName: field.name,
          fieldTypeName: fieldType.name,
          value: value
        };
      }

      throw new Error("Operator type ".concat(operatorName, ", does not exist, available options are \n      ").concat(this._operators.map(function (o) {
        return o.name;
      }).join(", ")));
    }
    /**
     * Creates a condition, and updates the provided node with Vue.set
     * It then signals the builder, that the root has been updated
     * @param node
     * @param fieldName
     * @param operatorName
     * @param value
     */

  }, {
    key: "createAndUpdate",
    value: function createAndUpdate(node) {
      var fieldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._fields[0].name;
      var operatorName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._fields[0].operators[0];
      var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if ("condition" in node) {
        var condition = this.create(fieldName, operatorName, value);
        Vue.set(node, "condition", condition);
        if (this._eventHub) // sends updated event, if eventHub was passed to the constructor
          this._eventHub.$emit("input", {
            node: node,
            action: actionTypes.UPDATED,
            path: []
          });
      } else throw new Error("Node (first param) must be an ExpressionNode");
    }
  }, {
    key: "_processOpts",
    value: function _processOpts(opts) {
      var _this = this;

      this._fields = opts.fields.map(function (field) {
        var innerField = {
          type: field.type,
          name: field.name,
          label: field.label,
          choices: field.choices,
          operators: field.operators
        };
        if (!_this.fieldTypes.find(function (ft) {
          return ft.name == innerField.type;
        })) throw new Error("Field ".concat(innerField.name, " has undefined type ").concat(innerField.type));
        if (selectTypeFields.includes(innerField.type) && (!innerField.choices || innerField.choices.length == 0)) throw new Error("Need to specify available choices for field ".concat(field.name, " of type ").concat(field.type)); // setting operators, if it was provided null or empty

        if (!innerField.operators || innerField.operators.length == 0) {
          // finding the field type object, for the type of the field
          var fieldTypeObject = _this._fieldTypes.find(function (t) {
            return t.name == innerField.type;
          });

          if (!fieldTypeObject) throw new Error("Field type ".concat(innerField.type, " is not added to the instance")); // populating the field's operators from the default, defined in the fieldTypeDefinition

          innerField.operators = _this._operators.filter(function (operator) {
            return fieldTypeObject.availableOperators.includes(operator.name);
          }).map(function (o) {
            return o.name;
          });
          if (innerField.operators.length == 0) throw new Error("As per the settings your provided, field ".concat(field.name, " would not have any available operators."));
        }

        return innerField;
      });
    }
  }, {
    key: "fields",
    get: function get() {
      return this._fields;
    }
  }, {
    key: "operators",
    get: function get() {
      return this._operators;
    }
  }, {
    key: "fieldTypes",
    get: function get() {
      return this._fieldTypes;
    }
  }]);

  return ConditionFactory;
}();

var PROVIDE_EVENT_HUB_KEY = "$__qb_event_hub__";
var PROVIDE_CONDITION_FACTORY_KEY = "$__qb_condition_factory__";

var ExpressionBuilderRenderless = /*#__PURE__*/function (_Vue) {
  inherits(ExpressionBuilderRenderless, _Vue);

  var _super = createSuper(ExpressionBuilderRenderless);

  function ExpressionBuilderRenderless() {
    var _this;

    classCallCheck(this, ExpressionBuilderRenderless);

    _this = _super.apply(this, arguments);
    /**
     * Service for processing fields and filters into a factory service
     * That creates individual conditions from field, filter and value
     */

    _this.conditionProvider = new ConditionFactory({
      operators: _this.operators,
      fields: _this.fields,
      fieldTypes: _this.fieldTypes,
      eventHub: _this.eventHub
    });
    return _this;
  }

  createClass(ExpressionBuilderRenderless, [{
    key: "created",
    value: function created() {
      this.eventHub.$on("input", this.handleInput);
    }
  }, {
    key: "beforeDestroy",
    value: function beforeDestroy() {
      this.eventHub.$off("input", this.handleInput);
    }
    /**
     * Handles the input events from the child nodes, that suggests and change is to be made in the
     * Expression structure
     * @param body
     * @private
     */

  }, {
    key: "handleInput",
    value: function handleInput(body) {
      var pathToParent = body.path.slice(0, body.path.length - 1),
          index = body.path[body.path.length - 1];

      switch (body.action) {
        case actionTypes.SET:
          this.value.contextTo(pathToParent).set(body.node, index);
          break;

        case actionTypes.ADD:
          this.value.contextTo(body.path).add(body.node);
          break;

        case actionTypes.INSERT:
          this.value.contextTo(pathToParent).insert(body.node, index);
          break;

        case actionTypes.DELETE:
          this.value.contextTo(pathToParent).delete(index);
          break;
      }

      this.value.contextToRoot();
      this.$emit("input", this.value);
    }
  }, {
    key: "render",
    value: function render() {
      return this.$scopedSlots.default({});
    }
  }, {
    key: "root",
    get: function get() {
      return this.value.root;
    }
  }]);

  return ExpressionBuilderRenderless;
}(Vue);

__decorate([Prop({
  type: ExpressionBuilder,
  required: true
})], ExpressionBuilderRenderless.prototype, "value", void 0);

__decorate([Provide(PROVIDE_EVENT_HUB_KEY), Prop({
  type: Vue,
  required: false,
  default: function _default() {
    return new Vue();
  }
})], ExpressionBuilderRenderless.prototype, "eventHub", void 0);

__decorate([Prop({
  type: Array,
  required: false,
  default: returnDefaultOperators
})], ExpressionBuilderRenderless.prototype, "operators", void 0);

__decorate([Prop({
  type: Array,
  required: true
})], ExpressionBuilderRenderless.prototype, "fields", void 0);

__decorate([Prop({
  type: Array,
  required: false,
  default: returnDefaultFieldTypes
})], ExpressionBuilderRenderless.prototype, "fieldTypes", void 0);

__decorate([Provide(PROVIDE_CONDITION_FACTORY_KEY)], ExpressionBuilderRenderless.prototype, "conditionProvider", void 0);

ExpressionBuilderRenderless = __decorate([Component], ExpressionBuilderRenderless);
var ExpressionBuilderRenderless$1 = ExpressionBuilderRenderless;

/**
 * Helper to recursively get the path of the current node
 * @param node
 */

var getNodePath = function getNodePath(node) {
  if (!node.parentNode) return [];else return [].concat(toConsumableArray(getNodePath(node.parentNode)), [node.parentNode.children.indexOf(node)]);
};

var ExpressionNodeBase$1 = /*#__PURE__*/function (_Vue) {
  inherits(ExpressionNodeBase, _Vue);

  var _super = createSuper(ExpressionNodeBase);

  function ExpressionNodeBase() {
    classCallCheck(this, ExpressionNodeBase);

    return _super.apply(this, arguments);
  }

  createClass(ExpressionNodeBase, [{
    key: "emitInput",

    /**
     * Emit an input event towards the parent ExpressionBuilderRenderless, that initializes a change
     * in the nested expression structure
     * @param node
     * @param action
     * @param index
     */
    value: function emitInput(node) {
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : actionTypes.SET;
      var index = arguments.length > 2 ? arguments[2] : undefined;
      var path = getNodePath(this.node);
      if (index != undefined) path.push(index);
      this.eventHub.$emit("input", {
        node: node,
        path: path,
        action: action
      });
    }
    /**
     * Initializes the deletion of the current node
     */

  }, {
    key: "emitDelete",
    value: function emitDelete() {
      this.emitInput(undefined, actionTypes.DELETE);
    }
  }, {
    key: "index",
    get: function get() {
      return this.node.parentNode ? this.node.parentNode.children.indexOf(this.node) : -1;
    }
  }]);

  return ExpressionNodeBase;
}(Vue);

__decorate([Prop({
  required: true
})], ExpressionNodeBase$1.prototype, "node", void 0);

__decorate([Inject(PROVIDE_EVENT_HUB_KEY)], ExpressionNodeBase$1.prototype, "eventHub", void 0);

__decorate([Inject(PROVIDE_CONDITION_FACTORY_KEY)], ExpressionNodeBase$1.prototype, "conditionFactory", void 0);

ExpressionNodeBase$1 = __decorate([Component({})], ExpressionNodeBase$1);
var ExpressionNodeBase$2 = ExpressionNodeBase$1;

var ExpressionNodeRenderless = /*#__PURE__*/function (_ExpressionNodeBase) {
  inherits(ExpressionNodeRenderless, _ExpressionNodeBase);

  var _super = createSuper(ExpressionNodeRenderless);

  function ExpressionNodeRenderless() {
    classCallCheck(this, ExpressionNodeRenderless);

    return _super.apply(this, arguments);
  }

  createClass(ExpressionNodeRenderless, [{
    key: "updateCondition",

    /**
     * Updates the condition in place and signals the ExpressionBuilderRenderless through events
     * @param fieldName
     * @param operator
     * @param value
     */
    value: function updateCondition(fieldName, operator, value) {
      this.conditionFactory.createAndUpdate(this.node, fieldName, operator, value);
    }
  }, {
    key: "render",
    value: function render() {
      return this.$scopedSlots.default({
        node: this.node,
        index: this.index,
        updateCondition: this.updateCondition,
        deleteSelf: this.emitDelete,
        conditionFactory: this.conditionFactory
      });
    }
  }]);

  return ExpressionNodeRenderless;
}(ExpressionNodeBase$2);

__decorate([Prop({
  required: true,
  type: ExpressionNode
})], ExpressionNodeRenderless.prototype, "node", void 0);

ExpressionNodeRenderless = __decorate([Component], ExpressionNodeRenderless);
var ExpressionNodeRenderless$1 = ExpressionNodeRenderless;

var ExpressionNodeGroupRenderless = /*#__PURE__*/function (_ExpressionNodeBase) {
  inherits(ExpressionNodeGroupRenderless, _ExpressionNodeBase);

  var _super = createSuper(ExpressionNodeGroupRenderless);

  function ExpressionNodeGroupRenderless() {
    classCallCheck(this, ExpressionNodeGroupRenderless);

    return _super.apply(this, arguments);
  }

  createClass(ExpressionNodeGroupRenderless, [{
    key: "insert",

    /**
     * Initializes the insertion of {node}, to the {index} index of the parent ExpressionNodeGroup
     * Emits and event towards the parent ExpressionBuilderRenderless
     * @param node
     * @param index
     */
    value: function insert(node, index) {
      this.emitInput(node, actionTypes.INSERT, index);
    }
    /**
     * Initializes the addition of node or node group, by pushing it to the children list of the parent ExpressionNodeGroup
     * Emits and event towards the parent ExpressionBuilderRenderless
     * @param node
     */

  }, {
    key: "add",
    value: function add(node) {
      this.emitInput(node, actionTypes.ADD);
    }
    /**
     * Initializes the addition of a node with the default condition, returned by the ConditionProvider instance
     * injected from the parent ExpressionBuilderRenderless
     */

  }, {
    key: "addNode",
    value: function addNode(condition) {
      this.add(new ExpressionNode(condition || this.conditionFactory.create()));
    }
    /**
     * Initializes the addition of an empty node group with the default condition, returned by the ConditionProvider instance
     * injected from the parent ExpressionBuilderRenderless
     */

  }, {
    key: "addGroup",
    value: function addGroup() {
      this.add(new ExpressionNodeGroup());
    }
    /**
     * Toggles the connection type (and - or) between its child nodes
     */

  }, {
    key: "toggleConnectionType",
    value: function toggleConnectionType() {
      if (this.node.connectionType === connectionTypes.AND) this.node.connectionType = connectionTypes.OR;else this.node.connectionType = connectionTypes.AND;
    }
  }, {
    key: "render",
    value: function render() {
      return this.$scopedSlots.default({
        node: this.node,
        index: this.index,
        toggleConnectionType: this.toggleConnectionType,
        deleteSelf: this.emitDelete,
        insert: this.insert,
        addNode: this.addNode,
        addGroup: this.addGroup,
        conditionFactory: this.conditionFactory
      });
    }
  }]);

  return ExpressionNodeGroupRenderless;
}(ExpressionNodeBase$2);

__decorate([Prop({
  required: true,
  type: ExpressionNodeGroup
})], ExpressionNodeGroupRenderless.prototype, "node", void 0);

ExpressionNodeGroupRenderless = __decorate([Component], ExpressionNodeGroupRenderless);
var ExpressionNodeGroupRenderless$1 = ExpressionNodeGroupRenderless;

var ImportedComponents = {
  ExpressionBuilderRenderless: ExpressionBuilderRenderless$1,
  ExpressionNodeRenderless: ExpressionNodeRenderless$1,
  ExpressionNodeGroupRenderless: ExpressionNodeGroupRenderless$1
};

var ImportedConditions = {
  ConditionFactory: ConditionFactory,
  Defaults: {
    returnDefaultOperators: returnDefaultOperators,
    returnDefaultFieldTypes: returnDefaultFieldTypes,
    defaultFieldTypes: defaultFieldTypes,
    defaultOperators: defaultOperators
  }
};

var Core = {
  ExpressionBuilder: ExpressionBuilder,
  ExpressionNodeGroup: ExpressionNodeGroup,
  ExpressionNode: ExpressionNode,
  ErrorTypes: errorTypes
};
var Components = ImportedComponents;
var Conditions = ImportedConditions;

export { Components, Conditions, Core };
