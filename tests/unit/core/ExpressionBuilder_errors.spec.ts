import ExpressionBuilder from "@/core/ExpressionBuilder";
import {testJSON} from "../../utils";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import errorTypes, {handleError} from "@/core/Errors";
import ExpressionNode from "@/core/ExpressionNode";

jest.mock("@/core/Errors");

describe("ExpressionBuilder - Restrictions, Error Handler", () => {

  it("Cannot be nested below maxDepth", () => {
    const eb = new ExpressionBuilder(testJSON);
    eb.add(new ExpressionNodeGroup())
      .add(new ExpressionNodeGroup())
      .add(new ExpressionNodeGroup())
      .add(new ExpressionNodeGroup())
      .add(new ExpressionNodeGroup());
    expect(handleError).toHaveBeenCalledWith(errorTypes.MAX_DEPTH_REACHED, undefined, 5);
  });

  it("Cannot be nested below maxDepth - inserting nested structure", () => {
    const eb = new ExpressionBuilder(new ExpressionNodeGroup({maxDepth: 3}));
    eb.add(new ExpressionNodeGroup())
      .add(new ExpressionNodeGroup({children: [new ExpressionNodeGroup()]}));
    expect(handleError).toHaveBeenCalledWith(errorTypes.MAX_DEPTH_REACHED, undefined, 3);
  });

  it("Cannot insert, set and delete non-existent index", () => {
    const eb = new ExpressionBuilder(testJSON);
    eb.add(new ExpressionNodeGroup());
    eb.insert(new ExpressionNode(), 2);
    expect(handleError).toHaveBeenCalledWith(errorTypes.INVALID_INDEX_INSERT, undefined, 2);
    eb.set(new ExpressionNode(), 3);
    expect(handleError).toHaveBeenCalledWith(errorTypes.INVALID_INDEX_INSERT, undefined, 3);
    eb.delete(4);
    expect(handleError).toHaveBeenCalledWith(errorTypes.INVALID_INDEX_DELETE, undefined, 4);
  });

  it("Tests maxDepth, currentDepth constraints", () => {
    const eb = new ExpressionBuilder(testJSON);
    eb.add(new ExpressionNodeGroup())
      .add(new ExpressionNodeGroup());
    expect(() => eb.context.currentDepth = 0).toThrowError(/Invalid current depth value/);
    expect(() => eb.context.maxDepth = 0).toThrowError(/maxDepth cannot be different from that of the parentNode/);
  });
});

