
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatHorizontalStepper, MatSnackBar } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { ActionText, Hit, MessageHandler, StatusCode, HandlerComponent } from 'toco-lib';

import { CategoryQuestion, CategoryQuestionType, CategoryRecom, Evaluation, EvaluationAnswer, ResultAndRecoms, SectionCategory, SurveySection } from '../evaluation.entity';

import { SurveyService } from '../survey.service';
import { SurveyQuestionsComponent } from '../survey-questions/survey-questions.component';

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
	public _evaluation: Evaluation;

	public constructor(private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _transServ: TranslateService,
		private _surveyService: SurveyService,
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
		/* The string `ActionText.add` is the value of the last route sub-path that is specified in the `*-routing.module.ts` file. */
		this._actionText = this._activatedRoute.snapshot.children[0].url[(this._activatedRoute.snapshot.children[0].url.length - 1)].path as ActionText;

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
					throw new Error(`For the '${ SurveyComponent.name }' control, the URL written has an error because the programme does not know what to do with it!`);
				}
		}

		this._activatedRoute.data.subscribe({
			next: (data: { 'evaluation': Hit<Evaluation> }) => {
				/* It is necessary to work with a copy because the `_evaluation` field has some internal fields 
				 * that will be changed when the application language will be changed. 
				 * The previous scene is the only case that will change the `_evaluation` field; so in the rest of the case, 
				 * it is like a readonly field, and it is only used to initialize the form. For that reason, 
				 * its name begins with an underscore to remember you that you can change its value ONLY 
				 * when the application language will be changed. */
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

		/* Changes the translation when the language changes. */
		this._transServ.onLangChange.subscribe((params: LangChangeEvent) => {
			this._setNewLanguage();
		});

		console.log('Data got for SurveyComponent: ', this._evaluation, this.evaluationFormGroup);
	}

	/**
	 * Initializes the form data. 
	 */

    public addSurvey(){
		this._surveyService.addSurvey().subscribe()
	}

	private _initFormData(): void
	{
		this.evaluationFormGroup = this._formBuilder.group({
			'journalData': this.evalJournalDataFormGroup = this._formBuilder.group({ }),

			'survey': this.evalSurveyFormGroup = this._formBuilder.group({ })
		});
		console.log('Estoy en el initFromData')
	}

	/**
	 * Sets the new language. 
	 */
	private _setNewLanguage(): void
	{
		this._surveyService.getEvaluationById(
			((this._evaluation) ? (this._evaluation.id) : undefined),
			((this._evaluation) ? (this._evaluation.resultAndRecoms != undefined) : false),
			this._transServ.currentLang
		).subscribe({
			next: (data: Hit<Evaluation>) => {

				let i: number, j: number, k: number, l: number;

				let old_sections: Array<SurveySection>;
				let new_sections: Array<SurveySection>;

				let old_categories: Array<SectionCategory>;
				let new_categories: Array<SectionCategory>;

				let old_questions: Array<CategoryQuestion>;
				let new_questions: Array<CategoryQuestion>;

				/* Gets translations for sections. */

				old_sections = this._evaluation.sections;
				new_sections = data.metadata.sections;

				for (i = 0; i < old_sections.length; ++i)
				{
					old_sections[i].title = new_sections[i].title;

					old_categories = old_sections[i].categories;
					new_categories = new_sections[i].categories;

					for (j = 0; j < old_categories.length; ++j)
					{
						old_categories[j].title = new_categories[j].title;

						old_questions = old_categories[j].questionsOrRecoms as Array<CategoryQuestion>;
						new_questions = new_categories[j].questionsOrRecoms as Array<CategoryQuestion>;

						for (k = 0; k < old_questions.length; ++k)
						{
							old_questions[k].desc = new_questions[k].desc;
							old_questions[k].hint = new_questions[k].hint;

							if (old_questions[k].type == CategoryQuestionType.select)
							{
								for (l = 0; l < old_questions[k].selectOptions.length; ++l)
								{
									old_questions[k].selectOptions[l].label = new_questions[k].selectOptions[l].label;
								}
							}
						}
					}
				}

				console.log('this._evaluation.resultAndRecoms: ', this._evaluation.resultAndRecoms);

				/* Gets translations for result and recommendations. */

				if (this._evaluation.resultAndRecoms != undefined)  /* Very important to do this verification. */
				{
					let old_resultAndRecoms: ResultAndRecoms = this._evaluation.resultAndRecoms;
					let new_resultAndRecoms: ResultAndRecoms = data.metadata.resultAndRecoms;

					let old_recoms: Array<CategoryRecom>;
					let new_recoms: Array<CategoryRecom>;

					old_resultAndRecoms.generalEvaluationName = new_resultAndRecoms.generalEvaluationName;
					old_resultAndRecoms.generalEvaluationValue = new_resultAndRecoms.generalEvaluationValue;

					old_sections = old_resultAndRecoms.sections;
					new_sections = new_resultAndRecoms.sections;

					for (i = 0; i < old_sections.length; ++i)
					{
						old_sections[i].title = new_sections[i].title;
						old_sections[i].titleEvaluationValue = new_sections[i].titleEvaluationValue;

						old_categories = old_sections[i].categories;
						new_categories = new_sections[i].categories;

						for (j = 0; j < old_categories.length; ++j)
						{
							old_categories[j].title = new_categories[j].title;
							old_categories[j].titleEvaluationValue = new_categories[j].titleEvaluationValue;

							old_recoms = old_categories[j].questionsOrRecoms as Array<CategoryRecom>;
							new_recoms = new_categories[j].questionsOrRecoms as Array<CategoryRecom>;

							for (k = 0; k < old_recoms.length; ++k)
							{
								old_recoms[k].value = new_recoms[k].value;
							}
						}
					}
				}
			},
			error: (err: any) => {
				const m = new MessageHandler(this._snackBar);
				m.showMessage(StatusCode.OK, err.message)
			}
		});
		console.log('New data got by SurveyComponent because the language changed: ', this._evaluation);
	}

	public onChildLoaded(component: SurveyQuestionsComponent): void
	{
		if (this._actionText != undefined)
		{
			component._actionText = this._actionText;
			component._survey = this._evaluation.sections;
			component.surveyFormGroup = this.evalSurveyFormGroup;
		}
	}

	public onSelectedStepHasChanged(event: StepperSelectionEvent): void
	{
		if (event.selectedIndex == 2)  /* = 2 means the step of result and recommendations. */
		{
			if (this._actionText == ActionText.add || this._actionText == `${ActionText.add}/77h`)  /* For viewing component, it does NOT need to do this. */
			{
				/* The component begins its updating task. */
				this.hasTaskInProgress = true;
	
				console.log('Do Evaluation: ', this.evaluationFormGroup.valid, this.evaluationFormGroup);
	
				this._surveyService.doEvaluation(this.evaluationFormGroup.value, this._transServ.currentLang).subscribe({
					next: (result: Hit<EvaluationAnswer>) => {
						console.log('Do Evaluation result: ', result);
	
						/* Copies the result to show in the third part "Result and Recommendations". */
						this._evaluation.resultAndRecoms = result.metadata.resultAndRecoms;
	
						/* The component ends its loading task. It is set here and not in the `complete` property because the `complete` notification is not sent. */
						this.hasTaskInProgress = false;
					},
					error: (err: any) => {
						/* The component ends its updating task. */
						this.hasTaskInProgress = false;
	
						const m = new MessageHandler(this._snackBar);
						m.showMessage(StatusCode.OK, err.message)
					}
				});
			}
		}
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

	public goToResultAndRecoms(): void
	{
		/* Selects and focuses the next step in list. */
		this._matHorizontalStepper.next();
	}

	public save(): void
	{
		/* The component begins its updating task. */
		this.hasTaskInProgress = true;

		console.log('Save Evaluation: ', this.evaluationFormGroup.valid, this.evaluationFormGroup);

		this._surveyService.editEvaluation(this.evaluationFormGroup.value).subscribe({
			next: (result: Hit<EvaluationAnswer>) => {
				console.log('Save Evaluation result: ', result);
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
