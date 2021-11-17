
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { Hit } from 'toco-lib';

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
