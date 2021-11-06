
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { convertLangFromNumberToString, Environment, Hit, MessageHandler, StatusCode } from 'toco-lib';

import { CategoryQuestion, CategoryQuestionType, Evaluation, SectionCategory, SurveySection } from './survey/evaluation.entity';
import { SurveyService } from './survey/survey.service';
import { SurveyValueService } from './survey/survey-resolver.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent
{
	/**
	  * Returns the available language texts. 
	  */
	public languageTexts: string[];
	/**
	 * Returns the available language abbreviations. 
	 */
	public languageAbbrs: string[];
	/**
	 * Returns the language currently used as number. 
	 * The Spanish language is: 0. It is the default. 
	 * The English language is: 1. 
	 */
	public currentLang: number;

	public footerSites: Array<{ name: string, url: string, useRouterLink: boolean }>;

	public footerInformation: Array<{ name: string, url: string, useRouterLink: boolean }>;

	public sceibaHost: string;

	public constructor(private _env: Environment,
		// private _matomoInjector: MatomoInjector,
		private _router: Router,
		private _transServ: TranslateService,
		private _surveyService: SurveyService,
		private _surveyValueService: SurveyValueService,
		private _snackBar: MatSnackBar,
    //private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
    /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/)
	{
		// this._matomoInjector.init('https://crai-stats.upr.edu.cu/', 6);
	}

	public ngOnInit(): void
	{
		this.languageTexts = ['Español', 'English'];
		this.languageAbbrs = ['es', 'en'];
		this.currentLang = 0;  /* The default language is Spanish; that is, the zero index. */
		this._transServ.setDefaultLang('es');
		this._transServ.use('es');
		this._transServ.addLangs(this.languageAbbrs);
		//this._recaptchaDynamicLanguageLoaderServ.updateLanguage('es');

		this.sceibaHost = this._env.sceibaHost;

		this.footerSites = Array();
		this.footerInformation = Array();

		// this.footerSites.push({ name: "MES", url: "https://www.mes.gob.cu", useRouterLink: false});
		// this.footerSites.push({ name: "ONEI", url: "http://www.onei.gob.cu/", useRouterLink:false});
		// this.footerSites.push({ name: "GRID", url: "https://www.grid.ac", useRouterLink: false});
		// this.footerSites.push({ name: "ROR", url: "https://ror.org/", useRouterLink: false});
		// this.footerSites.push({ name: "Wikidata", url: "https://www.wikidata.org/wiki/Wikidata:Main_Page", useRouterLink: false});

		this.footerInformation.push({ name: "ACERCA_DE", url: "/help/about", useRouterLink: true });
		this.footerInformation.push({ name: "PRIVACIDAD", url: "/help/policy", useRouterLink: true });
		// this.footerInformation.push({ name: "PRIVACIDAD", url: "https://sceiba-lab.upr.edu.cu/page/politicas", useRouterLink: false});
		this.footerInformation.push({ name: "CONTACTOS", url: "/help/contact", useRouterLink: true });
	}

	/**
	 * Sets the current language. 
	 * @param index Zero-based index that indicates the current language. 
	 */
	public setLanguage(index: number): void
	{
		if (index != this.currentLang)
		{
			console.log('setLanguage method is called with language: ', index);

			let currentLangAsString: string = convertLangFromNumberToString((this.currentLang = index));

			/* This must be done first before informing the new current language. */
			this._surveyService.getEvaluationById(((this._surveyValueService._evaluation) ? (this._surveyValueService._evaluation.id) : undefined), currentLangAsString).subscribe({
				next: (data: Hit<Evaluation>) => {

					let i: number, j: number, k: number, l: number;

					let old_sections: Array<SurveySection> = this._surveyValueService._evaluation.sections;
					let new_sections: Array<SurveySection> = data.metadata.sections;

					let old_categories: Array<SectionCategory>;
					let new_categories: Array<SectionCategory>;

					let old_questions: Array<CategoryQuestion>;
					let new_questions: Array<CategoryQuestion>;

					for (i = 0; i < old_sections.length; ++i)
					{
						old_sections[i].title = new_sections[i].title;

						old_categories = old_sections[i].categories;
						new_categories = new_sections[i].categories;

						for (j = 0; j < old_categories.length; ++j)
						{
							old_categories[j].title = new_categories[j].title;
							old_categories[j].desc = new_categories[j].desc;

							old_questions = old_categories[j].questions;
							new_questions = new_categories[j].questions;

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
				},
				error: (err: any) => {
					const m = new MessageHandler(this._snackBar);
					m.showMessage(StatusCode.OK, err.message)
				}
			});
			console.log('New data got by AppComponent because the language changed: ', this._surveyValueService._evaluation);

			/* Informs the new current language. */
			this._transServ.use(currentLangAsString);
			// this._recaptchaDynamicLanguageLoaderServ.updateLanguage(currentLangAsString);
		}
	}

	public get isHome()
	{
		return this._router.url == '/';
	}
}
