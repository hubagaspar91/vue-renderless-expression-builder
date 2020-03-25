import ExpressionBuilder from "@/core/ExpressionBuilder";
import {connectionTypes} from "@/core/ExpressionNodeGroup";
import ExpressionNode from "@/core/ExpressionNode";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";

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
    const node0 = new ExpressionNode(nodeCond0);
    const nodeCond1 = {name: "test", value: 1};
    const node1 = new ExpressionNode(nodeCond1);
    const nodeCond2 = {name: "test", value: 2};
    const node2 = new ExpressionNode(nodeCond2);
    let eb = new ExpressionBuilder(new ExpressionNodeGroup({connectionType: connectionTypes.OR}));
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

  it("node0 or (node1 and node2)", () => {
    const nodeCond0 = {name: "test", value: 0};
    const node0 = new ExpressionNode(nodeCond0);
    const nodeCond1 = {name: "test", value: 1};
    const group0 = new ExpressionNodeGroup();
    const node1 = new ExpressionNode(nodeCond1);
    const nodeCond2 = {name: "test", value: 2};
    const node2 = new ExpressionNode(nodeCond2);
    let eb = new ExpressionBuilder(new ExpressionNodeGroup({connectionType: connectionTypes.OR}));
    eb.add(node0).add(group0).add(node1).add(node2);
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
    const node2 = new ExpressionNode(nodeCond2);
    const group0 = new ExpressionNodeGroup({connectionType: connectionTypes.OR});
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
    const node2 = new ExpressionNode(nodeCond2);
    const nodeCond3 = {name: "test", value: 3};
    const node3 = new ExpressionNode(nodeCond3);
    const nodeCond4 = {name: "test", value: 4};
    const node4 = new ExpressionNode(nodeCond4);
    const group0 = new ExpressionNodeGroup({connectionType: connectionTypes.OR});
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
    const node2 = new ExpressionNode(nodeCond2);
    const nodeCond3 = {name: "test", value: 3};
    const node3 = new ExpressionNode(nodeCond3);
    const nodeCond4 = {name: "test", value: 4};
    const node4 = new ExpressionNode(nodeCond4);
    const group0 = new ExpressionNodeGroup();
    const group1 = new ExpressionNodeGroup({connectionType: connectionTypes.OR});
    const group2 = new ExpressionNodeGroup({connectionType: connectionTypes.OR});
    const eb = new ExpressionBuilder();
    eb.add(group0)
      .add(group1)
      .add(node1)
      .add(node2)
      .contextUp()
      .add(group2)
      .add(node3)
      .add(node4)
      .contextToRoot()
      .add(node0);

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
    expect(flattened[1][1]).toStrictEqual(nodeCond1);
    expect(flattened[1][2]).toStrictEqual(nodeCond4);
    expect(flattened[2]).toBeInstanceOf(Array);
    expect(flattened[2]).toHaveLength(3);
    expect(flattened[2][0]).toStrictEqual(nodeCond0);
    expect(flattened[2][1]).toStrictEqual(nodeCond2);
    expect(flattened[2][2]).toStrictEqual(nodeCond3);
    expect(flattened[3]).toBeInstanceOf(Array);
    expect(flattened[3]).toHaveLength(3);
    expect(flattened[3][0]).toStrictEqual(nodeCond0);
    expect(flattened[3][1]).toStrictEqual(nodeCond2);
    expect(flattened[3][2]).toStrictEqual(nodeCond4);
  });

});
