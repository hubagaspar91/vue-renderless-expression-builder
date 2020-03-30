import ExpressionBuilder from "@/core/ExpressionBuilder";
import ExpressionNode from "@/core/ExpressionNode";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";

describe("ExpressionNodeGroup - setting children manually", () => {
  it("Test whether parentNode, maxDepth and currentDepth is set correctly", () => {
    const eb = new ExpressionBuilder();
    eb.root.children = [
      new ExpressionNode({name: "test", value: 0}),
      new ExpressionNodeGroup()
    ];
    expect(eb.root.children).toHaveLength(2);
    expect(eb.root.children[0]).toBeInstanceOf(ExpressionNode);
    expect((eb.root.children[0] as ExpressionNode).condition).toStrictEqual({name: "test", value: 0});
    expect(eb.root.children[0].parentNode).toBe(eb.root);
    expect(eb.root.children[1].parentNode).toBe(eb.root);
    expect(eb.root.children[1]).toBeInstanceOf(ExpressionNodeGroup);
    expect((eb.root.children[1] as ExpressionNodeGroup).maxDepth).toBe(eb.root.maxDepth);
    expect((eb.root.children[1] as ExpressionNodeGroup).currentDepth).toBe(eb.root.currentDepth+1);
  });

  it("Tests, whether maxDepth guard is working when adding children manually", () => {
    const eb = new ExpressionBuilder(new ExpressionNodeGroup({maxDepth: 1}));
    expect(() => eb.root.children = [new ExpressionNodeGroup()])
      .toThrow(/Cannot add group to group, as its children would exceed the maxDepth/);
  });

  it("Test, whether depth checking works for inserting nested structures", () => {
    const eb = new ExpressionBuilder(new ExpressionNodeGroup({maxDepth: 2}));
    const toInsert = new ExpressionNodeGroup();
    toInsert.children = [new ExpressionNodeGroup()];
    expect(() => eb.root.children = [toInsert])
      .toThrow(/Cannot add group to group, as its children would exceed the maxDepth/);
  })
});