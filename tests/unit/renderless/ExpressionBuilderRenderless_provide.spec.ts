import {mount} from "@vue/test-utils";
import ExpressionBuilderRenderless from "@/components/ExpressionBuilderRenderless";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {mockFields, testJSON} from "../../utils";
import ExpressionNodeGroupRenderless from "@/components/ExpressionNodeGroupRenderless";
import {Vue} from "vue-property-decorator";
import ConditionFactory from "@/conditions/ConditionFactory";

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
  expect((wrapper.vm.$children[0] as ExpressionNodeGroupRenderless).conditionFactory).toBeInstanceOf(ConditionFactory);
  expect((wrapper.vm.$children[0] as ExpressionNodeGroupRenderless).conditionFactory).toBe(wrapper.vm.conditionProvider);
  expect((wrapper.vm.$children[0] as ExpressionNodeGroupRenderless).conditionFactory.fields).toStrictEqual((wrapper.vm.conditionProvider).fields);
  expect((wrapper.vm.$children[0] as ExpressionNodeGroupRenderless).conditionFactory.operators).toStrictEqual(wrapper.vm.conditionProvider.operators);
});