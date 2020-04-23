import ExpressionNodeBase from "@/core/ExpressionNodeBase";
import errorTypes, {handleError} from "@/core/Errors";

describe("Testing error handlers", () => {
  it("Returning error messages", () => {
    let msg = "";
    const consoleMock = jest.fn(m => msg = m);
    console["error"] = consoleMock;
    handleError(errorTypes.INVALID_CONTEXT_PATH, undefined, [1,2,3]);
    expect(msg).toMatch(/Invalid context path/);
    expect(consoleMock).toHaveBeenCalledTimes(1);
    handleError(errorTypes.INVALID_INDEX_DELETE, undefined, 1);
    expect(consoleMock).toHaveBeenCalledTimes(2);
    expect(msg).toMatch(/Cannot delete node from non-existent index/);
    handleError(errorTypes.INVALID_INDEX_INSERT, undefined, 1);
    expect(consoleMock).toHaveBeenCalledTimes(3);
    expect(msg).toMatch(/Cannot insert node to non-existent index/);
    handleError(errorTypes.MAX_DEPTH_REACHED, undefined, 5);
    expect(consoleMock).toHaveBeenCalledTimes(4);
    expect(msg).toMatch(/Cannot add group to group, as its children would exceed the maximum depth/);
  });

  it("Calling custom handler", () => {
    const handler = jest.fn();
    handleError(errorTypes.INVALID_CONTEXT_PATH, handler, [1,2,3]);
    expect(handler).toHaveBeenCalledTimes(1);
    handleError(errorTypes.INVALID_INDEX_DELETE, handler, 1);
    expect(handler).toHaveBeenCalledTimes(2);
    handleError(errorTypes.INVALID_INDEX_INSERT, handler, 1);
    expect(handler).toHaveBeenCalledTimes(3);
    handleError(errorTypes.MAX_DEPTH_REACHED, handler, 5);
    expect(handler).toHaveBeenCalledTimes(4);
  })
});