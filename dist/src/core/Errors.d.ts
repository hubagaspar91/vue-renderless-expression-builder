export declare const errorTypes: {
    MAX_DEPTH_REACHED: string;
    INVALID_INDEX_INSERT: string;
    INVALID_INDEX_DELETE: string;
    INVALID_CONTEXT_PATH: string;
};
/**
 * Logs the error to the console, and invokes the custom error handler, provided on the ExpressionNodeBuilder instance
 * @param type
 * @param customHandler
 * @param factoryParam
 */
export declare const handleError: (type: string, customHandler?: Function | undefined, factoryParam?: any) => void;
export default errorTypes;
