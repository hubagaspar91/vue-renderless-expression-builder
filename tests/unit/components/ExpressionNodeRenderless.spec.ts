import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import {mockFields, returnConditionProvider, testJSON} from "../../utils";
import {Vue} from "vue-property-decorator";
import {actionTypes, InputEventBody} from "@/components/Utils";
import {mount, Wrapper} from "@vue/test-utils";
import ExpressionNodeRenderless from "@/components/ExpressionNodeRenderless";
import {PROVIDE_CONDITION_FACTORY_KEY, PROVIDE_EVENT_HUB_KEY} from "@/components/ExpressionBuilderRenderless";
import ExpressionNode from "@/core/ExpressionNode";
import {defaultOperators} from "@/conditions/Defaults";

let group: ExpressionNodeGroup, eventHub: Vue, wrapper: Wrapper<ExpressionNodeRenderless>;

beforeAll(() => {
  group = ExpressionNodeGroup.fromJSON(testJSON);
  eventHub = new Vue();
});

beforeEach(() => {
  wrapper = mount(ExpressionNodeRenderless, {
    propsData: {
      node: (group.children[0] as ExpressionNodeGroup).children[0]
    },
    provide: {
      [PROVIDE_EVENT_HUB_KEY]: eventHub,
      [PROVIDE_CONDITION_FACTORY_KEY]: returnConditionProvider()
    },
    scopedSlots: {
      default: () => null
    }
  });
});


afterEach(() => {
  if (wrapper)
    wrapper.destroy();
});


describe("ExpressionNode - Sending Delete and Update events", () => {
  it("Delete", () => {
    return new Promise((resolve, reject) => {
      eventHub.$on("input", (body: InputEventBody) => {
        try {
          expect(body.node).toBe(undefined);
          expect(body.path).toStrictEqual([0, 0]);
          expect(body.action).toBe(actionTypes.DELETE);
        } catch (e) {
          reject(e);
        }
        resolve();
      });
      expect(wrapper.vm.eventHub).toBe(eventHub);
      wrapper.vm.emitDelete();
    })
  });

  it("Update", () => {
      wrapper.vm.updateCondition("test", defaultOperators.EQUALS, "testValue0123");
      expect(wrapper.vm.node.condition.value).toBe("testValue0123");
      expect(wrapper.vm.node.condition.operatorName).toBe(defaultOperators.EQUALS);
      expect(wrapper.vm.node.condition.fieldName).toBe("test");

  });
});