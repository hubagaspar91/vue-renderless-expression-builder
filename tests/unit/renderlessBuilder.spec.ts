import {mount} from "@vue/test-utils";
import ExpressionBuilderRenderless from "@/components/ExpressionBuilderRenderless";
import {ExpressionNode, ExpressionNodeGroup} from "@/core/ExpressionNodes";
import {Vue} from "vue-property-decorator";
import {testJSON} from "../utils";
import ExpressionNodeRenderless from "@/components/ExpressionNodeRenderless";
import {IExpressionNode, IExpressionNodeGroupJSON, IExpressionNodeJSON} from "@/core/Interfaces";
import ExpressionNodeGroupRenderless from "@/components/ExpressionNodeGroupRenderless";
import {InputEventBody} from "@/components/Utils";

describe("ExpressionBuilderRenderless", () => {

  it("Create instance", () => {
    const wrapper = mount(ExpressionBuilderRenderless, {
      scopedSlots: {
        default: () => null
      }
    });
    expect(wrapper.vm.root).toBeInstanceOf(ExpressionNodeGroup);
    expect(wrapper.vm.root.children).toHaveLength(0);
    expect(wrapper.vm.eventHub).toBeInstanceOf(Vue);
  });

  it("Create instance from json", () => {
    const wrapper = mount(ExpressionBuilderRenderless, {
      propsData: {
        JSON: testJSON
      },
      scopedSlots: {
        default: () => null
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
          JSON: testJSON
        },
        scopedSlots: {
          default: () => null
        }
      });

      const selectedNode = (wrapper.vm.root.children[0] as ExpressionNodeGroup).children[0];

      // creating a renderless node from the root path [0, 0] node
      const nodeWrapper = mount(ExpressionNodeRenderless, {
        propsData: {
          node: selectedNode,
          eventHub: wrapper.vm.eventHub
        },
        scopedSlots: {
          default: () => null
        }
      });
      return {wrapper, nodeWrapper, selectedNode};
    };

    it("toggleConnectionType", () => {
      return new Promise((resolve, reject) => {

        const {wrapper, nodeWrapper, selectedNode} = createBuilderAndNode();

        wrapper.vm.$on("input", (json: IExpressionNodeGroupJSON) => {
          try {
            expect((json.children[0] as IExpressionNodeGroupJSON).children[0].connectionType).not.toBe(selectedNode.connectionType);
            expect(((json.children[0] as IExpressionNodeGroupJSON).children[0] as IExpressionNodeJSON).condition)
              .toStrictEqual((selectedNode as ExpressionNode).condition);
          }
          catch(e) {
            reject();
          }
          finally {
            resolve();
          }
        });

        nodeWrapper.vm.toggleConnectionType(ExpressionNode.fromJSON);
      })
    });

    it("Delete - from ExpressionNodeRenderless", () => {
      return new Promise((resolve, reject) => {
        const {wrapper, nodeWrapper} = createBuilderAndNode();

        wrapper.vm.$on("input", (json: IExpressionNodeGroupJSON) => {
          try {
            expect((json.children[0] as IExpressionNodeGroupJSON).children).toHaveLength(0);
          } catch(e) {
            reject();
          }
          finally {
            resolve();
          }
        });

        nodeWrapper.vm.emitDelete();
      })
    });

    it("Update - from ExpressionNodeRenderless", () => {
      return new Promise((resolve, reject) => {
        const {wrapper, nodeWrapper, selectedNode} = createBuilderAndNode();

        const newCondition = {name: "test", value: 200};

        wrapper.vm.$on("input", (json: IExpressionNodeGroupJSON) => {
          try {
            expect(((json.children[0] as IExpressionNodeGroupJSON).children[0] as IExpressionNodeJSON).condition)
              .not.toStrictEqual((selectedNode as ExpressionNode).condition);
            expect(((json.children[0] as IExpressionNodeGroupJSON).children[0] as IExpressionNodeJSON).condition)
              .toStrictEqual(newCondition);
          }
          catch(e) {
            reject();
          }
          finally {
            resolve();
          }
        });

        nodeWrapper.vm.update(new ExpressionNode(newCondition));
      })
    });

    const createBuilderAndGroup = () => {
      // creating the renderless builder component
      const wrapper = mount(ExpressionBuilderRenderless, {
        propsData: {
          JSON: testJSON
        },
        scopedSlots: {
          default: () => null
        }
      });

      const selectedGroup = wrapper.vm.root.children[0] as ExpressionNodeGroup;

      // creating the node group
      const groupWrapper = mount(ExpressionNodeGroupRenderless, {
        propsData: {
          node: selectedGroup,
          eventHub: wrapper.vm.eventHub
        },
        scopedSlots: {
          default: () => null
        }
      });

      return {wrapper, groupWrapper, selectedGroup};
    };

    it("Set - from ExpressionNodeGroupRenderless",() => {
      return new Promise((resolve, reject) => {
        const {wrapper, groupWrapper, selectedGroup} = createBuilderAndGroup();

        const newNode = new ExpressionNode({name: "test", value: 500});

        wrapper.vm.$on("input", (json: IExpressionNodeGroupJSON) => {
          try {
            expect(selectedGroup.children).toHaveLength(1);
            expect(selectedGroup.children[0]).toBe(newNode);
            expect((json.children[0] as IExpressionNodeGroupJSON).children)
              .toHaveLength(1);
            expect((json.children[0] as IExpressionNodeGroupJSON).children[0] as IExpressionNodeJSON)
              .toStrictEqual(newNode.toJSON());
          }
          catch(e) {
            reject();
          }
          finally {
            resolve();
          }
        });

        groupWrapper.vm.set(newNode, 0);
      })
    });


  });
});