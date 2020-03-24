declare const errorTypes: {
    MAX_DEPTH_REACHED: string;
    INVALID_INDEX_INSERT: string;
    INVALID_INDEX_DELETE: string;
    INVALID_CONTEXT_PATH: string;
};
export declare const handleError: (type: string, customHandler?: Function | undefined, factoryParam?: any) => void;
export default errorTypes;
