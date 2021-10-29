
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatHorizontalStepper, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { ActionText, Hit, InputContent, InputIssnComponent, TextInputAppearance,
	MessageHandler, StatusCode, HandlerComponent } from 'toco-lib';

import { Evaluation, EvaluationOnlyAnswer } from '../evaluation.entity';

import { SurveyService } from '../survey.service';
import { SurveyValueService } from '../survey-resolver.service';

@Component({
	selector: 'app-survey',
	templateUrl: './survey.component.html',
	styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit
{
	/**
	 * It is like a readonly field, and it is only used to initialize the form; for that reason, 
	 * its name begins with an underscore to remember you that you can NOT change its value after 
     * it is initialized. 
	 * Returns the action through a text. 
	 */
	public _actionText: ActionText;

	/**
	 * Returns the title. 
	 */
	public title: string;

	/**
	 * Returns true if the component has a task in progress; otherwise, false. 
	 * Example of task is: loading, updating, etc. 
	 * By default, its value is `true` because it represents the loading task. 
	 */
	public hasTaskInProgress: boolean;
 
	public evaluationFormGroup: FormGroup;
	public evalJournalDataFormGroup: FormGroup;
	public evalSurveyFormGroup: FormGroup;

	@ViewChild('stepper', { static: true })
	private _matHorizontalStepper: MatHorizontalStepper;

	/**
	 * It is like a readonly field, and it is only used to initialize the form; for that reason, 
	 * its name begins with an underscore to remember you that you can NOT change its value after 
     * it is initialized. 
	 */
	private _evaluation: Evaluation;

	public constructor(private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _transServ: TranslateService,
		private _surveyService: SurveyService,
		private _surveyValueService: SurveyValueService,
		private _dialog: MatDialog,
		private _snackBar: MatSnackBar)
	{
		this._actionText = undefined;
		this.title = '';

		/* The component begins its loading task. */
		this.hasTaskInProgress = true;

		this.evaluationFormGroup = undefined;
		this.evalJournalDataFormGroup = undefined;
		this.evalSurveyFormGroup = undefined;
		this._evaluation = undefined;
	}

	public ngOnInit(): void
	{
		/* The string ActionText.add is the value of the last route sub-path that is specified in the `*-routing.module.ts` file. */
		this._actionText = this._activatedRoute.snapshot.children[0].url[(this._activatedRoute.snapshot.children[0].url.length - 1)].path as ActionText;
		/* Saves the value to be used by descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
		* and `SurveyResultAndRecommendationsComponent`). */
		this._surveyValueService._actionText = this._actionText;

		switch (this._actionText)
		{
			case ActionText.view:
				{
					this.title = 'TITULO_VISTA_DETALLES';
					break;
				}

			case ActionText.add:
				{
					this.title = 'TITULO_VISTA_ADICIONAR';
					break;
				}

			default:
				{
					console.error('There is a configuration error with the URL because the programme does not know what to do with it!');
					break;
				}
		}

		this._activatedRoute.data.subscribe({
			next: (data: { 'evaluation': Hit<Evaluation> }) => {
				/* It is not necessary to realize deep copy because the `_evaluation` field 
				 * is like a readonly field, and it is only used to initialize the form; for that reason, 
				 * its name begins with an underscore to remember you that you can NOT change its value after 
     			 * it is initialized. */
				this._evaluation = data.evaluation.metadata;
				/* Saves the value to be used by descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
				* and `SurveyResultAndRecommendationsComponent`). */
				this._surveyValueService._evaluation = this._evaluation;

				this._initFormData();
				/* Saves the value to be used by descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
				* and `SurveyResultAndRecommendationsComponent`). */
				this._surveyValueService.evaluationFormGroup = this.evaluationFormGroup;

				/* The component ends its loading task. It is set here and not in the `complete` property because the `complete` notification is not sent. */
				this.hasTaskInProgress = false;
			},
			error: (err: any) => {
				/* The component ends its loading task. */
				this.hasTaskInProgress = false;

				const m = new MessageHandler(this._snackBar);
				m.showMessage(StatusCode.OK, err.message)
			}
		});

		console.log('Data got by survey component: ', this._evaluation, this.evaluationFormGroup);
	}

	/**
	 * Initializes the form data. 
	 */
	private _initFormData(): void
	{
		this.evaluationFormGroup = this._formBuilder.group({
			'journalData': this.evalJournalDataFormGroup = this._formBuilder.group({ }),

			'survey': this.evalSurveyFormGroup = this._formBuilder.group({ })
		});
	}

	public goToSurvey(): void
	{
		/* Selects and focuses the next step in list. */
		this._matHorizontalStepper.next();
	}

	public goToSurveyBack(): void
	{
		/* Selects and focuses the previous step in list. */
		this._matHorizontalStepper.previous();
	}

	public goToJournalData(): void
	{
		/* Selects and focuses the previous step in list. */
		this._matHorizontalStepper.previous();
	}

	public goToResultAndRecommendations(): void
	{
		/* Selects and focuses the next step in list. */
		this._matHorizontalStepper.next();
	}

	public save(): void
	{
		/* The component begins its updating task. */
		this.hasTaskInProgress = true;

		console.log('save: ', this.evaluationFormGroup.valid, this.evaluationFormGroup);

		this._surveyService.editEvaluation(this.evaluationFormGroup.value).subscribe({
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
