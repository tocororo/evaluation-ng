
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { ActionText, ChildControlsPath, InputContent, InputIssnComponent, InputTextComponent, TextInputAppearance } from 'toco-lib';

import { JournalGeneralData } from '../evaluation.entity';

/**
 * Represents a control that contains the journal general data associated with the survey. 
 */
@Component({
	selector: 'app-survey-journal-data',
	templateUrl: './survey-journal-data.component.html',
	styleUrls: ['./survey-journal-data.component.scss']
})
export class SurveyJournalDataComponent implements OnInit
{
	/**
	 * An object of paths that is used to get the child controls in the `evaluationFormGroup` control. 
	 * The value of its properties is a dot-delimited string value or an array of string/number values 
	 * that define the path to a child control. 
	 */
	public readonly journalData_ChildControlsPath: ChildControlsPath = {
		'name': 'name',
		'url': 'url',
		'issn': 'issn'
	};

	/**
	 * Returns the action through a text. 
	 * It is like a readonly field, and it is only used to initialize the form; for that reason, 
	 * its name begins with an underscore to remember you that you can NOT change its value after 
	 * it is initialized. 
	 */
	@Input()
	public _actionText: ActionText;

	/**
	 * Returns the journal general data. 
	 * It is like a readonly field, and it is only used to initialize the form; for that reason, 
	 * its name begins with an underscore to remember you that you can NOT change its value after 
	 * it is initialized. 
	 */
	@Input()
	public _journalData: JournalGeneralData;

	/**
	 * Returns the journal general data `FormGroup`. 
	 */
	@Input()
	public journalDataFormGroup: FormGroup;
	public nameContent: InputContent;
	public issnContent: InputContent;

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

	public constructor()
	{
		this._actionText = undefined;
		this._journalData = undefined;
		this.journalDataFormGroup = undefined;
		this.nameContent = undefined;
		this.issnContent = undefined;

		this._controlToDisplayError = undefined;
		this._validationErrors = undefined;
		this._validationError_required = 'VAL_ERROR_REQUERIDO';
		this._validationError_invalidCharacter = 'VAL_ERROR_CARACTER_INVAL';
	}

	public ngOnInit(): void
	{
		this._initFormData();

		console.log('Data got for SurveyJournalDataComponent: ', this.journalDataFormGroup);
	}

	/**
	 * Initializes the form data. 
	 */
	private _initFormData(): void
	{
		this.nameContent = {
			'formControl': InputTextComponent.getFormControlByDefault({ 'pattern': '^[a-zA-Z\_áéíóúÁÉÍÓÚ][a-zA-Z\-\_áéíóúÁÉÍÓÚ\ 0-9]*$' }),
			'name': this.journalData_ChildControlsPath.name as string,
			'label': 'NOMBRE',
			'controlType': InputTextComponent,
			'value': this._journalData.name,
			'required': true,
			'width': '100%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'NOMBRE'
		};

		this.issnContent = {
			'formControl': InputIssnComponent.getFormControlByDefault(),
			'name': this.journalData_ChildControlsPath.issn as string,
			'label': 'ISSN',
			'controlType': InputIssnComponent,
			'value': this._journalData.issn,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'ISSN'
		};
 
		/* Adds control to `journalDataFormGroup`. */

		this.journalDataFormGroup.addControl(this.journalData_ChildControlsPath.name as string,
			this.nameContent.formControl
		);

		this.journalDataFormGroup.addControl(this.journalData_ChildControlsPath.url as string,
			new FormControl(this._journalData.url,
				Validators.pattern(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/i)
				// Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i)
		));

		this.journalDataFormGroup.addControl(this.journalData_ChildControlsPath.issn as string,
			this.issnContent.formControl
		);
	}

	/**
	 * Returns true if the control is in an error state; otherwise, false. 
	 */
	public getErrorState(controlName: Array<string | number> | string): boolean
	{
		this._controlToDisplayError = this.journalDataFormGroup.get(controlName);
 
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
		this._validationErrors = (this._controlToDisplayError = this.journalDataFormGroup.get(controlName)).errors;
 
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
