
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Environment } from 'toco-lib';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	/**
	  * Returns the available language texts. 
	  */
	public languageTexts: string[];
	/**
	 * Returns the available language abbreviations. 
	 */
	public languageAbbrs: string[];
	/**
	 * Returns the language selected. 
	 * The default language is Spanish; that is, the zero index. 
	 */
	public languageSelected: number;

	public footerSites: Array<{ name: string, url: string, useRouterLink: boolean }>;

	public footerInformation: Array<{ name: string, url: string, useRouterLink: boolean }>;

	public sceibaHost: string;

	public constructor(private _env: Environment,
		// private _matomoInjector: MatomoInjector,
		private _router: Router,
		private _transServ: TranslateService,
    //private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
    /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/)
	{
		// this._matomoInjector.init('https://crai-stats.upr.edu.cu/', 6);
	}

	public ngOnInit(): void
	{
		this.languageTexts = ['Español', 'English'];
		this.languageAbbrs = ['es', 'en'];
		this.languageSelected = 0;  /* The default language is Spanish; that is, the zero index. */
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
		switch ((this.languageSelected = index))
		{
			case 0:  /* Spanish */
				{
					this._transServ.use('es');
					//this._recaptchaDynamicLanguageLoaderServ.updateLanguage('es');
					return;
				}

			case 1:  /* English */
				{
					this._transServ.use('en');
					//this._recaptchaDynamicLanguageLoaderServ.updateLanguage('en');
					return;
				}
		}
	}

	public get isHome()
	{
		return this._router.url == '/';
	}
}
