import ExpressionBuilder from "@/core/ExpressionBuilder";
import {connectionTypes, ExpressionNode, ExpressionNodeGroup} from "@/core/ExpressionNodes";
import {IExpressionNodeGroupJSON} from "@/core/Interfaces";

function expectDefaults(group: ExpressionNodeGroup) {
  expect(group.children).toHaveLength(0);
  expect(group.connectionType).toBe(connectionTypes.AND);
  expect(group.maxDepth).toBe(0);
}

const testJSON: IExpressionNodeGroupJSON = {
  connectionType: "and",
  maxDepth: 5,
  children: [
    {
      connectionType: "or",
      children: [
        {
          connectionType: "and",
          condition: {
            name: "test",
            value: 1
          }
        }
      ]
    },
    {
      connectionType: "or",
      condition: {
        name: "test",
        value: 2
      }
    }
  ]
};

describe("ExpressionBuilder - create and export instance", () => {

  it("With defaults", () => {
    const eb = new ExpressionBuilder();
    expectDefaults(eb.root);
  });

  it("From existing ExpressionNodeGroup", () => {
    const group = new ExpressionNodeGroup();
    const eb = new ExpressionBuilder(group);
    expectDefaults(eb.root);
  });

  it("From JSON representation", () => {
    const eb = new ExpressionBuilder(testJSON);

    // root
    expect(eb.root.connectionType).toBe(connectionTypes.AND);
    expect(eb.root.maxDepth).toBe(5);
    expect(eb.root.currentDepth).toBe(0);
    expect(eb.root.children).toHaveLength(2);

    // 0 child
    const child0 = <ExpressionNodeGroup> eb.root.children[0];
    expect(child0.connectionType).toBe(connectionTypes.OR);
    expect(child0.maxDepth).toBe(5);
    expect(child0.currentDepth).toBe(1);
    expect(child0.children).toHaveLength(1);

    // 0:0 child
    const child0_0 = <ExpressionNode> child0.children[0];
    expect(child0_0.connectionType).toBe(connectionTypes.AND);
    expect(child0_0.condition.name).toBe("test");
    expect(child0_0.condition.value).toBe(1);

    // 0:1 child
    const child1 = <ExpressionNode> eb.root.children[1];
    expect(child1.connectionType).toBe(connectionTypes.OR);
    expect(child1.condition.name).toBe("test");
    expect(child1.condition.value).toBe(2);
  });


  it("Testing toJSON export method", () => {
    const eb = new ExpressionBuilder(testJSON);
    const newJSON = eb.toJSON();
    expect(newJSON).toStrictEqual(testJSON);
  });
});

describe("ExpressionBuilder - testing fluent api", () => {
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

  it("Tests addNew, insertNew, setNew methods, and automatic context switch", () => {
    const eb = new ExpressionBuilder();
    const cond0 = {name: "test", value: 0};
    const cond1 = {name: "test", value: 1};
    eb.addNew(ExpressionBuilder.NODE, undefined, cond0);
    expect((eb.root.children[0] as ExpressionNode).condition).toStrictEqual(cond0);
    expect((eb.context.children[0] as ExpressionNode).condition).toStrictEqual(cond0);
    eb.insertNew(ExpressionBuilder.NODE, 0, undefined, cond1);
    expect((eb.root.children[0] as ExpressionNode).condition).toStrictEqual(cond1);
    expect((eb.context.children[0] as ExpressionNode).condition).toStrictEqual(cond1);
    expect((eb.root.children[1] as ExpressionNode).condition).toStrictEqual(cond0);
    expect((eb.context.children[1] as ExpressionNode).condition).toStrictEqual(cond0);
    eb.setNew(ExpressionBuilder.GROUP, 1);
    expect((eb.root.children[0] as ExpressionNode).condition).toStrictEqual(cond1);
    expect(eb.root.children[1]).toBeInstanceOf(ExpressionNodeGroup);
    expect(eb.context).toBeInstanceOf(ExpressionNodeGroup);
    expect(eb.context).not.toBe(eb.root);
    expect(eb.context.parentNode).toBe(eb.root);
  });

  it("Insert and set not yet existing, next possible index", () => {
    const eb = new ExpressionBuilder();
    const cond0 = {name: "test", value: 0};
    eb.setNew(ExpressionBuilder.NODE, 0, connectionTypes.OR, cond0);
    expect(eb.root.children).toHaveLength(1);
    expect(eb.root.children[0].connectionType).toBe(connectionTypes.OR);
    expect((eb.root.children[0] as ExpressionNode).condition).toStrictEqual(cond0);
    eb.insertNew(ExpressionBuilder.NODE, 1, connectionTypes.OR, cond0);
    expect(eb.root.children).toHaveLength(2);
    expect(eb.root.children[1].connectionType).toBe(connectionTypes.OR);
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
    expect(() => eb.contextTo([0, 1, 0, 0])).toThrowError(/Invalid path/);
    // cant switch to non-exitent path
    expect(() => eb.contextTo([0, 1, 0, 1])).toThrowError(/Invalid path/);
  });
});

