
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Environment } from 'toco-lib';

import { EvaluationOnlyAnswer } from './evaluation.entity';

/**
 * Represents the service that communicates with the backend for all issues 
 * that refer to change an `Evaluation` and/or `EvaluationOnlyAnswer`. 
 */
@Injectable({
	providedIn: 'root'
})
export class SurveyService {

	private _prefix = 'evaluation';

	private _httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ',
		}),
	};

	public constructor(private _env: Environment, private _http: HttpClient)
	{ }

	public editEvaluation(evaluation: EvaluationOnlyAnswer): Observable<any>
	{
//// Backend data ////
		// TODO: Poner correctamente el campo `this._env.sceibaApi` o crear un `this._env.evaluationApi`. 
		// const url: string = this._env.sceibaApi + this._prefix + '/' + evaluation.id;

		// return this._http.put<any>(url, JSON.stringify(evaluation), this._httpOptions);
//////////////////////

//// Mock data ////
		console.error('editEvaluation: There is not backend yet!', evaluation);
		return of(evaluation);
///////////////////
	}
}
