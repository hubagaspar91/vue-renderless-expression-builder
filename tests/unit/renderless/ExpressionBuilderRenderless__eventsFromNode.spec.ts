import {mount, Wrapper} from "@vue/test-utils";
import ExpressionBuilderRenderless, {
  provideConditionProviderKey,
  provideEventHubKey
} from "@/components/ExpressionBuilderRenderless";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {mockFields, testJSON} from "../../utils";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import ExpressionNodeRenderless from "@/components/ExpressionNodeRenderless";
import ExpressionNode from "@/core/ExpressionNode";
import {IExpressionNodeGroupJSON, IExpressionNodeJSON} from "@/core/Interfaces";
import {filterTypes} from "@/conditions/Defaults";

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
  // creating the renderless builder component
  const _wrapper = mount(ExpressionBuilderRenderless, {
    propsData: {
      value: new ExpressionBuilder(testJSON),
      fields: mockFields
    }
  });

  const _selectedNode: ExpressionNode =
    (_wrapper.vm.root.children[0] as ExpressionNodeGroup).children[0] as ExpressionNode;

  // creating a renderless node from the root path [0, 0] node
  const _nodeWrapper = mount(ExpressionNodeRenderless, {
    propsData: {
      node: _selectedNode
    },
    provide: {
      [provideEventHubKey]: _wrapper.vm.eventHub,
      [provideConditionProviderKey]: _wrapper.vm.conditionProvider
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
      console.log(wrapper);
      console.log(nodeWrapper);
      console.log(selectedNode);

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
          expect((json.children[0] as IExpressionNodeGroupJSON).children[0] as IExpressionNodeJSON)
            .toStrictEqual({
              name: filterTypes.EQUALS,
              value: {
                fieldName: "test",
                filterValue: "testValue"
              }
            });
        } catch (e) {
          reject(e);
        }
        resolve();
      });

      nodeWrapper.vm.updateCondition("test", filterTypes.EQUALS, "testValue");
    })
  });
});