
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormArray, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { ActionText, Hit, MessageHandler, DialogDeleteConfirmComponent, StatusCode, 
	HandlerComponent, IdentifierSchemas, ChildControlsPath } from 'toco-lib';

import { Evaluation } from '../evaluation.entity';

import { SurveyService } from '../survey.service';

/**
 * Represents a control that allows to add or edit a Survey. 
 */
@Component({
	selector: 'survey-edit',
	templateUrl: './survey-edit.component.html',
	styleUrls: ['./survey-edit.component.scss']
})
export class SurveyEditComponent implements OnInit
{
	/**
	 * An object of paths that is used to get the child controls in the `surveyFormGroup` control. 
	 * The value of its properties is a dot-delimited string value or an array of string/number values 
	 * that define the path to a child control. 
	 */
	public readonly survey_ChildControlsPath: ChildControlsPath = {
		'name': 'name',
		'mainInst': 'mainInst',
		'mainInst_o_name': 'name',  /* _o = only */
		'mainInst_o_ids': 'identifiers',  /* _o = only */
		'mainInst_name': 'mainInst.name',
		'mainInst_ids_o_idtype': 'idtype',  /* _o = only */
		'mainInst_ids_o_value': 'value',  /* _o = only */
		'url': 'url',
		'url_oai': 'url_oai'
	};

	/**
	 * Returns true if the component has a task in progress; otherwise, false. 
	 * Example of task is: loading, updating, etc. 
	 * By default, its value is `true` because it represents the loading task. 
	 */
	public hasTaskInProgress: boolean;

	/**
	 * Returns true if the component is used as an adding view; otherwise, false. 
	 * By default, its value is `false`. 
	 */
	public isAddingView: boolean;

	public selectOptionsIdType: { idtype: string, value: string }[ ];

	public surveyFormGroup: FormGroup;
	public identifiersMainInstitution_FA: FormArray;
	private _evaluation: Evaluation;  /* It is like a readonly field, and it is only used to initialize the form. */

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
		private _dialog: MatDialog,
		private _snackBar: MatSnackBar)
	{
		/* The component begins its loading task. */
		this.hasTaskInProgress = true;

		this.isAddingView = false;

		this.selectOptionsIdType = [ ];

		this.surveyFormGroup = undefined;
		this.identifiersMainInstitution_FA = undefined;
		this._evaluation = undefined;

		this._controlToDisplayError = undefined;
		this._validationErrors = undefined;
		this._validationError_required = `Escriba un valor válido.`;
		this._validationError_invalidCharacter = `Cambie o borre los caracteres inválidos.`;
	}

	public ngOnInit(): void
	{
		/* True if the component is used as an adding view; otherwise, false. */
        this.isAddingView = (this._activatedRoute.snapshot.url[(this._activatedRoute.snapshot.url.length - 1)].path == ActionText.add)  /* The string ActionText.add is the value of the last route sub-path that is specified in the `*-routing.module.ts` file. */

		for (const key in IdentifierSchemas)
		{
			this.selectOptionsIdType.push({ 'idtype': IdentifierSchemas[key], 'value': IdentifierSchemas[key] });
		}

		this._activatedRoute.data.subscribe({
			next: (data: { 'evaluation': Hit<Evaluation> }) => {
				/* It is not necessary to realize deep copy because the `_evaluation` field 
				 * is like a readonly field, and it is only used to initialize the form. */
				this._evaluation = data.evaluation.metadata;

				this._initFormData();

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

		console.log('Data got for editing: ', this._evaluation, this.surveyFormGroup);
	}

	/**
	 * Initializes the form data. 
	 */
	private _initFormData(): void
	{
		this.surveyFormGroup = this._formBuilder.group({
			'name': new FormControl(this._evaluation.name, 
				Validators.pattern('^[a-zA-Z\_][a-zA-Z\-\_\ \0-9]*$')
			),

			'mainInst': this._formBuilder.group({
				'name': new FormControl(this._evaluation.mainInst.name, [
					Validators.pattern('^[a-zA-Z\_][a-zA-Z\-\_\0-9]*$')
					//Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i)
				]),

				'identifiers': (this.identifiersMainInstitution_FA = this._addItemsFormArrayIdentifiers(this._evaluation.mainInst.identifiers))
			}),

			'url': new FormControl(this._evaluation.url, [
				Validators.pattern(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/i)
				//Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i)
			]),

			'url_oai': new FormControl(this._evaluation.url_oai, [
				Validators.pattern(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/i)
				//Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i)
			])
		});
	}

	private _addItemsFormArrayIdentifiers(items: any[]): FormArray
	{
		let resFormArray: FormArray = this._formBuilder.array([]);

		for (const item of items)
		{
			resFormArray.push(this._formBuilder.group(
				{
					'idtype': new FormControl(item.idtype),
					'value': new FormControl(item.value, [
						Validators.pattern('^[a-zA-Z\_][a-zA-Z\-\_\0-9]*$')
					])
				})
			);
		}

		return resFormArray
	}

	public addIdentifier(): void
	{
		this.identifiersMainInstitution_FA.push(this._formBuilder.group(
			{
				'idtype': new FormControl(''),
				'value': new FormControl('', [
					Validators.pattern('^[a-zA-Z\_][a-zA-Z\-\_\0-9]*$')
				])
			})
		);
	}

	public deleteIdentifier(pos: number): void
	{
		const dialogRef = this._dialog.open(DialogDeleteConfirmComponent, {
			width: '40%',
			data: { 
				'delTypeArt': 'el',
				'delType': 'identificador',
				'delValue':  ((this.identifiersMainInstitution_FA.value[pos].idtype) ? this.identifiersMainInstitution_FA.value[pos].idtype : 'vacio') 
					+ ': ' 
					+ ((this.identifiersMainInstitution_FA.value[pos].value) ? this.identifiersMainInstitution_FA.value[pos].value : 'vacio')
			}
		});

		dialogRef.afterClosed().subscribe((isDeleted: boolean) => {
			if (isDeleted)
			{
				this.identifiersMainInstitution_FA.removeAt(pos);
			}
		});
	}

	public update(): void
	{
		/* The component begins its updating task. */
		this.hasTaskInProgress = true;

		console.log('update: ', this.surveyFormGroup.valid, this.surveyFormGroup);

		this._surveyService.editEvaluation(this.surveyFormGroup.value).subscribe({
			next: (result: Hit<Evaluation>) => {
				console.log('update result: ', result);
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

				const m = new MessageHandler(null, this._dialog);
				m.showMessage(StatusCode.OK, 
					'¡El Repositorio Institucional fue' + ' ' + ((this.isAddingView) ? 'adicionado' : 'editado') + ' ' + 'correctamente!', 
					HandlerComponent.dialog, 'Operación exitosa', '50%');
			}
		});
	}

    /**
     * Returns true if the control is in an error state; otherwise, false. 
     */
    public getErrorState(controlName: Array<string | number> | string): boolean
    {
		this._controlToDisplayError = this.surveyFormGroup.get(controlName);

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
		this._validationErrors = (this._controlToDisplayError = this.surveyFormGroup.get(controlName)).errors;

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