describe("ExpressionBuilder - testing restrictions, exceptions", () => {
  it("Cannot be nested below maxDepth", () => {
    const eb = new ExpressionBuilder(testJSON);
    expect(() => eb
      .addNew(ExpressionBuilder.GROUP)
      .addNew(ExpressionBuilder.GROUP)
      .addNew(ExpressionBuilder.GROUP)
      .addNew(ExpressionBuilder.GROUP)).toThrowError(/Reached max depth/);
  });

  it("Cannot insert, set and delete non-existent index", () => {
    const eb = new ExpressionBuilder(testJSON);
    eb.addNew(ExpressionBuilder.GROUP);
    expect(() => eb.insertNew(ExpressionBuilder.NODE, 2)).toThrowError(/Invalid index/);
    expect(() => eb.setNew(ExpressionBuilder.NODE, 2)).toThrowError(/Invalid index/);
    expect(() => eb.delete(2)).toThrowError(/Invalid index/);
  });

  it("Tests maxDepth, currentDepth constraints", () => {
    const eb = new ExpressionBuilder(testJSON);
    eb.addNew(ExpressionBuilder.GROUP)
      .addNew(ExpressionBuilder.GROUP);
    expect(() => eb.context.currentDepth = 0).toThrowError(/Invalid current depth value/);
    expect(() => eb.context.maxDepth = 0).toThrowError(/maxDepth cannot be different from that of the parentNode/);
  });
});

