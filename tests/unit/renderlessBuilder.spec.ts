import {mount, shallowMount} from "@vue/test-utils";
import ExpressionBuilderRenderless, {
  provideConditionProviderKey,
  provideEventHubKey
} from "@/components/ExpressionBuilderRenderless";
import ExpressionNode from "@/core/ExpressionNode";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import {Vue} from "vue-property-decorator";
import {mockFields, testJSON} from "../utils";
import ExpressionNodeRenderless from "@/components/ExpressionNodeRenderless";
import {ICondition, IExpressionNodeGroupJSON, IExpressionNodeJSON} from "@/core/Interfaces";
import ExpressionNodeGroupRenderless from "@/components/ExpressionNodeGroupRenderless";
import {actionTypes} from "@/components/Utils";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import mock = jest.mock;
import ConditionProvider from "@/conditions/ConditionProvider";

describe("ExpressionBuilderRenderless", () => {

  it("Create instance", () => {
    const wrapper = mount(ExpressionBuilderRenderless, {
      propsData: {
        value: new ExpressionBuilder(),
        fields: mockFields
      }
    });
    expect(wrapper.vm.root).toBeInstanceOf(ExpressionNodeGroup);
    expect(wrapper.vm.root.children).toHaveLength(0);
    expect(wrapper.vm.eventHub).toBeInstanceOf(Vue);
  });

  it("Create instance from json", () => {
    const wrapper = mount(ExpressionBuilderRenderless, {
      propsData: {
        value: new ExpressionBuilder(testJSON),
        fields: mockFields
      }
    });
    expect(wrapper.vm.root).toBeInstanceOf(ExpressionNodeGroup);
    expect(wrapper.vm.root.children).toHaveLength(2);
    expect(wrapper.vm.root.toJSON()).toStrictEqual(testJSON);
    expect(wrapper.vm.eventHub).toBeInstanceOf(Vue);
  });

  describe("Process events from child nodes", () => {

    const createBuilderAndNode = () => {
      // creating the renderless builder component
      const wrapper = mount(ExpressionBuilderRenderless, {
        propsData: {
          value: new ExpressionBuilder(testJSON),
          fields: mockFields
        }
      });

      const selectedNode = (wrapper.vm.root.children[0] as ExpressionNodeGroup).children[0];

      // creating a renderless node from the root path [0, 0] node
      const nodeWrapper = mount(ExpressionNodeRenderless, {
        propsData: {
          node: selectedNode
        },
        provide: {
          [provideEventHubKey]: wrapper.vm.eventHub,
          [provideConditionProviderKey]: wrapper.vm.conditionProvider
        },
        scopedSlots: {
          default: () => null
        }
      });

      return {wrapper, nodeWrapper, selectedNode};
    };

    it("Delete - from ExpressionNodeRenderless", () => {
      return new Promise((resolve, reject) => {
        const {wrapper, nodeWrapper} = createBuilderAndNode();

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

    it("Update - from ExpressionNodeRenderless", () => {
      return new Promise((resolve, reject) => {
        const {wrapper, nodeWrapper, selectedNode} = createBuilderAndNode();

        const newCondition = {name: "test", value: 200};

        wrapper.vm.$on("input", (builder: ExpressionBuilder) => {
          const json = builder.root.toJSON();
          try {
            expect((json.children[0] as IExpressionNodeGroupJSON).children[0] as IExpressionNodeJSON)
              .not.toStrictEqual((selectedNode as ExpressionNode).condition);
            expect((json.children[0] as IExpressionNodeGroupJSON).children[0] as IExpressionNodeJSON)
              .toStrictEqual(newCondition);
          } catch (e) {
            reject(e);
          }
          resolve();
        });

        nodeWrapper.vm.update(newCondition);
      })
    });

    const createBuilderAndGroup = () => {
      // creating the renderless builder component
      const wrapper = mount(ExpressionBuilderRenderless, {
        propsData: {
          value: new ExpressionBuilder(testJSON),
          fields: mockFields
        }
      });

      const selectedGroup = wrapper.vm.root.children[0] as ExpressionNodeGroup;

      // creating the node group
      const groupWrapper = mount(ExpressionNodeGroupRenderless, {
        propsData: {
          node: selectedGroup,
          eventHub: wrapper.vm.eventHub
        },
        provide: {
          [provideEventHubKey]: wrapper.vm.eventHub,
          [provideConditionProviderKey]: wrapper.vm.conditionProvider
        },
        scopedSlots: {
          default: () => null
        }
      });

      return {wrapper, groupWrapper, selectedGroup};
    };

    it("toggleConnectionType - from ExpressionNodeGroupRenderless", () => {
      return new Promise((resolve, reject) => {

        const {wrapper, groupWrapper, selectedGroup} = createBuilderAndGroup();

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

    const testActionOnGroup = (actionType: string, group: boolean, index?: number) => {
      return new Promise((resolve, reject) => {
        const {wrapper, groupWrapper} = createBuilderAndGroup();

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
                expect((newNodeJson as IExpressionNodeJSON)).toStrictEqual({name: null, value: null})
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

  it("Checks, whether the builder provides services properly", () => {
    const wrapper = mount(ExpressionBuilderRenderless, {
      propsData: {
        value: new ExpressionBuilder(testJSON),
        fields: mockFields
      },
      components: {
        ExpressionNodeGroupRenderless
      },
      render(createElement, context) {
        return createElement(ExpressionNodeGroupRenderless, {
          props: {node: this.root}, scopedSlots: {
            default: () => null
          }
        })
      }
    });

    expect(wrapper.vm.$children).toHaveLength(1);
    expect((wrapper.vm.$children[0] as ExpressionNodeGroupRenderless).eventHub).toBeInstanceOf(Vue);
    expect((wrapper.vm.$children[0] as ExpressionNodeGroupRenderless).eventHub).toBe(wrapper.vm.eventHub);
    expect((wrapper.vm.$children[0] as ExpressionNodeGroupRenderless).conditionProvider).toBeInstanceOf(ConditionProvider);
    expect((wrapper.vm.$children[0] as ExpressionNodeGroupRenderless).conditionProvider).toBe(wrapper.vm.conditionProvider);
    expect((wrapper.vm.$children[0] as ExpressionNodeGroupRenderless).conditionProvider.fields).toStrictEqual((wrapper.vm.conditionProvider).fields);
    expect((wrapper.vm.$children[0] as ExpressionNodeGroupRenderless).conditionProvider.filters).toStrictEqual(wrapper.vm.conditionProvider.filters);
  })
});