
import { EntityBase, Entity, Identifier } from 'toco-lib';

/**
 * Entity for Survey based on schema `...-v1.0.0.json`. 
 */
export class Survey extends EntityBase
{
    /**
     * Survey name. 
     */
     name: string;
     /**
      * Survey URL page. 
      */
     url: string;
}

/**
 * Entity for Evaluation based on schema `...-v1.0.0.json`. 
 */
export class Evaluation extends Entity
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
    /**
     * Journal survey. 
     */
    survey: Survey;
}

/**
 * Represents an object of `Survey` type with all its values set to empty. 
 */
export const surveyEmpty: any = {
    'name': '',
    'url': ''
};

/**
 * Represents an object of `Evaluation` type with all its values set to empty. 
 */
export const evaluationEmpty: any = {
    'id': '',
    'name': '',
    'url': '',
    'issn': '',
    'survey': surveyEmpty
};
