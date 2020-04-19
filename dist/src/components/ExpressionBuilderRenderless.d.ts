import { Vue } from 'vue-property-decorator';
import ExpressionBuilder from "@/core/ExpressionBuilder";
import ExpressionNodeGroup from "@/core/ExpressionNodeGroup";
import { ConditionFactoryField, ConditionFactoryFieldTypeDefinition, ConditionFactoryOperator } from "@/conditions/Interfaces";
import ConditionFactory from "@/conditions/ConditionFactory";
export declare const PROVIDE_EVENT_HUB_KEY = "$__qb_event_hub__";
export declare const PROVIDE_CONDITION_FACTORY_KEY = "$__qb_condition_factory__";
export default class ExpressionBuilderRenderless extends Vue {
    /**
     * Builder object, doing all the work, creating and preserving the consistency of the nested expression structure
     */
    protected value: ExpressionBuilder;
    /**
     * Event hub, through which nodes send the proposed state changes to the builder for execution, or dismissal
     * Also injected in child nodes
     */
    eventHub: Vue;
    /**
     * Filters, available for usage on the current builder instance
     */
    operators?: ConditionFactoryOperator[];
    /**
     * Fields available for filtering on the current builder instance
     */
    fields: ConditionFactoryField[];
    /**
     * Field types available on the instance
     */
    fieldTypes?: ConditionFactoryFieldTypeDefinition[];
    /**
     * Service for processing fields and filters into a factory service
     * That creates individual conditions from field, filter and value
     */
    conditionProvider: ConditionFactory;
    created(): void;
    beforeDestroy(): void;
    /**
     * Handles the input events from the child nodes, that suggests and change is to be made in the
     * Expression structure
     * @param body
     * @private
     */
    private handleInput;
    get root(): ExpressionNodeGroup;
    render(): any;
}
