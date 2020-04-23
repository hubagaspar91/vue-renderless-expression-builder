import { ConditionFactoryField, ConditionFactoryFieldTypeDefinition, ConditionFactoryCondition, ConditionFactoryOperator, ConditionFactoryOpts } from "@/conditions/Interfaces";
export default class ConditionFactory {
    private readonly _operators;
    private _fields;
    private readonly _fieldTypes;
    private readonly _eventHub;
    constructor(opts: ConditionFactoryOpts);
    get fields(): ConditionFactoryField[];
    get operators(): ConditionFactoryOperator[];
    get fieldTypes(): ConditionFactoryFieldTypeDefinition[];
    create(fieldName?: string, operatorName?: string, value?: any): ConditionFactoryCondition;
    /**
     * Creates a condition, and updates the provided node with Vue.set
     * It then signals the builder, that the root has been updated
     * @param node
     * @param fieldName
     * @param operatorName
     * @param value
     */
    createAndUpdate(node: Object, fieldName?: string, operatorName?: string, value?: any): void;
    private _processOpts;
}
