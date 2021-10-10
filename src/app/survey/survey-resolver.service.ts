
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { ActionText, Hit, SearchResponse, SearchService } from 'toco-lib';

import { Evaluation, evaluationEmpty } from './evaluation.entity';

/**
 * Represents an object with all its values set to empty. 
 */
const evaluationEmpty_Resolved: any = {
    'metadata': evaluationEmpty
};

/**
 * Represents an object used as mock data. 
 */
const evaluationExample: any = {
    'metadata': {
        'id': '876acbf2-5a67-4b5c-92ca-040761d54595',
        'name': 'Institutional Repository Name',
        'url': 'www.evaluation.com',
        'issn': '1234124x',
        'survey': {
            'name': 'Survey Name',
            'url': 'www.survey.com'
        }
    }
};

/**
 * This resolver is used on all views in order to get information from the backend about an Evaluation. 
 * In the case of adding view, it needs to resolve an object with all its values set to empty. 
 * In the case of remaining views (viewing and editing views), it needs to resolve an object from the backend. 
 */
@Injectable({
	providedIn: 'root',
})
export class SurveyResolverService implements Resolve<SearchResponse<Evaluation>>
{
	public constructor(private router: Router, private service: SearchService)
	{ }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SearchResponse<Evaluation>>
	{
        /* With this verification, it knows the type of data it needs to resolve. */
        if (route.children[0].url[(route.children[0].url.length - 1)].path == ActionText.add)  /* The string ActionText.add is the value of the last route sub-path that is specified in the `*-routing.module.ts` file. */
        {
            /* In the case of adding view, it needs to resolve an object with all its values set to empty. */
            return of(evaluationEmpty_Resolved);
        }

//// Backend data ////
//// TODO: Test and fix any issue when connecting to the backend. ////
        // let uuid = route.paramMap.get('uuid');

        // /* In the case of remaining views (viewing and editing views), it needs to resolve an object from the backend. */
		// return this.service.getEvaluationById(uuid).pipe(
        //     take(1),
        //     map(node => {
        //         if (node)
        //         {
        //             return node;
		// 		}
        //         else
        //         {
        //             this.router.navigate(['/']);
        //         }
        //     })
        // );
//////////////////////


//// Mock data ////
        /* In the case of remaining views (viewing and editing views), it needs to resolve an object from the backend. */
		return of(evaluationExample);
///////////////////
	}
}

/**
 * A service that behaves as the bridge between the `SurveyComponent` 
 * and the descendant components (`SurveyViewComponent`, `SurveyEditComponent`, 
 * `SurveyResultComponent`, and `SurveyRecommendationComponent`). 
 */
@Injectable({
    providedIn: 'root'
})
export class SurveyValueService
{
    /**
     * A value that is initialized in the `SurveyComponent`, and it is 
     * used by descendant components (`SurveyViewComponent`, `SurveyEditComponent`, 
     * `SurveyResultComponent`, and `SurveyRecommendationComponent`). 
     */
    public evaluationFormGroup: FormGroup;

    public constructor()
    {
        this.evaluationFormGroup = undefined;
    }
}
