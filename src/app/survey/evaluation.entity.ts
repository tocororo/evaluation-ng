
import { EntityBase, Entity, SelectOption, InputContent, Params } from 'toco-lib';

/**
 * The evaluation data that is stored in the frontend and backend are divided into two parts: schema and answer. 
 *  * Schema: (EvaluationSchema) A class that contains all the information to create the survey form dynamically. 
 *  * Answer: (EvaluationAnswer) A class that contains all the information entered by the user in the survey form. 
 *     * In addition, this class contains a `resultAndRecoms` field (for the result and recommendations), whose value is equal to or different from `undefined`. 
 *        * The `resultAndRecoms` field equal to `undefined` means that the evaluation has not been processed by the backend (because the backend is the one who produces this value). 
 *           * Examples of use of this case: 
 *              * When using the `SurveyComponent` component to add an evaluation in the first and second part. 
 *              * When using the `SurveyComponent` component to add an evaluation in the third part. 
 *        * The `resultAndRecoms` field different from `undefined` means that the evaluation was processed by the backend. 
 *           * Examples of use of this case: 
 *              * When using the `SurveyComponent` component to view an evaluation. 
 */

/**
 * An enum that represents the type of an `CategoryQuestion`. 
 */
export enum CategoryQuestionType
{
    /**
     * The `bool` type is the default type. It shows a boolean control. 
     */
    bool = 'bool',

    /**
     * It shows a numeric control. 
     */
    integer = 'integer',

    /**
     * It shows a select control. 
     */
    select = 'select'
}

/**
 * Entity for CategoryQuestion based on schema `...-v1.0.0.json`. 
 * Represents a survey section category question. 
 */
export class CategoryQuestion extends EntityBase
{
    /**
     * Question type. 
     */
    type: CategoryQuestionType;
    /**
     * Question id. 
     */
    id: string;
    /**
     * Question description. 
     */
    desc: string;
    /**
     * Question hint. 
     */
    hint: string;
    /**
     * Question answer. 
     */
    answer: any;
    /**
     * Possible minimum value. It is used if `type` == CategoryQuestionType.integer. 
     */
    min?: number;
    /**
     * Possible maximum value. It is used if `type` == CategoryQuestionType.integer. 
     */
    max?: number;
	/**
     * Options list that can be selected. It is used if `type` == CategoryQuestionType.select. 
	 */
    selectOptions?: SelectOption[];
    /**
     * This field is filled internally. 
     * For internal use only. 
     */
    _inputContent?: InputContent;
}

/**
 * Entity for SectionCategory based on schema `...-v1.0.0.json`. 
 * Represents a survey section category. 
 */
export class SectionCategory extends EntityBase
{
    /**
     * Category title. 
     */
    title: string;
    /**
     * Category desription. 
     */
    desc: string;
    /**
     * An array of questions associated with the category. 
     */
    questions: Array<CategoryQuestion>;
}

/**
 * Entity for SurveySection based on schema `...-v1.0.0.json`. 
 * Represents a survey section. 
 */
export class SurveySection extends EntityBase
{
    /**
     * Section title. 
     */
    title: string;
    /**
     * An array of categories associated with the section. 
     */
    categories: Array<SectionCategory>;
}

/**
 * Entity for JournalGeneralData based on schema `...-v1.0.0.json`. 
 * Represents the journal general data that a user fills in the first step. 
 */
 export class JournalGeneralData extends EntityBase
 {
    /**
     * Journal name. 
     */
     name: string;
     /**
      * Journal URL page. 
      */
     url: string;
     /**
      * Journal ISSN. 
      */
     issn: string;
 }

/**
 * Entity for Evaluation based on schema `...-v1.0.0.json`. 
 */
 export class Evaluation extends Entity
 {
    /**
     * User who made the evaluation. 
     */
    user: string;
    /**
     * Evaluation date. 
     */
    date: Date;

    /************************************* Journal Data ***************************/

    /**
     * Journal general data. 
     */
    journalData: JournalGeneralData;

    /**************************************** Survey ******************************/

    /**
     * An array of sections associated with the survey. 
     */
    sections: Array<SurveySection>;

    /****************************** Result and Recommendations ********************/

    /**
     * Result and recommendations. 
     */
     resultAndRecoms: Params<any>;
 }

/**
 * Entity for EvaluationOnlyAnswer based on schema `...-v1.0.0.json`. 
 * This class only contains the values that the user can add or modify. 
 */
export class EvaluationOnlyAnswer extends Entity
{
    /**
     * User who made the evaluation. 
     */
    user: string;
    /**
     * Evaluation date. 
     */
    date: Date;

    /************************************* Journal Data ***************************/

    /**
     * Journal general data. 
     */
     journalData: JournalGeneralData;

    /**************************************** Survey ******************************/

    /**
     * Journal survey. 
     */
    survey: Params<any>;

    /****************************** Result and Recommendations ********************/

    /**
     * Result and recommendations. 
     */
    resultAndRecoms: Params<any>;
}
