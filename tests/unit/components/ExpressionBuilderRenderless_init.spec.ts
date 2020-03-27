import {mount, Wrapper} from "@vue/test-utils";
import ExpressionBuilderRenderless from "@/components/ExpressionBuilderRenderless";
import ExpressionBuilder from "@/core/ExpressionBuilder";
import {mockFields, testJSON} from "../../utils";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import {Vue} from "vue-property-decorator";

describe("ExpressionBuilderRenderless - Init Component", () => {

  it("Create instance", () => {
    const wrapper = mount(ExpressionBuilderRenderless, {
      propsData: {
        value: new ExpressionBuilder(),
        fields: mockFields
      },
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
        value: new ExpressionBuilder(testJSON),
        fields: mockFields
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

});