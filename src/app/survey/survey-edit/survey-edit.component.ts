
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, AbstractControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { Hit, MessageHandler, StatusCode, 
	HandlerComponent } from 'toco-lib';

import { EvaluationOnlyAnswer } from '../evaluation.entity';

import { SurveyService } from '../survey.service';
import { SurveyValueService } from '../survey-resolver.service';

/**
 * Represents a control that allows to add (edit) a Survey. 
 */
@Component({
	selector: 'app-survey-edit',
	templateUrl: './survey-edit.component.html',
	styleUrls: ['./survey-edit.component.scss']
})
export class SurveyEditComponent implements OnInit
{
	/**
	 * Returns true if the component has a task in progress; otherwise, false. 
	 * Example of task is: loading, updating, etc. 
	 * By default, its value is `true` because it represents the loading task. 
	 */
	public hasTaskInProgress: boolean;

	public surveyFormGroup: FormGroup;

	public constructor(private _formBuilder: FormBuilder,
		private _transServ: TranslateService,
		private _surveyService: SurveyService,
		public surveyValueService: SurveyValueService,
		private _dialog: MatDialog,
		private _snackBar: MatSnackBar)
	{
		/* The component begins its loading task. */
		this.hasTaskInProgress = true;

		this.surveyFormGroup = undefined;
	}

	public ngOnInit(): void
	{
		this._initFormData();
		this.surveyValueService.evaluationFormGroup.addControl('survey', this.surveyFormGroup);

		console.log('Data got for SurveyEditComponent: ', this.surveyFormGroup);
	}

	/**
	 * Initializes the form data. 
	 */
	private _initFormData(): void
	{
		this.surveyFormGroup = this._formBuilder.group({ });
	}

	public save(): void
	{
		/* The component begins its updating task. */
		this.hasTaskInProgress = true;

		console.log('save: ', this.surveyFormGroup.valid, this.surveyFormGroup);

		this._surveyService.editEvaluation(this.surveyFormGroup.value).subscribe({
			next: (result: Hit<EvaluationOnlyAnswer>) => {
				console.log('save result: ', result);
			},
			error: (err: any) => {
				/* The component ends its updating task. */
				this.hasTaskInProgress = false;

				const m = new MessageHandler(this._snackBar);
				m.showMessage(StatusCode.OK, err.message)
			},
			complete: () => {
				/* The component ends its updating task. */
				this.hasTaskInProgress = false;

				let message: string = '';
				this._transServ.get('EVAL_REV_GUARDADA').subscribe((res: string) => {
					message = res;
				});
				let title: string = '';
				this._transServ.get('OPERACION_EXITOSA').subscribe((res: string) => {
					title = res;
				});

				const m = new MessageHandler(null, this._dialog);
				m.showMessage(StatusCode.OK, message, HandlerComponent.dialog, title, '50%');
			}
		});
	}
}
