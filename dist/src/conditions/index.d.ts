import ConditionFactory from "@/conditions/ConditionFactory";
declare const _default: {
    ConditionFactory: typeof ConditionFactory;
    Defaults: {
        returnDefaultOperators: () => import("./Interfaces").ConditionFactoryOperator[];
        returnDefaultFieldTypes: () => import("./Interfaces").ConditionFactoryFieldTypeDefinition[];
        defaultFieldTypes: {
            TEXT: string;
            DATE: string;
            NUMBER: string;
            BOOLEAN: string;
            CHOICE: string;
            MULTIPLE_CHOICE: string;
            SELECT: string;
        };
        defaultOperators: Record<string, string>;
    };
};
export default _default;
