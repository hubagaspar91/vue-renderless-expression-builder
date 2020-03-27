export const errorTypes = {
  MAX_DEPTH_REACHED: "maxDepthReached",
  INVALID_INDEX_INSERT: "invalidIndexInsert",
  INVALID_INDEX_DELETE: "invalidIndexDelete",
  INVALID_CONTEXT_PATH: "invalidContextPath"
};

interface ErrorTypeMessageFactoryMap {
  [index: string]: Function;
}

const errorTypeMessageFactoryMap = {
  [errorTypes.MAX_DEPTH_REACHED]: (maxDepth: number) => `Reached max depth: ${maxDepth}. Cannot nest conditions any further.`,
  [errorTypes.INVALID_INDEX_INSERT]: (index: number) => `Cannot insert node to non-existent index: ${index}`,
  [errorTypes.INVALID_INDEX_DELETE]: (index: number) => `Cannot delete node from non-existent index: ${index}`,
  [errorTypes.INVALID_CONTEXT_PATH]: (path: number[]) => `Invalid context path [${path.join(", ")}], new context must be an ExpressionNodeGroup node`
};

/**
 * Logs the error to the console, and invokes the custom error handler, provided on the ExpressionNodeBuilder instance
 * @param type
 * @param customHandler
 * @param factoryParam
 */
export const handleError = (type: string, customHandler?: Function, factoryParam?: any) => {
  const msg = (errorTypeMessageFactoryMap as ErrorTypeMessageFactoryMap)[type](factoryParam);
  if (customHandler)
    customHandler(type, msg);
  console.error(msg);
};

export default errorTypes;