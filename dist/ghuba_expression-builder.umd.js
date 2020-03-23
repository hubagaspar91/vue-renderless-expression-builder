import { __decorate } from 'tslib';
import { Prop, Component, Vue } from 'vue-property-decorator';

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
  return "Reached max depth: ".concat(maxDepth, ". Cannot nest conditions any further.");
}), defineProperty(_errorTypeMessageFact, errorTypes.INVALID_INDEX_INSERT, function (index) {
  return "Cannot insert node to non-existent index: ".concat(index);
}), defineProperty(_errorTypeMessageFact, errorTypes.INVALID_INDEX_DELETE, function (index) {
  return "Cannot delete node from non-existent index: ".concat(index);
}), defineProperty(_errorTypeMessageFact, errorTypes.INVALID_CONTEXT_PATH, function (path) {
  return "Invalid context path [".concat(path.join(", "), "], new context must be an ExpressionNodeGroup node");
}), _errorTypeMessageFact);
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
  return "toJSON" in obj && "connectionType" in obj;
}
function isICondition(obj) {
  return "name" in obj && "value" in obj;
}

var connectionTypes = {
  AND: "and",
  OR: "or"
};
var connectionTypesArray = Object.values(connectionTypes);

var ExpressionNodeBase = /*#__PURE__*/function () {
  function ExpressionNodeBase() {
    var connectionType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : connectionTypes.AND;
    var parentNode = arguments.length > 1 ? arguments[1] : undefined;

    classCallCheck(this, ExpressionNodeBase);

    this._connectionType = connectionTypes.AND;
    this.connectionType = connectionType;
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
  }, {
    key: "connectionType",
    set: function set(value) {
      if (Object.values(connectionTypesArray).includes(value)) this._connectionType = value;else throw new Error("ConnectionType not supported, possible values: " + connectionTypesArray.join(", "));
    },
    get: function get() {
      return this._connectionType;
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
    var connectionType = arguments.length > 1 ? arguments[1] : undefined;
    var parentNode = arguments.length > 2 ? arguments[2] : undefined;

    classCallCheck(this, ExpressionNode);

    _this = _super.call(this, connectionType, parentNode);
    _this._condition = defaultCondition(); // to check for type

    _this.condition = condition;
    return _this;
  }

  createClass(ExpressionNode, [{
    key: "toJSON",

    /**
     * Exports the data as JSON
     */
    value: function toJSON() {
      return {
        connectionType: this.connectionType,
        condition: objectSpread2({}, this.condition)
      };
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
      if (isICondition(condition)) this._condition = condition;else throw new Error("Condition object must contain 'name' and 'value' keys.");
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json, parentNode) {
      return new ExpressionNode(json.condition, json.connectionType, parentNode);
    }
  }]);

  return ExpressionNode;
}(ExpressionNodeBase);

/**
 * Factory fn, returning the default opts object for an ExpressionNodeGroup
 */

var defaultOpts = function defaultOpts() {
  return {
    maxDepth: 0,
    currentDepth: 0,
    children: []
  };
};

var ExpressionNodeGroup = /*#__PURE__*/function (_ExpressionNodeBase) {
  inherits(ExpressionNodeGroup, _ExpressionNodeBase);

  var _super = createSuper(ExpressionNodeGroup);

  function ExpressionNodeGroup() {
    var _this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOpts();
    var connectionType = arguments.length > 1 ? arguments[1] : undefined;
    var parentNode = arguments.length > 2 ? arguments[2] : undefined;

    classCallCheck(this, ExpressionNodeGroup);

    _this = _super.call(this, connectionType, parentNode);
    _this._children = [];
    _this._maxDepth = 0;
    _this._currentDepth = 0;
    opts = objectSpread2({}, defaultOpts(), {}, opts);
    _this.children = opts.children;
    _this.maxDepth = opts.maxDepth;
    _this.currentDepth = opts.currentDepth;
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
     * This means, the output can be interpreted simply as
     *
     * flattened.some(flattened.map(group => group.every(validateNode)), n => n)
     *
     * It can be used for client side list filtering
     */
    value: function flatten() {
      var currentGroup = [];
      var flattenedList = [];
      this.children.forEach(function (c) {
        if (c instanceof ExpressionNode) {
          if (c.connectionType === connectionTypes.OR) {
            if (currentGroup.length > 0) flattenedList.push(currentGroup);
            currentGroup = [Object.assign({}, c.condition)];
          } else currentGroup.push(Object.assign({}, c.condition));
        } else if (c instanceof ExpressionNodeGroup) {
          if (c.children.length > 0) {
            if (currentGroup.length > 0) {
              flattenedList.push(currentGroup);
              currentGroup = [];
            }

            if (c.connectionType === connectionTypes.AND) {
              var newFlattenedList = [];
              c.flatten().forEach(function (g) {
                if (flattenedList.length > 0) flattenedList.forEach(function (flg) {
                  newFlattenedList.push([].concat(toConsumableArray(flg), toConsumableArray(g)));
                });else newFlattenedList.push(g);
              });
              flattenedList = newFlattenedList;
            } else flattenedList = [].concat(toConsumableArray(flattenedList), toConsumableArray(c.flatten()));
          }
        } else throw new Error("Node cannot be of type " + _typeof_1(c));
      });
      if (currentGroup.length > 0) flattenedList.push(currentGroup);
      return flattenedList;
    }
  }, {
    key: "children",
    set: function set(value) {
      var _this2 = this;

      this._children = value.map(function (node) {
        if (isIExpressionNode(node)) {
          node.parentNode = _this2;
          return node;
        } else throw new Error("Node must by ExpressionNode or ExpressionNodeGroup, got type: " + _typeof_1(node));
      });
    },
    get: function get() {
      return this._children;
    }
  }, {
    key: "maxDepth",
    set: function set(value) {
      if (!this.parentNode || value == this.parentNode.maxDepth) this._maxDepth = value;else throw new Error("maxDepth cannot be different from that of the parentNode.");
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
      return "children" in object;
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
        currentDepth: currentDepth
      }, json.connectionType, parentNode);
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

    this.root = root // if root is defined
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
  }, {
    key: "_fluentInsertion",
    value: function _fluentInsertion(node, operation, index) {
      var newContext; // if valid index

      if (this._validateIndex(index)) {
        node.parentNode = this._context; // If group, check if will reach max depth

        if (node instanceof ExpressionNodeGroup) {
          if (this.context.maxDepth > 0 && this.context.currentDepth >= this.context.maxDepth - 2) {
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
      if (index >= 0 && index <= this.context.children.length - 1) this._context.children.splice(index, 1);
      handleError(errorTypes.INVALID_INDEX_DELETE, this.errorHandler, index);
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

      if (path.length > 0) handleError(errorTypes.INVALID_CONTEXT_PATH, this.errorHandler, path);
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
  DELETE: "delete"
};

var ExpressionBuilderRenderless = /*#__PURE__*/function (_Vue) {
  inherits(ExpressionBuilderRenderless, _Vue);

  var _super = createSuper(ExpressionBuilderRenderless);

  function ExpressionBuilderRenderless() {
    var _this;

    classCallCheck(this, ExpressionBuilderRenderless);

    _this = _super.apply(this, arguments);
    _this.eventHub = new Vue();
    return _this;
  }

  createClass(ExpressionBuilderRenderless, [{
    key: "created",
    value: function created() {
      this.eventHub.$on("input", this.handleInput);
    }
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
      return null;
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
  }, {
    key: "toggleConnectionType",
    value: function toggleConnectionType(fromJSON) {
      var json = this.node.toJSON();
      if (json.connectionType === connectionTypes.AND) json.connectionType = connectionTypes.OR;else json.connectionType = connectionTypes.AND;
      this.emitInput(fromJSON(json));
    }
  }, {
    key: "emitDelete",
    value: function emitDelete() {
      this.emitInput(undefined, actionTypes.DELETE);
    }
  }, {
    key: "index",
    get: function get() {
      if (this.node.parentNode) return this.node.parentNode.children.indexOf(this.node);else return -1;
    }
  }]);

  return ExpressionNodeBase;
}(Vue);

__decorate([Prop({
  required: true
})], ExpressionNodeBase$1.prototype, "node", void 0);

__decorate([Prop({
  required: true
})], ExpressionNodeBase$1.prototype, "eventHub", void 0);

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
    key: "update",
    value: function update(condition) {
      this.emitInput(new ExpressionNode(condition, this.node.connectionType));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return this.$scopedSlots.default({
        node: this.node,
        index: this.index,
        toggleConnectionType: function toggleConnectionType() {
          return _this.toggleConnectionType(ExpressionNode.fromJSON);
        },
        updateCondition: this.update,
        deleteSelf: this.emitDelete
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
    value: function insert(node, index) {
      this.emitInput(node, actionTypes.INSERT, index);
    }
  }, {
    key: "add",
    value: function add(node) {
      this.emitInput(node, actionTypes.ADD);
    }
  }, {
    key: "addNode",
    value: function addNode() {
      this.add(new ExpressionNode());
    }
  }, {
    key: "addGroup",
    value: function addGroup() {
      this.add(new ExpressionNodeGroup());
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return this.$scopedSlots.default({
        node: this.node,
        index: this.index,
        toggleConnectionType: function toggleConnectionType() {
          return _this.toggleConnectionType(ExpressionNodeGroup.fromJSON);
        },
        deleteSelf: this.emitDelete,
        insert: this.insert,
        addNode: this.addNode,
        addGroup: this.addGroup
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

var Core = {
  ExpressionBuilder: ExpressionBuilder,
  ExpressionNodeGroup: ExpressionNodeGroup,
  ExpressionNode: ExpressionNode,
  ErrorTypes: errorTypes
};
var Components = ImportedComponents;

export { Components, Core };
