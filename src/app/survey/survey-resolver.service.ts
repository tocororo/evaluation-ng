
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { ActionText, Hit } from 'toco-lib';

import { Evaluation } from './evaluation.entity';
import { SurveyService } from './survey.service';

/**
 * This resolver is used on all views in order to get information from the backend about an Evaluation. 
 * In the case of adding view, it needs to resolve an object with all its values set to empty. 
 * In the case of remaining views (viewing and editing views), it needs to resolve an object from the backend. 
 */
@Injectable({
	providedIn: 'root',
})
export class SurveyResolverService implements Resolve<Hit<Evaluation>>
{
	public constructor(private _transServ: TranslateService, private _surveyService: SurveyService)
	{ }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Hit<Evaluation>>
	{
        let uuid = route.paramMap.get('uuid');

        console.log('From SurveyResolverService called getEvaluationById \n', 'Evaluation id: ', uuid, '_transServ.currentLang: ', this._transServ.currentLang);

        /* In the case of remaining views (viewing and editing views), it needs to resolve an object from the backend. */
		return this._surveyService.getEvaluationById(uuid, this._transServ.currentLang);
	}
}

/**
 * A service that behaves as the bridge between the `SurveyComponent` 
 * and the descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
 * and `SurveyResultAndRecommendationsComponent`). 
 */
@Injectable({
    providedIn: 'root'
})
export class SurveyValueService
{
    /**
     * It is like a readonly field, and it is only used to initialize the form; for that reason, 
     * its name begins with an underscore to remember you that you can NOT change its value after 
     * it is initialized. 
     * It is initialized in the `SurveyComponent`, and it is 
     * used by descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
     * and `SurveyResultAndRecommendationsComponent`). 
     * Returns the action through a text. 
     */
    public _actionText: ActionText;

    /**
     * It is like a readonly field, and it is only used to initialize the form; for that reason, 
     * its name begins with an underscore to remember you that you can NOT change its value after 
     * it is initialized. 
     * It is initialized in the `SurveyComponent`, and it is 
     * used by descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
     * and `SurveyResultAndRecommendationsComponent`). 
     */
    public _evaluation: Evaluation;

    /**
     * A value that is initialized in the `SurveyComponent`, and it is 
     * used by descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
     * and `SurveyResultAndRecommendationsComponent`). 
     */
    public evaluationFormGroup: FormGroup;

    public constructor()
    {
        this._actionText = undefined;
        this._evaluation = undefined;
        this.evaluationFormGroup = undefined;
    }
}
