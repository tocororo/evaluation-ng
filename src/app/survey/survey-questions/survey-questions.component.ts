
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ChildControlsPath } from 'toco-lib';

import { SurveyValueService } from '../survey-resolver.service';

/**
 * Represents a control that contains the survey questions. 
 */
@Component({
	selector: 'app-survey-questions',
	templateUrl: './survey-questions.component.html',
	styleUrls: ['./survey-questions.component.scss']
})
export class SurveyQuestionsComponent implements OnInit
{
	/**
	 * An object of paths that is used to get the child controls in the `surveyFormGroup` control. 
	 * The value of its properties is a dot-delimited string value or an array of string/number values 
	 * that define the path to a child control. 
	 */
	public readonly survey_ChildControlsPath: ChildControlsPath = {
		'survey': 'survey'
	};

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
		this.surveyFormGroup = this.surveyValueService.evaluationFormGroup.get(this.survey_ChildControlsPath.survey) as FormGroup;

		console.log('Data got for SurveyQuestionsComponent: ', this.surveyFormGroup);
	}
}
