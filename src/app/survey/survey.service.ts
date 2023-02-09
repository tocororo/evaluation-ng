
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { cloneValue, Environment, Hit } from 'toco-lib';

import { CategoryQuestionType, Evaluation, EvaluationAnswer } from './evaluation.entity';
import { url } from 'inspector';


/**
 * Represents the service that communicates with the backend for all issues 
 * that refer to work with an `Evaluation` and/or `EvaluationAnswer`. 
 */
@Injectable({
	providedIn: 'root'
})
export class SurveyService
{
	private _prefix = 'evaluation';

	private _httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ',
		}),
	};

	public constructor(private _env: Environment, private _router: Router, private _http: HttpClient)
	{ }
    
    survey: any = [];

    addSurvey(){
        const json = {
            name:'Ernesto',
            url:'https://www.hlal.com',
            issn: '0317-8471',
    
        }
     this.survey = this._http.post(`${this._env.sceibaApi}${'evaluation/new'}`,json); 
	 console.log(typeof this.survey)
     return this.survey;

    }


    getSurvey(){
        return this._http.get(`${this._env.sceibaApi}${'evaluation/new'}`)
    }



	/**
	 * Constructs a `GET` request that interprets the body as a JSON object and returns 
	 * the response body in the `Hit<Evaluation>` type. 
	 * @param id Evaluation id. 
	 * In the case of adding view, this `id` argument is `undefined` (maybe only in the first use of this method). 
	 * In the case of remaining views (viewing and editing views), this `id` argument is NOT `undefined`. 
     * @param evaluationWasDone True if the evaluation was done for the inserted data; otherwise, false. 
	 * @param currentLang Language currently used as string. 
	 * The Spanish language is: 'es'. 
	 * The English language is: 'en'. 
	 * @return An `Observable` of the `HTTPResponse`, with a response body in the `Hit<Evaluation>` type. 
	 */
    
	public getEvaluationById(id: string, evaluationWasDone: boolean, currentLang: string): Observable<Hit<Evaluation>>
	{
//// Backend data //////////////////////////
		// // TODO: Test and fix any issue when connecting to the backend. 

		// /* In the case of adding view, this occurs when the `id` argument is `undefined`, 
		// it needs to get an object with all its values set to `undefined`, and 
        // the `resultAndRecoms` field set to `undefined`. 
		// This is a great optimization that you can implement in the backend. */
		// // TODO: I think that we need to crete `_env.evaluationApi` field and use it instead of `_env.cuorApi`. 
		// let req: string = this._env.cuorApi + 'evaluations/';

		// /* In the case of remaining views (viewing and editing views), this occurs when the `id` argument is NOT `undefined`, 
		// it needs to get an object set to the stored data. */
		// if (id)
		// {
		// 	req += id + '/';
		// }
		// // console.log(req);

		// return this._http.get<Hit<Evaluation>>(req, { params: { 'evaluationWasDone': ((evaluationWasDone) ? 'true' : 'false'), 'currentLang': currentLang } }).pipe(
		// 	map(hit => {
		// 		if (hit)
		// 		{
		// 			return hit;
		// 		}
		// 		else
		// 		{
		// 			// TODO: Do a better processing for this case; for example, show an error message before redirecting to home view. 
		// 			this._router.navigate(['/']);
		// 		}
		// 	})
		// );
////////////////////////////////////////////


//// Mock data /////////////////////////////
        let res: any;

		if (id)
		{
			/* In the case of remaining views (viewing and editing views), this occurs when the `id` argument is NOT `undefined`, 
			it needs to get an object set to the stored data. */

            if (currentLang == 'es')
            {
                res.metadata = this.getSurvey;
                //res.metadata.resultAndRecoms = ((evaluationWasDone) ? cloneValue(this.getSurvey) : undefined);
            }
            else
            {
                res = this.getSurvey;
                //res.metadata.resultAndRecoms = ((evaluationWasDone) ? cloneValue(this.getSurvey) : undefined);
            }
		}
		else
		{
			/* In the case of adding view, this occurs when the `id` argument is `undefined`, 
			it needs to get an object with all its values set to `undefined`, and 
            the `resultAndRecoms` field set to `undefined`. 
			This is a great optimization that you can implement in the backend. */

            if (currentLang == 'es')
            {
                res = this.getSurvey;
               // res.metadata.resultAndRecoms = ((evaluationWasDone) ? cloneValue(this.getSurvey) : undefined);
            }
            else
            {
                res = this.getSurvey;
               //  res.metadata.resultAndRecoms = ((evaluationWasDone) ? cloneValue(this.getSurvey) : undefined);
            }
		}

        return of(res);
////////////////////////////////////////////
	}

	/**
	 * Constructs a `PUT` request that interprets the body as a JSON object and returns 
	 * an observable of the response. 
     * Sends the data that was inserted by the user (an `EvaluationAnswer` object 
     * with the `resultAndRecoms` field sets to `undefined`) to the backend in order to 
     * realize the processing and gets the result and recommendations. 
     * Then, the backend returns an object `EvaluationAnswer` with the `resultAndRecoms` 
     * field different of `undefined`, and this result is showed in the third part "Result and Recommendations". 
	 * @param evaluation Evaluation answer. 
	 * @param currentLang Language currently used as string. 
	 * The Spanish language is: 'es'. 
	 * The English language is: 'en'. 
	 * @return An `Observable` of the `HTTPResponse`, with a response body in the `Hit<Evaluation>` type. 
	 */
    public doEvaluation(evaluation: EvaluationAnswer, currentLang: string): Observable<any>
	{
//// Backend data //////////////////////////
		// // TODO: Poner correctamente el campo `this._env.sceibaApi` o crear un `this._env.evaluationApi`. 
		// const url: string = this._env.sceibaApi + this._prefix + '/do';

        // this._httpOptions['params'] = { 'currentLang': currentLang };
		// return this._http.put<Hit<EvaluationAnswer>>(url, JSON.stringify(evaluation), this._httpOptions);
////////////////////////////////////////////


//// Mock data /////////////////////////////
		console.error('doEvaluation: There is not backend yet!', evaluation);
        return ((currentLang == 'es')
            ? of({
                'metadata': {
                    'id': '876acbf2-5a67-4b5c-92ca-040761d54595',
                    'user': evaluation.user,
                    'date': evaluation.date,
                    'journalData': evaluation.journalData,
                    'sections': evaluation.survey,
                    'resultAndRecoms': cloneValue(this.getSurvey)
                }
            })
            : of({
                'metadata': {
                    'id': '876acbf2-5a67-4b5c-92ca-040761d54595',
                    'user': evaluation.user,
                    'date': evaluation.date,
                    'journalData': evaluation.journalData,
                    'sections': evaluation.survey,
                    'resultAndRecoms': cloneValue(this.getSurvey)
                }
            })
        );
////////////////////////////////////////////
	}

	public editEvaluation(evaluation: EvaluationAnswer): Observable<any>
	{
//// Backend data //////////////////////////
		// // TODO: Poner correctamente el campo `this._env.sceibaApi` o crear un `this._env.evaluationApi`. 
		// const url: string = this._env.sceibaApi + this._prefix + '/' + evaluation.id;

        // /* It is NOT necessary to indicate the language. */
		// return this._http.put<Hit<EvaluationAnswer>>(url, JSON.stringify(evaluation), this._httpOptions);
////////////////////////////////////////////


//// Mock data /////////////////////////////
		console.error('editEvaluation: There is not backend yet!', evaluation);
		return of(evaluation);
////////////////////////////////////////////
	}
}
