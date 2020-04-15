import ExpressionNodeGroup, {connectionTypes} from "@/core/ExpressionNodeGroup";
import {returnConditionProvider, testJSON} from "../../utils";
import {Vue} from "vue-property-decorator";
import {actionTypes, InputEventBody} from "@/components/Utils";
import {mount, Wrapper} from "@vue/test-utils";
import ExpressionNodeGroupRenderless from "@/components/ExpressionNodeGroupRenderless";
import {PROVIDE_CONDITION_FACTORY_KEY, PROVIDE_EVENT_HUB_KEY} from "@/components/ExpressionBuilderRenderless";
import ExpressionNode from "@/core/ExpressionNode";
import {defaultOperatorLabels, defaultOperators} from "@/conditions/Defaults";
import {ConditionFactoryCondition} from "@/conditions/Interfaces";


let nodeGroup: ExpressionNodeGroup, eventHub: Vue, wrapper: Wrapper<ExpressionNodeGroupRenderless>;

beforeAll(() => {
  nodeGroup = ExpressionNodeGroup.fromJSON(testJSON);
  eventHub = new Vue();
});

beforeEach(() => {
  wrapper = mount(ExpressionNodeGroupRenderless, {
    propsData: {
      node: nodeGroup.children[0]
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

const testGroupAction = (actionType: string, group: boolean, index?: number) => {
  return new Promise((resolve, reject) => {

    const newCondition = {name: "test", value: 100000};

    eventHub.$on("input", (body: InputEventBody) => {
      try {
        expect(body.action).toBe(actionType);
        if (!group) {
          if (actionType !== actionTypes.ADD)
            expect((body.node as ExpressionNode).condition).toStrictEqual(newCondition);
          else {
            expect((body.node as ExpressionNode).condition.fieldName).toBe("test");
          }
          expect(body.node).toBeInstanceOf(ExpressionNode);
        } else expect(body.node).toBeInstanceOf(ExpressionNodeGroup);

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
        node: nodeGroup.children[0]
      },
      provide: {
        [PROVIDE_EVENT_HUB_KEY]: eventHub,
        [PROVIDE_CONDITION_FACTORY_KEY]: returnConditionProvider()
      },
      scopedSlots: {
        default: () => null
      }
    });
    expect(wrapper0.vm.eventHub).toBe(eventHub);
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

describe("ExpressionNodeGroup - toggleConnectionType, Add, Insert Events", () => {

  it("toggleConnectionType - ExpressionNodeGroupRenderless", () => {
    const wrapper0 = mount(ExpressionNodeGroupRenderless, {
      propsData: {
        node: nodeGroup.children[0]
      },
      provide: {
        [PROVIDE_EVENT_HUB_KEY]: eventHub,
        [PROVIDE_CONDITION_FACTORY_KEY]: returnConditionProvider()
      },
      scopedSlots: {
        default: () => null
      }
    });
    expect(wrapper0.vm.eventHub).toBe(eventHub);
    wrapper0.vm.toggleConnectionType();
    expect(wrapper0.vm.node.connectionType).toBe(connectionTypes.AND);
  });

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