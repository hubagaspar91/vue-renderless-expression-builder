import ExpressionBuilder from "@/core/ExpressionBuilder";
import ExpressionNodeGroup, {connectionTypes} from "@/core/ExpressionNodeGroup";
import {testJSON} from "../../utils";
import ExpressionNode from "@/core/ExpressionNode";

function expectDefaults(group: ExpressionNodeGroup) {
  expect(group.children).toHaveLength(0);
  expect(group.connectionType).toBe(connectionTypes.AND);
  expect(group.maxDepth).toBe(0);
}

describe("ExpressionBuilder - Create and Export", () => {
  it("With defaults", () => {
    const eb = new ExpressionBuilder();
    expectDefaults(eb.root);
  });

  it("From existing ExpressionNodeGroup", () => {
    const group = new ExpressionNodeGroup({maxDepth: 3});
    const eb = new ExpressionBuilder(group);
    expect(eb.root).toStrictEqual(group);
  });

  it("From JSON representation", () => {
    const eb = new ExpressionBuilder(testJSON);

    // root
    expect(eb.root.connectionType).toBe(connectionTypes.AND);
    expect(eb.root.maxDepth).toBe(5);
    expect(eb.root.currentDepth).toBe(0);
    expect(eb.root.children).toHaveLength(2);

    // 0 child
    const child0 = <ExpressionNodeGroup>eb.root.children[0];
    expect(child0.connectionType).toBe(connectionTypes.OR);
    expect(child0.maxDepth).toBe(5);
    expect(child0.currentDepth).toBe(1);
    expect(child0.children).toHaveLength(1);

    // 0:0 child
    const child0_0 = <ExpressionNode>child0.children[0];
    expect(child0_0.condition.name).toBe("test");
    expect(child0_0.condition.value).toBe(1);

    // 0:1 child
    const child1 = <ExpressionNode>eb.root.children[1];
    expect(child1.condition.name).toBe("test");
    expect(child1.condition.value).toBe(2);
  });


  it("Testing toJSON export method", () => {
    const eb = new ExpressionBuilder(testJSON);
    const newJSON = eb.toJSON();
    expect(newJSON).toStrictEqual(testJSON);
  });
});