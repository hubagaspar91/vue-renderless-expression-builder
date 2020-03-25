import {mount} from "@vue/test-utils";
import {mockFields, testJSON} from "../utils";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import ExpressionNodeRenderless from "@/components/ExpressionNodeRenderless";
import {Vue} from "vue-property-decorator";
import {actionTypes, InputEventBody} from "@/components/Utils";
import ExpressionNodeGroupRenderless from "@/components/ExpressionNodeGroupRenderless";
import ExpressionNode from "@/core/ExpressionNode";
import {provideConditionProviderKey, provideEventHubKey} from "@/components/ExpressionBuilderRenderless";
import ConditionProvider from "@/conditions/ConditionProvider";
import {returnDefaultFilters} from "@/conditions/Defaults";

const returnConditionProvider = () => new ConditionProvider({fields: mockFields, filters: returnDefaultFilters()});


describe("Renderless components", () => {
  describe("Nodes emiting events", () => {
    it("toggleConnectionType - ExpressionNodeGroupRenderless", () => {
      return new Promise((resolve, reject) => {
        const group = ExpressionNodeGroup.fromJSON(testJSON);
        const eventHub0 = new Vue();
        eventHub0.$on("input", (body: InputEventBody) => {
          try {
            expect(body.path).toStrictEqual([0]);
            expect(body.action).toBe(actionTypes.SET);
            expect((body.node as ExpressionNodeGroup).connectionType).not
              .toBe((group.children[0] as ExpressionNodeGroup).connectionType);
          } catch (e) {
            reject(e);
          }
          resolve();

        });
        const wrapper0 = mount(ExpressionNodeGroupRenderless, {
          propsData: {
            node: group.children[0]
          },
          provide: {
            [provideEventHubKey]: eventHub0,
            [provideConditionProviderKey]: returnConditionProvider()
          },
          scopedSlots: {
            default: () => null
          }
        });
        expect(wrapper0.vm.eventHub).toBe(eventHub0);
        wrapper0.vm.toggleConnectionType();
      })
    });

    it("Delete - Base", () => {
      return new Promise((resolve, reject) => {
        const group = ExpressionNodeGroup.fromJSON(testJSON);
        const eventHub0 = new Vue();
        eventHub0.$on("input", (body: InputEventBody) => {
          try {
            expect(body.node).toBe(undefined);
            expect(body.path).toStrictEqual([0, 0]);
            expect(body.action).toBe(actionTypes.DELETE);
          } catch (e) {
            reject(e);
          }
          resolve();

        });
        const wrapper0 = mount(ExpressionNodeRenderless, {
          propsData: {
            node: (group.children[0] as ExpressionNodeGroup).children[0]
          },
          provide: {
            [provideEventHubKey]: eventHub0,
            [provideConditionProviderKey]: returnConditionProvider()
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
            reject(e);
          }
          resolve();

        });
        const wrapper0 = mount(ExpressionNodeRenderless, {
          propsData: {
            node: (group.children[0] as ExpressionNodeGroup).children[0]
          },
          provide: {
            [provideEventHubKey]: eventHub0,
            [provideConditionProviderKey]: returnConditionProvider()
          },
          scopedSlots: {
            default: () => null
          }
        });
        expect(wrapper0.vm.eventHub).toBe(eventHub0);
        const newCondition = {name: "test", value: 100};
        wrapper0.vm.update(newCondition);
      })
    });


    const testGroupAction = (actionType: string, group: boolean, index?: number) => {
      return new Promise((resolve, reject) => {
        const group = ExpressionNodeGroup.fromJSON(testJSON);
        const eventHub0 = new Vue();
        const newCondition = {name: "test", value: 100000};
        eventHub0.$on("input", (body: InputEventBody) => {
          try {
            expect(body.action).toBe(actionType);
            if (!group) {
              if (actionType !== actionTypes.ADD)
                expect((body.node as ExpressionNode).condition).toStrictEqual(newCondition);
              else
                expect((body.node as ExpressionNode).condition).toStrictEqual({name: null, value: null});
              expect(body.node).toBeInstanceOf(ExpressionNode);
            }
            else expect(body.node).toBeInstanceOf(ExpressionNodeGroup);

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
            reject(e);
          }
          resolve();

        });
        const wrapper0 = mount(ExpressionNodeGroupRenderless, {
          propsData: {
            node: group.children[0]
          },
          provide: {
            [provideEventHubKey]: eventHub0,
            [provideConditionProviderKey]: returnConditionProvider()
          },
          scopedSlots: {
            default: () => null
          }
        });
        expect(wrapper0.vm.eventHub).toBe(eventHub0);
        switch (actionType) {
          case actionTypes.INSERT:
            if (group)
              wrapper0.vm.insert(new ExpressionNodeGroup(), (index as number));
            else
              wrapper0.vm.insert(new ExpressionNode(newCondition), (index as number));
            break;
          case actionTypes.ADD:
            if (group)
              wrapper0.vm.addGroup();
            else
              wrapper0.vm.addNode();
            break;
        }
      })
    };

    it("insertNode - ExpressionNodeGroupRenderless", () => {
      return testGroupAction(actionTypes.INSERT, false, 2);
    });

    it("insertGroup - ExpressionNodeGroupRenderless", () => {
      return testGroupAction(actionTypes.INSERT, true, 2);
    });

    it("addNode - ExpressionNodeGroupRenderless", () => {
      return testGroupAction(actionTypes.ADD, false);
    });

    it("addGroup - ExpressionNodeGroupRenderless", () => {
      return testGroupAction(actionTypes.ADD, true);
    });

  });
});