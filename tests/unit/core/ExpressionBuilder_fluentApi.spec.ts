import ExpressionBuilder from "@/core/ExpressionBuilder";
import ExpressionNode from "@/core/ExpressionNode";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import errorTypes, {handleError} from "@/core/Errors";

jest.mock("@/core/Errors");

describe("ExpressionBuilder - Fluent API", () => {
  it("Tests add, insert, set, delete methods, and automatic context switch", () => {
    const eb = new ExpressionBuilder();
    const node0 = new ExpressionNode({name: "test", value: 0});
    const node1 = new ExpressionNode({name: "test", value: 1});
    const node2 = new ExpressionNode({name: "test", value: 2});
    const group0 = new ExpressionNodeGroup();
    eb.add(node0);
    expect(eb.root.children[0]).toBe(node0);
    expect(eb.context.children[0]).toBe(node0);
    eb.insert(node1, 0);
    expect(eb.root.children[0]).toBe(node1);
    expect(eb.context.children[0]).toBe(node1);
    expect(eb.root.children[1]).toBe(node0);
    expect(eb.context.children[1]).toBe(node0);
    eb.set(group0, 1);
    expect(eb.root.children[0]).toBe(node1);
    expect(eb.context).toBe(group0);
    eb.add(node2);
    expect(eb.context.children).toHaveLength(1);
    expect(eb.context.parentNode).toBe(eb.root);
    eb.delete(0);
    expect(eb.context.children).toHaveLength(0);
  });

  it("Insert and set not yet existing, next possible index", () => {
    const eb = new ExpressionBuilder();
    const cond0 = {name: "test", value: 0};
    eb.set(new ExpressionNode(cond0), 0);
    expect(eb.root.children).toHaveLength(1);
    expect((eb.root.children[0] as ExpressionNode).condition).toStrictEqual(cond0);
    eb.insert(new ExpressionNode(cond0), 1);
    expect(eb.root.children).toHaveLength(2);
    expect((eb.root.children[1] as ExpressionNode).condition).toStrictEqual(cond0);
  });

  it("Tests context switching", () => {
    const eb = new ExpressionBuilder();
    const group0 = new ExpressionNodeGroup();
    const group1 = new ExpressionNodeGroup();
    const group2 = new ExpressionNodeGroup();
    const group3 = new ExpressionNodeGroup();
    const node0 = new ExpressionNode({name: "test", value: 0});
    eb.add(group0);
    expect(eb.context).toBe(group0);
    expect(eb.context.parentNode).toBe(eb.root);
    expect(eb.context.parentNode).toBe(eb.root);
    eb.add(group1);
    expect(eb.context).toBe(group1);
    expect(eb.context.parentNode).toBe(group0);
    eb.contextUp();
    expect(eb.context).toBe(group0);
    expect(eb.context.parentNode).toBe(eb.root);
    eb.add(group2);
    eb.add(group3);
    expect(eb.context).toBe(group3);
    eb.contextToRoot();
    expect(eb.context).toBe(eb.root);
    eb.contextTo([0, 1, 0]);
    expect(eb.context).toBe(group3);
    eb.add(node0);

    // cant switch to ExpressionNode as context
    eb.contextTo([0, 1, 0, 0]);
    expect(handleError).toHaveBeenCalledWith(errorTypes.INVALID_CONTEXT_PATH, undefined, [0, 1, 0, 0]);
    // cant switch to non-exitent path
    eb.contextTo([0, 1, 0, 1]);
    expect(handleError).toHaveBeenCalledWith(errorTypes.INVALID_CONTEXT_PATH, undefined, [0, 1, 0, 1]);
  });
});