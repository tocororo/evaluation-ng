
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SurveyValueService } from '../survey-resolver.service';

/**
 * Represents a control that allows to add (edit) a Survey. 
 */
@Component({
	selector: 'app-survey-edit',
	templateUrl: './survey-edit.component.html',
	styleUrls: ['./survey-edit.component.scss'],
    host: {
        'fxLayout': "'row wrap'",
		'fxLayout.xs': "'column'",
		'fxLayoutAlign': "'space-between center'",
		'formGroupName': "'survey'"
    }
})
export class SurveyEditComponent implements OnInit
{
	/**
	 * Returns the survey `FormGroup`. 
	 */
	public surveyFormGroup: FormGroup;

	public constructor(public surveyValueService: SurveyValueService)
	{
		this.surveyFormGroup = undefined;
	}

	public ngOnInit(): void
	{
		this.surveyFormGroup = this.surveyValueService.evaluationFormGroup.get('survey') as FormGroup;

		console.log('Data got for SurveyEditComponent: ', this.surveyFormGroup);
	}
}
