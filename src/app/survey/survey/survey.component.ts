
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { ActionText, ChildControlsPath, Hit, InputContent, InputIssnComponent, MessageHandler, StatusCode, TextInputAppearance } from 'toco-lib';

import { Evaluation } from '../evaluation.entity';

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
	 * An object of paths that is used to get the child controls in the `evaluationFormGroup` control. 
	 * The value of its properties is a dot-delimited string value or an array of string/number values 
	 * that define the path to a child control. 
	 */
	 public readonly evaluation_ChildControlsPath: ChildControlsPath = {
		'name': 'name',
		'url': 'url',
		'issn': 'issn'
	};

	/**
	 * Returns the action through a text. 
	 */
	public actionText: ActionText;

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
	public issnContent: InputContent;
	/**
	 * It is like a readonly field, and it is only used to initialize the form; for that reason, 
	 * its name begins with an underscore to remember you that you can NOT change its value. 
	 */
	public _evaluation: Evaluation;

	/**
	 * Returns the selected tab position. Its value is set internally. 
	 */
	private _selectedTabPos: number;

	/**
	 * Represents the current control that is analyzed for displaying an error. 
	 * It is only used internally. 
	 */
	private _controlToDisplayError: AbstractControl;
	/**
	 * Represents the map of errors returned from failed validation checks. 
	 * It is only used internally. 
	 */
	private _validationErrors: ValidationErrors;
	/**
	 * Represents the validation error of required. 
	 */
	private _validationError_required: string;
	 /**
	  * Represents the validation error of invalid character. 
	  */
	private _validationError_invalidCharacter: string;

	public constructor(private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _surveyService: SurveyService,
		private _surveyValueService: SurveyValueService,
		private _dialog: MatDialog,
		private _snackBar: MatSnackBar)
	{
		this.actionText = undefined;
		this.title = '';

		/* The component begins its loading task. */
		this.hasTaskInProgress = true;

		this.evaluationFormGroup = undefined;
		this.issnContent = undefined;
		this._evaluation = undefined;

		this._selectedTabPos = 0;

		this._controlToDisplayError = undefined;
		this._validationErrors = undefined;
		this._validationError_required = 'VAL_ERROR_REQUERIDO';
		this._validationError_invalidCharacter = 'VAL_ERROR_CARACTER_INVAL';
	}

	public ngOnInit(): void
	{
		/* The string ActionText.add is the value of the last route sub-path that is specified in the `*-routing.module.ts` file. */
		this.actionText = this._activatedRoute.snapshot.children[0].url[(this._activatedRoute.snapshot.children[0].url.length - 1)].path as ActionText;

		switch (this.actionText)
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

			case ActionText.edit:
				{
					this.title = 'TITULO_VISTA_EDITAR';
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
				 * its name begins with an underscore to remember you that you can NOT change its value. */
				this._evaluation = data.evaluation.metadata;

				this._initFormData();
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

	public onSelectTab(newPos: number): void
	{
		// console.log('onSelectTab pos: ', newPos);

		switch ((this._selectedTabPos = newPos))
		{
			case 0:  /* Survey */
				{
					break;
				}

			case 1:  /* Result */
				{
					break;
				}

			default:  /* Recommendation */
				{
					break;
				}
		}
	}

	/**
	 * Initializes the form data. 
	 */
	private _initFormData(): void
	{
		this.issnContent = {
			'formControl': InputIssnComponent.getFormControlByDefault(),
			'name': 'issn',
			'label': 'ISSN',
			'controlType': InputIssnComponent,
			'value': this._evaluation.issn,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'ISSN'
		};

		this.evaluationFormGroup = this._formBuilder.group({
			'name': new FormControl(this._evaluation.name, 
				Validators.pattern('^[a-zA-Z\_][a-zA-Z\-\_\ \0-9]*$')
			),
 
			'url': new FormControl(this._evaluation.url, [
				Validators.pattern(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/i)
				//Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i)
			]),

			'issn': this.issnContent.formControl,

			'survey': this._formBuilder.group({
				'name': new FormControl(this._evaluation.survey.name, 
					Validators.pattern('^[a-zA-Z\_][a-zA-Z\-\_\ \0-9]*$')
				),
	 
				'url': new FormControl(this._evaluation.survey.url, [
					Validators.pattern(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/i)
					//Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i)
				])
			})
		});
	}

	/**
	 * Returns true if the control is in an error state; otherwise, false. 
	 */
	public getErrorState(controlName: Array<string | number> | string): boolean
	{
		this._controlToDisplayError = this.evaluationFormGroup.get(controlName);

		/* The control does not display errors before the user has a 
		 * chance to edit the form. The checks for dirty and touched prevent errors 
		 * from showing until the user does one of two things: changes the value, 
		 * turning the control dirty; or blurs the form control element, setting the 
		 * control to touched. 
		 * Thus, it reveals an error message only if the control is invalid and 
		 * the control is either dirty or touched. */
		return ((this._controlToDisplayError.invalid) && (this._controlToDisplayError.dirty || this._controlToDisplayError.touched));
	}

	/**
	 * Returns an error string if the control is in an error state; otherwise, empty string. 
	 */
	public getErrorMessage(controlName: Array<string | number> | string): string
	{
		this._validationErrors = (this._controlToDisplayError = this.evaluationFormGroup.get(controlName)).errors;

		/* Shows the text errors. They have a descendant order of importance. */
		if (this._validationErrors)
		{
			if (this._validationErrors[Validators.pattern.name])
			{
				return this._validationError_invalidCharacter;
			}

			if (this._validationErrors[Validators.required.name])
			{
				return this._validationError_required;
			}
		}

		return '';
	}
}
