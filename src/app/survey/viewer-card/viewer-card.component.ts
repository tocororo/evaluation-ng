
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectContent, InputBoolComponent, InputNumberComponent, InputSelectComponent, 
	TextInputAppearance, ValidatorArguments } from 'toco-lib';

import { CategoryQuestionType, SurveySection, CategoryQuestion } from '../evaluation.entity';

@Component({
	selector: 'app-viewer-card',
	templateUrl: './viewer-card.component.html',
	styleUrls: ['./viewer-card.component.scss']
})
export class ViewerCardComponent implements OnInit
{
    /**
     * Represents the `CategoryQuestionType` enum for internal use. 
     */
	public readonly categoryQuestionType: typeof CategoryQuestionType;

	/**
	 * Returns the `FormGroup` parent. 
	 */
	@Input()
	public parentFormGroup: FormGroup;
	/**
	 * Returns the `SurveySection`. 
	 * It is used to create controls. 
	 */
	@Input()
	public surveySection: SurveySection;

	public constructor()
	{
		this.categoryQuestionType = CategoryQuestionType;

		this.parentFormGroup = undefined;
		this.surveySection = undefined;
	}

	public ngOnInit(): void
	{
		this._initFormData();

		console.log('Data got for ViewerCardComponent: ', this.parentFormGroup);
	}

	/**
	 * Initializes the form data. 
	 */
	private _initFormData(): void
	{
		/* Creates controls content. */

		let question: CategoryQuestion;
		let validatorArguments: ValidatorArguments;

		for (let category of this.surveySection.categories)
		{
			for (question of category.questions)
			{
				switch (question.type)
				{
					case CategoryQuestionType.bool:
						{
							question._inputContent = {
								'formControl': InputBoolComponent.getFormControlByDefault(),
								'name': question.id,
								'label': question.desc,
								'controlType': InputBoolComponent,
								'value': question.answer,
								'required': true,
								'width': '100%',
								'appearance': TextInputAppearance.outline,
								'ariaLabel': question.desc,
							};
							break;
						}

					case CategoryQuestionType.integer:
						{
							validatorArguments = { };
							if (question.min != undefined) validatorArguments.min = question.min;
							if (question.max != undefined) validatorArguments.max = question.max;

							question._inputContent = {
								'formControl': InputNumberComponent.getFormControlByDefault(validatorArguments),
								'name': question.id,
								'label': question.desc,
								'controlType': InputNumberComponent,
								'value': question.answer,
								'required': true,
								'width': '100%',
								'appearance': TextInputAppearance.outline,
								'ariaLabel': question.desc,
							};
							break;
						}

					case CategoryQuestionType.select:
						{
							question._inputContent = {
								'formControl': InputSelectComponent.getFormControlByDefault(),
								'name': question.id,
								'label': question.desc,
								'controlType': InputSelectComponent,
								'value': question.answer,
								'required': true,
								'width': '100%',
								'appearance': TextInputAppearance.outline,
								'ariaLabel': question.desc,
								'selectOptions': question.selectOptions,
								'multiple': false
							} as SelectContent;
							break;
						}

					default:
						{
							console.error('There is a configuration error with the category question type because the programme does not know what to do with it!');
							break;
						}
				}

				/* Adds control to `parentFormGroup`. */
				this.parentFormGroup.addControl(question._inputContent.name, question._inputContent.formControl);
			}
		}
	}
}
