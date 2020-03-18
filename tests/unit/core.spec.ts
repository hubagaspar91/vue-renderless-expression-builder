import ExpressionBuilder from "@/core/ExpressionBuilder";
import {connectionTypes, ExpressionNode, ExpressionNodeGroup} from "@/core/ExpressionNodes";
import {IExpressionNodeGroupJSON, IExpressionNodeJSON} from "@/core/Interfaces";

function expectDefaults(json: IExpressionNodeGroupJSON) {
  expect(json.opts.children).toHaveLength(0);
  expect(json.connectionType).toBe(connectionTypes.AND);
  expect(json.opts.currentDepth).toBe(0);
  expect(json.opts.maxDepth).toBe(3);
}

const testJSON: IExpressionNodeGroupJSON = {
  connectionType: "and",
  opts: {
    children: [
      {
        connectionType: "or",
        opts: {
          maxDepth: 5,
          currentDepth: 1,
          children: [
            {
              connectionType: "and",
              condition: {
                name: "test",
                value: 1
              }
            }
          ]
        }
      },
      {
        connectionType: "or",
        condition: {
          name: "test",
          value: 2
        }
      }
    ],
    maxDepth: 5,
    currentDepth: 0
  }
};

describe("ExpressionBuilder - fluently building an Expression", () => {

  it("Creating the expression builder - with defaults", () => {
    const eb = new ExpressionBuilder();
    const json = eb.toJSON();
    expectDefaults(json);
  });

  it("Creating the expression builder - from existing ExpressionNodeGroup", () => {
    const group = new ExpressionNodeGroup();
    const eb = new ExpressionBuilder(group);
    const json = eb.toJSON();
    expectDefaults(json);
  });

  it("Creating the expression builder - using the fromJSON.", () => {
    const eb = new ExpressionBuilder(testJSON);
    const json = eb.toJSON();

    // root
    expect(json.connectionType).toBe(connectionTypes.AND);
    expect(json.opts.maxDepth).toBe(5);
    expect(json.opts.currentDepth).toBe(0);
    expect(json.opts.children).toHaveLength(2);

    // 0 child
    const child0 = <IExpressionNodeGroupJSON> json.opts.children[0];
    expect(child0.connectionType).toBe(connectionTypes.OR);
    expect(child0.opts.maxDepth).toBe(5);
    expect(child0.opts.currentDepth).toBe(1);
    expect(child0.opts.children).toHaveLength(1);

    // 0:0 child
    const child0_0 = <IExpressionNodeJSON> child0.opts.children[0];
    expect(child0_0.connectionType).toBe(connectionTypes.AND);
    expect(child0_0.condition.name).toBe("test");
    expect(child0_0.condition.value).toBe(1);

    // 0:1 child
    const child1 = <IExpressionNodeJSON> json.opts.children[1];
    expect(child1.connectionType).toBe(connectionTypes.OR);
    expect(child1.condition.name).toBe("test");
    expect(child1.condition.value).toBe(2);
  });

  it("Tests add, insert, set, delete methods, and automatic context switch", () => {
    const eb = new ExpressionBuilder();
    const node0 = new ExpressionNode({name: "test", value: 0});
    const node1 = new ExpressionNode({name: "test", value: 1}, connectionTypes.OR);
    const node2 = new ExpressionNode({name: "test", value: 2}, connectionTypes.AND);
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

  it("Tests context switching", () => {
    const initGroup = new ExpressionNodeGroup({maxDepth: 5, currentDepth: 0, children: []});
    const eb = new ExpressionBuilder(initGroup);
    const group0 = new ExpressionNodeGroup();
    const group1 = new ExpressionNodeGroup();
    const group2 = new ExpressionNodeGroup();
    const group3 = new ExpressionNodeGroup();
    eb.add(group0);
    expect(eb.context).toBe(group0);
    expect(eb.context.parentNode).toBe(initGroup);
    expect(eb.context.parentNode).toBe(eb.root);
    eb.add(group1);
    expect(eb.context).toBe(group1);
    expect(eb.context.parentNode).toBe(group0);
    eb.contextUp();
    expect(eb.context).toBe(group0);
    expect(eb.context.parentNode).toBe(initGroup);
    eb.add(group2);
    eb.add(group3);
    expect(eb.context).toBe(group3);
    eb.contextToRoot();
    expect(eb.context).toBe(eb.root);
    eb.contextTo([0, 1, 0]);
    expect(eb.context).toBe(group3);
  });

  it("Testing toJSON export method", () => {
    const eb = new ExpressionBuilder(testJSON);
    const newJSON = eb.toJSON();
    expect(newJSON).toStrictEqual(testJSON);
  });

  // it("Testing flatten methods", () => {
  //   const eb = new ExpressionBuilder();
  //   const node0Cond = {name: "test", value: 0};
  //   const node0 = new ExpressionNode(node0Cond);
  //   const node1 = new ExpressionNode({name: "test", value: 1}, connectionTypes.OR);
  //   const node2 = new ExpressionNode({name: "test", value: 2}, connectionTypes.AND);
  //   const group0 = new ExpressionNodeGroup(undefined, connectionTypes.OR);
  //   const group1 = new ExpressionNodeGroup(undefined, connectionTypes.AND);
  //   const group2 = new ExpressionNodeGroup(undefined, connectionTypes.OR);
  //
  //   eb.add(node0)
  // });
});

