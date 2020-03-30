import {mount, Wrapper} from "@vue/test-utils";
import ExpressionBuilderRenderless, {
  PROVIDE_CONDITION_FACTORY_KEY,
  PROVIDE_EVENT_HUB_KEY
} from "@/components/ExpressionBuilderRenderless";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {mockFields, testJSON} from "../../utils";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import ExpressionNodeRenderless from "@/components/ExpressionNodeRenderless";
import ExpressionNode from "@/core/ExpressionNode";
import {IExpressionNodeGroupJSON, IExpressionNodeJSON} from "@/core/Interfaces";
import {defaultOperators} from "@/conditions/Defaults";

let wrapper: Wrapper<ExpressionBuilderRenderless>,
  nodeWrapper: Wrapper<ExpressionNodeRenderless>,
  selectedNode: ExpressionNode;

beforeEach(() => {
  let {_wrapper, _nodeWrapper, _selectedNode} = createBuilderAndNode();
  wrapper = _wrapper;
  nodeWrapper = _nodeWrapper;
  selectedNode = _selectedNode;
});

afterEach(() => {
  if (wrapper)
    wrapper.destroy();
  if (nodeWrapper)
    nodeWrapper.destroy();
});

const createBuilderAndNode = () => {
  // creating the components builder component
  const _wrapper = mount(ExpressionBuilderRenderless, {
    propsData: {
      value: new ExpressionBuilder(testJSON),
      fields: mockFields
    },
    scopedSlots: {
      default: () => null
    }
  });

  const _selectedNode: ExpressionNode =
    (_wrapper.vm.root.children[0] as ExpressionNodeGroup).children[0] as ExpressionNode;

  // creating a components node from the root path [0, 0] node
  const _nodeWrapper = mount(ExpressionNodeRenderless, {
    propsData: {
      node: _selectedNode
    },
    provide: {
      [PROVIDE_EVENT_HUB_KEY]: _wrapper.vm.eventHub,
      [PROVIDE_CONDITION_FACTORY_KEY]: _wrapper.vm.conditionProvider
    },
    scopedSlots: {
      default: () => null
    }
  });

  return {_wrapper, _nodeWrapper, _selectedNode};
};


describe("ExpressionBuilderRenderless - Events from ExpressionNodeRenderless components", () => {

  it("Delete", () => {
    return new Promise((resolve, reject) => {

      wrapper.vm.$on("input", (builder: ExpressionBuilder) => {
        const json = builder.root.toJSON();
        try {
          expect((json.children[0] as IExpressionNodeGroupJSON).children).toHaveLength(0);
        } catch (e) {
          reject(e);
        }
        resolve();
      });

      nodeWrapper.vm.emitDelete();
    })
  });

  it("Update", () => {
    return new Promise((resolve, reject) => {

      wrapper.vm.$on("input", (builder: ExpressionBuilder) => {
        const json = builder.root.toJSON();
        try {
          expect(((json.children[0] as IExpressionNodeGroupJSON).children[0] as IExpressionNodeJSON).value)
            .toBe("testValue");
        } catch (e) {
          reject(e);
        }
        resolve();
      });

      nodeWrapper.vm.updateCondition("test", defaultOperators.EQUALS, "testValue");
    })
  });
});