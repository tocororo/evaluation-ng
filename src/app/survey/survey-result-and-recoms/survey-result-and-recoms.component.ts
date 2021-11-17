
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Params } from 'toco-lib';

/**
 * Represents a control that contains the result and recommendations associated with the survey. 
 */
@Component({
	selector: 'app-survey-result-and-recoms',
	templateUrl: './survey-result-and-recoms.component.html',
	styleUrls: ['./survey-result-and-recoms.component.scss']
})
export class SurveyResultAndRecomsComponent implements OnInit
{
	/**
	 * Returns the result and recommendations. 
	 * It is like a readonly field, and it is only used to initialize the form; for that reason, 
	 * its name begins with an underscore to remember you that you can NOT change its value after 
	 * it is initialized. 
	 */
	@Input()
	public _resultAndRecoms: Params<any>;

	/**
	 * Returns the result and recommendations `FormGroup`. 
	 */
	@Input()
	public resultAndRecomsFormGroup: FormGroup;

	public constructor()
	{
		this._resultAndRecoms = undefined;
		this.resultAndRecomsFormGroup = undefined;
	}

	public ngOnInit(): void
	{
		console.log('Data got for SurveyResultAndRecomsComponent: ', this.resultAndRecomsFormGroup);
	}
}
