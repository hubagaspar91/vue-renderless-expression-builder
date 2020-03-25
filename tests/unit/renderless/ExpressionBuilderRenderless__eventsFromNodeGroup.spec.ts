import {mount, Wrapper} from "@vue/test-utils";
import ExpressionBuilderRenderless, {
  provideConditionProviderKey,
  provideEventHubKey
} from "@/components/ExpressionBuilderRenderless";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {mockFields, testJSON} from "../../utils";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import ExpressionNodeGroupRenderless from "@/components/ExpressionNodeGroupRenderless";
import {ICondition, IExpressionNodeGroupJSON, IExpressionNodeJSON} from "@/core/Interfaces";
import {actionTypes} from "@/components/Utils";
import ExpressionNode from "@/core/ExpressionNode";
import {filterTypes} from "@/conditions/Defaults";

let wrapper: Wrapper<ExpressionBuilderRenderless>,
  groupWrapper: Wrapper<ExpressionNodeGroupRenderless>,
  selectedGroup: ExpressionNodeGroup;

beforeEach(() => {
  let {_wrapper, _groupWrapper, _selectedGroup} = createBuilderAndGroup();
  wrapper = _wrapper;
  groupWrapper = _groupWrapper;
  selectedGroup = _selectedGroup;
});

afterEach(() => {
  if (wrapper)
    wrapper.destroy();
  if (groupWrapper)
    groupWrapper.destroy();
});

const createBuilderAndGroup = () => {
  // creating the renderless builder component
  const _wrapper = mount(ExpressionBuilderRenderless, {
    propsData: {
      value: new ExpressionBuilder(testJSON),
      fields: mockFields
    }
  });

  const _selectedGroup = _wrapper.vm.root.children[0] as ExpressionNodeGroup;

  // creating the node group
  const _groupWrapper = mount(ExpressionNodeGroupRenderless, {
    propsData: {
      node: _selectedGroup,
      eventHub: _wrapper.vm.eventHub
    },
    provide: {
      [provideEventHubKey]: _wrapper.vm.eventHub,
      [provideConditionProviderKey]: _wrapper.vm.conditionProvider
    },
    scopedSlots: {
      default: () => null
    }
  });

  return {_wrapper, _groupWrapper, _selectedGroup};
};

const testActionOnGroup = (actionType: string, group: boolean, index?: number) => {
  return new Promise((resolve, reject) => {

    const newCondition: ICondition = {name: "test", value: 500};

    wrapper.vm.$on("input", (builder: ExpressionBuilder) => {
      const json = builder.root.toJSON();
      const parentJson = json.children[0] as IExpressionNodeGroupJSON;
      const newNodeJson = parentJson.children[index != undefined ? index : parentJson.children.length - 1];
      try {
        if (group) {
          expect("children" in newNodeJson).toBe(true);
        } else {
          if (actionType !== actionTypes.ADD)
            expect((newNodeJson as IExpressionNodeJSON)).toStrictEqual(newCondition);
          else
            expect((newNodeJson as IExpressionNodeJSON)).toStrictEqual({
              name: filterTypes.EQUALS, value: {
                fieldName: "test",
                filterValue: null
              }
            });
        }
      } catch (e) {
        reject(e);
      }
      resolve();
    });

    switch (actionType) {
      case actionTypes.INSERT:
        group ?
          groupWrapper.vm.insert(new ExpressionNodeGroup(), (index as number))
          : groupWrapper.vm.insert(new ExpressionNode(newCondition), index as number);
        break;
      case actionTypes.ADD:
        group ? groupWrapper.vm.addGroup() : groupWrapper.vm.addNode();
    }

  });
};

describe("ExpressionBuilderRenderless - Events from ExpressionNodeGroupRenderless components", () => {

  it("toggleConnectionType", () => {
    return new Promise((resolve, reject) => {

      wrapper.vm.$on("input", (builder: ExpressionBuilder) => {
        const json = builder.root.toJSON();
        try {
          expect((json.children[0] as IExpressionNodeGroupJSON).connectionType).not.toBe(selectedGroup.connectionType);
        } catch (e) {
          reject(e);
        }
        resolve();
      });

      groupWrapper.vm.toggleConnectionType();
    })
  });

  it("insertNode - from ExpressionNodeGroupRenderless", () => {
    return testActionOnGroup(actionTypes.INSERT, false, 0);
  });

  it("insertGroup - from ExpressionNodeGroupRenderless", () => {
    return testActionOnGroup(actionTypes.INSERT, true, 0);
  });

  it("addNode - from ExpressionNodeGroupRenderless", () => {
    return testActionOnGroup(actionTypes.ADD, false);
  });

  it("addGroup - from ExpressionNodeGroupRenderless", () => {
    return testActionOnGroup(actionTypes.ADD, true);
  });


});