describe("ExpressionBuilder - testing flatten method", () => {
  it("node and node and node", () => {
    const nodeCond0 = {name: "test", value: 0};
    const node0 = new ExpressionNode(nodeCond0);
    const nodeCond1 = {name: "test", value: 1};
    const node1 = new ExpressionNode(nodeCond1);
    const nodeCond2 = {name: "test", value: 2};
    const node2 = new ExpressionNode(nodeCond2);
    let eb = new ExpressionBuilder();
    eb.add(node0).add(node1).add(node2);
    let flattened = eb.flatten();
    expect(flattened).toHaveLength(1);
    expect(flattened).toBeInstanceOf(Array);
    expect(flattened[0]).toBeInstanceOf(Array);
    expect(flattened[0]).toHaveLength(3);
    expect(flattened[0][0]).toStrictEqual(nodeCond0);
    expect(flattened[0][1]).toStrictEqual(nodeCond1);
    expect(flattened[0][2]).toStrictEqual(nodeCond2);
  });

  it("node0 or node1 or node2", () => {
    const nodeCond0 = {name: "test", value: 0};
    const node0 = new ExpressionNode(nodeCond0, connectionTypes.OR);
    const nodeCond1 = {name: "test", value: 1};
    const node1 = new ExpressionNode(nodeCond1, connectionTypes.OR);
    const nodeCond2 = {name: "test", value: 2};
    const node2 = new ExpressionNode(nodeCond2, connectionTypes.OR);
    let eb = new ExpressionBuilder();
    eb.add(node0).add(node1).add(node2);
    let flattened = eb.flatten();
    expect(flattened).toHaveLength(3);
    expect(flattened).toBeInstanceOf(Array);
    expect(flattened[0]).toBeInstanceOf(Array);
    expect(flattened[0]).toHaveLength(1);
    expect(flattened[0][0]).toStrictEqual(nodeCond0);
    expect(flattened[1]).toBeInstanceOf(Array);
    expect(flattened[1]).toHaveLength(1);
    expect(flattened[1][0]).toStrictEqual(nodeCond1);
    expect(flattened[2]).toBeInstanceOf(Array);
    expect(flattened[2]).toHaveLength(1);
    expect(flattened[2][0]).toStrictEqual(nodeCond2);
  });

  it("node0 or node1 and node2", () => {
    const nodeCond0 = {name: "test", value: 0};
    const node0 = new ExpressionNode(nodeCond0, connectionTypes.OR);
    const nodeCond1 = {name: "test", value: 1};
    const node1 = new ExpressionNode(nodeCond1, connectionTypes.OR);
    const nodeCond2 = {name: "test", value: 2};
    const node2 = new ExpressionNode(nodeCond2, connectionTypes.AND);
    let eb = new ExpressionBuilder();
    eb.add(node0).add(node1).add(node2);
    let flattened = eb.flatten();
    expect(flattened).toHaveLength(2);
    expect(flattened).toBeInstanceOf(Array);
    expect(flattened[0]).toBeInstanceOf(Array);
    expect(flattened[0]).toHaveLength(1);
    expect(flattened[0][0]).toStrictEqual(nodeCond0);
    expect(flattened[1]).toBeInstanceOf(Array);
    expect(flattened[1]).toHaveLength(2);
    expect(flattened[1][0]).toStrictEqual(nodeCond1);
    expect(flattened[1][1]).toStrictEqual(nodeCond2);
  });



  it("node0 and (node1 or node2)g0", () => {
    const nodeCond0 = {name: "test", value: 0};
    const node0 = new ExpressionNode(nodeCond0);
    const nodeCond1 = {name: "test", value: 1};
    const node1 = new ExpressionNode(nodeCond1);
    const nodeCond2 = {name: "test", value: 2};
    const node2 = new ExpressionNode(nodeCond2, connectionTypes.OR);
    const group0 = new ExpressionNodeGroup();
    let eb = new ExpressionBuilder();
    eb.add(node0).add(group0).add(node1).add(node2);
    let flattened = eb.flatten();
    expect(flattened).toHaveLength(2);
    expect(flattened[0]).toBeInstanceOf(Array);
    expect(flattened[0]).toHaveLength(2);
    expect(flattened[0][0]).toStrictEqual(nodeCond0);
    expect(flattened[0][1]).toStrictEqual(nodeCond1);
    expect(flattened[1]).toBeInstanceOf(Array);
    expect(flattened[1]).toHaveLength(2);
    expect(flattened[1][0]).toStrictEqual(nodeCond0);
    expect(flattened[1][1]).toStrictEqual(nodeCond2);
  });

  it("node0 and ((node1 and node2)g1 or (node3 and node4)g2)g0", () => {
    const nodeCond0 = {name: "test", value: 0};
    const node0 = new ExpressionNode(nodeCond0);
    const nodeCond1 = {name: "test", value: 1};
    const node1 = new ExpressionNode(nodeCond1);
    const nodeCond2 = {name: "test", value: 2};
    const node2 = new ExpressionNode(nodeCond2, connectionTypes.AND);
    const nodeCond3 = {name: "test", value: 3};
    const node3 = new ExpressionNode(nodeCond3);
    const nodeCond4 = {name: "test", value: 4};
    const node4 = new ExpressionNode(nodeCond4, connectionTypes.AND);
    const group0 = new ExpressionNodeGroup();
    const group1 = new ExpressionNodeGroup();
    const group2 = new ExpressionNodeGroup(undefined, connectionTypes.OR);
    const eb = new ExpressionBuilder();
    eb.add(node0)
      .add(group0)
      .add(group1)
      .add(node1)
      .add(node2)
      .contextUp()
      .add(group2)
      .add(node3)
      .add(node4);

    const flattened = eb.flatten();
    expect(flattened).toBeInstanceOf(Array);
    expect(flattened).toHaveLength(2);
    expect(flattened[0]).toBeInstanceOf(Array);
    expect(flattened[0]).toHaveLength(3);
    expect(flattened[0][0]).toStrictEqual(nodeCond0);
    expect(flattened[0][1]).toStrictEqual(nodeCond1);
    expect(flattened[0][2]).toStrictEqual(nodeCond2);
    expect(flattened[1]).toBeInstanceOf(Array);
    expect(flattened[1]).toHaveLength(3);
    expect(flattened[1][0]).toStrictEqual(nodeCond0);
    expect(flattened[1][1]).toStrictEqual(nodeCond3);
    expect(flattened[1][2]).toStrictEqual(nodeCond4);
  });

  it("node0 and ((node1 or node2)g1 and (node3 or node4)g2)g0", () => {
    const nodeCond0 = {name: "test", value: 0};
    const node0 = new ExpressionNode(nodeCond0);
    const nodeCond1 = {name: "test", value: 1};
    const node1 = new ExpressionNode(nodeCond1);
    const nodeCond2 = {name: "test", value: 2};
    const node2 = new ExpressionNode(nodeCond2, connectionTypes.OR);
    const nodeCond3 = {name: "test", value: 3};
    const node3 = new ExpressionNode(nodeCond3);
    const nodeCond4 = {name: "test", value: 4};
    const node4 = new ExpressionNode(nodeCond4, connectionTypes.OR);
    const group0 = new ExpressionNodeGroup();
    const group1 = new ExpressionNodeGroup();
    const group2 = new ExpressionNodeGroup();
    const eb = new ExpressionBuilder();
    eb.add(node0)
      .add(group0)
      .add(group1)
      .add(node1)
      .add(node2)
      .contextUp()
      .add(group2)
      .add(node3)
      .add(node4);

    const flattened = eb.flatten();
    expect(flattened).toBeInstanceOf(Array);
    expect(flattened).toHaveLength(4);
    expect(flattened[0]).toBeInstanceOf(Array);
    expect(flattened[0]).toHaveLength(3);
    expect(flattened[0][0]).toStrictEqual(nodeCond0);
    expect(flattened[0][1]).toStrictEqual(nodeCond1);
    expect(flattened[0][2]).toStrictEqual(nodeCond3);
    expect(flattened[1]).toBeInstanceOf(Array);
    expect(flattened[1]).toHaveLength(3);
    expect(flattened[1][0]).toStrictEqual(nodeCond0);
    expect(flattened[1][1]).toStrictEqual(nodeCond2);
    expect(flattened[1][2]).toStrictEqual(nodeCond3);
    expect(flattened[2]).toBeInstanceOf(Array);
    expect(flattened[2]).toHaveLength(3);
    expect(flattened[2][0]).toStrictEqual(nodeCond0);
    expect(flattened[2][1]).toStrictEqual(nodeCond1);
    expect(flattened[2][2]).toStrictEqual(nodeCond4);
    expect(flattened[3]).toBeInstanceOf(Array);
    expect(flattened[3]).toHaveLength(3);
    expect(flattened[3][0]).toStrictEqual(nodeCond0);
    expect(flattened[3][1]).toStrictEqual(nodeCond2);
    expect(flattened[3][2]).toStrictEqual(nodeCond4);
  });

});
