import {shallowMount, mount} from "@vue/test-utils";
import {testJSON} from "../utils";
import {ExpressionNode, ExpressionNodeGroup} from "@/core/ExpressionNodes";
import ExpressionNodeRenderless from "@/components/ExpressionNodeRenderless";
import {Vue} from "vue-property-decorator";
import {actionTypes, InputEventBody} from "@/components/Utils";
import ExpressionNodeGroupRenderless from "@/components/ExpressionNodeGroupRenderless";


describe("Renderless components", () => {
  describe("Nodes emiting events", () => {
    it("toggleConnectionType", () => {
      return new Promise((resolve, reject) => {
        const group = ExpressionNodeGroup.fromJSON(testJSON);
        const eventHub0 = new Vue();
        eventHub0.$on("input", (body: InputEventBody) => {
          try {
            expect(body.path).toStrictEqual([1]);
            expect(body.action).toBe(actionTypes.SET);
            expect((body.node as ExpressionNode).condition).toStrictEqual((group.children[1] as ExpressionNode).condition);
            expect(body.node.connectionType).not.toBe(group.children[1].connectionType);
          } catch (e) {
            reject();
          } finally {
            resolve();
          }
        });
        const wrapper0 = mount(ExpressionNodeRenderless, {
          propsData: {
            eventHub: eventHub0,
            node: group.children[1]
          },
          scopedSlots: {
            default: () => null
          }
        });
        expect(wrapper0.vm.eventHub).toBe(eventHub0);
        wrapper0.vm.toggleConnectionType(ExpressionNode.fromJSON);
      })
    });

    it("toggleConnectionType with deeper path", () => {
      return new Promise((resolve, reject) => {
        const group = ExpressionNodeGroup.fromJSON(testJSON);
        const eventHub0 = new Vue();
        eventHub0.$on("input", (body: InputEventBody) => {
          try {
            expect(body.path).toStrictEqual([0, 0]);
            expect(body.action).toBe(actionTypes.SET);
            expect((body.node as ExpressionNode).condition)
              .toStrictEqual(((group.children[0] as ExpressionNodeGroup).children[0] as ExpressionNode).condition);
            expect(body.node.connectionType).not
              .toBe((group.children[0] as ExpressionNodeGroup).children[0].connectionType);
          } catch (e) {
            reject();
          } finally {
            resolve();
          }
        });
        const wrapper0 = mount(ExpressionNodeRenderless, {
          propsData: {
            eventHub: eventHub0,
            node: (group.children[0] as ExpressionNodeGroup).children[0]
          },
          scopedSlots: {
            default: () => null
          }
        });
        expect(wrapper0.vm.eventHub).toBe(eventHub0);
        wrapper0.vm.toggleConnectionType(ExpressionNode.fromJSON);
      })
    });

    it("Delete - ExpressionNodeRenderless", () => {
      return new Promise((resolve, reject) => {
        const group = ExpressionNodeGroup.fromJSON(testJSON);
        const eventHub0 = new Vue();
        eventHub0.$on("input", (body: InputEventBody) => {
          try {
            expect(body.node).toBe(undefined);
            expect(body.path).toStrictEqual([0, 0]);
            expect(body.action).toBe(actionTypes.DELETE);
          } catch (e) {
            reject();
          } finally {
            resolve();
          }
        });
        const wrapper0 = mount(ExpressionNodeRenderless, {
          propsData: {
            eventHub: eventHub0,
            node: (group.children[0] as ExpressionNodeGroup).children[0]
          },
          scopedSlots: {
            default: () => null
          }
        });
        expect(wrapper0.vm.eventHub).toBe(eventHub0);
        wrapper0.vm.emitDelete();
      })
    });

    it("Update - ExpressionNodeRenderless", () => {
      return new Promise((resolve, reject) => {
        const group = ExpressionNodeGroup.fromJSON(testJSON);
        const eventHub0 = new Vue();
        eventHub0.$on("input", (body: InputEventBody) => {
          try {
            expect(body.node).toBeInstanceOf(ExpressionNode);
            expect((body.node as ExpressionNode).condition).toStrictEqual(newCondition);
            expect(body.path).toStrictEqual([0, 0]);
            expect(body.action).toBe(actionTypes.SET);
          } catch (e) {
            reject();
          } finally {
            resolve();
          }
        });
        const wrapper0 = mount(ExpressionNodeRenderless, {
          propsData: {
            eventHub: eventHub0,
            node: (group.children[0] as ExpressionNodeGroup).children[0]
          },
          scopedSlots: {
            default: () => null
          }
        });
        expect(wrapper0.vm.eventHub).toBe(eventHub0);
        const newCondition = {name: "test", value: 100};
        wrapper0.vm.update(new ExpressionNode(newCondition));
      })
    });


    const testGroupAction = (actionType: string, index?: number) => {
      return new Promise((resolve, reject) => {
        const group = ExpressionNodeGroup.fromJSON(testJSON);
        const eventHub0 = new Vue();
        eventHub0.$on("input", (body: InputEventBody) => {
          try {
            expect(body.action).toBe(actionType);
            expect((body.node as ExpressionNode).condition).toStrictEqual({name: "test", value: 0});

            switch (actionType) {
              case actionTypes.SET:
              case actionTypes.INSERT:
              case actionTypes.DELETE:
                expect(body.path).toStrictEqual([0, index]);
                break;
              case actionTypes.ADD:
                expect(body.path).toStrictEqual([0]);
            }
          } catch (e) {
            reject();
          } finally {
            resolve();
          }
        });
        const wrapper0 = mount(ExpressionNodeGroupRenderless, {
          propsData: {
            eventHub: eventHub0,
            node: group.children[0]
          },
          scopedSlots: {
            default: () => null
          }
        });
        expect(wrapper0.vm.eventHub).toBe(eventHub0);
        switch (actionType) {
          case actionTypes.SET:
            wrapper0.vm.set(new ExpressionNode({name: "test", value: 0}), (index as number));
            break;
          case actionTypes.INSERT:
            wrapper0.vm.insert(new ExpressionNode({name: "test", value: 0}), (index as number));
            break;
          case actionTypes.ADD:
            wrapper0.vm.add(new ExpressionNode({name: "test", value: 0}));
            break;
        }
      })
    };

    it("Set - ExpressionNodeGroupRenderless", () => {
      return testGroupAction(actionTypes.SET, 1);
    });

    it("Insert - ExpressionNodeGroupRenderless", () => {
      return testGroupAction(actionTypes.INSERT, 2);
    });

    it("Add - ExpressionNodeGroupRenderless", () => {
      return testGroupAction(actionTypes.ADD);
    });

  });
});