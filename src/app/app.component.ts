
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Environment } from 'toco-lib';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent
{

	public footerSites: Array<{ name: string, url: string, useRouterLink: boolean }>;

	public footerInformation: Array<{ name: string, url: string, useRouterLink: boolean }>;

	public sceibaHost: string;

	public constructor(private _env: Environment,
		private _router: Router,
    //private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
    /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/)
	{
		// this._matomoInjector.init('https://crai-stats.upr.edu.cu/', 6);
	}

	public ngOnInit(): void
	{
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


	public get isHome()
	{
		return this._router.url == '/';
	}
}
