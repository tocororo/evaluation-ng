import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'toco-lib';

import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Observable, Subscription } from 'rxjs';
import {
	OauthAuthenticationService, OauthInfo, Response, User
} from 'toco-lib';



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	public footerSites: Array<{ name: string, url: string, useRouterLink: boolean }>;

	public footerInformation: Array<{ name: string, url: string, useRouterLink: boolean }>;

	public user: User;

	public sceibaHost: string;

	public oauthInfo: OauthInfo;

	private authenticateSuscription: Subscription = null;


	public constructor(private _env: Environment,
		private _router: Router,
		private oauthService: OAuthService,
		protected http: HttpClient,
		private oauthStorage: OAuthStorage,
		private authenticateService: OauthAuthenticationService,
		//private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
    /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/) {
		let env: any = this._env;
		this.oauthInfo = env.oauthInfo;
		// this._matomoInjector.init('https://crai-stats.upr.edu.cu/', 6);
	}


	public ngOnInit(): void {
		//this._recaptchaDynamicLanguageLoaderServ.updateLanguage('es');

		this.sceibaHost = this._env.sceibaHost;

		this.footerSites = Array();
		this.footerInformation = Array();

		let request = JSON.parse(this.oauthStorage.getItem("user"));
		if (request) {
			this.user = request;
		}
		this.authenticateSuscription =
			this.authenticateService.authenticationSubjectObservable.subscribe(
				(request) => {
					if (request != null) {
						this.user = request;
						// if (this.oauthStorage.getItem('access_token')) {
						//   this.user = this.oauthStorage.getItem('email');
						// }
					} else {
						this.logoff();
					}
				},
				(error: any) => {
					this.user = null;
				},
				() => { }
			);

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

	ngOnDestroy(): void {
		if (this.authenticateSuscription) {
			this.authenticateSuscription.unsubscribe();
		}
	}


	public get isHome() {
		return this._router.url == '/';
	}

	public login() {
		console.log('hi');

		this.oauthService.initImplicitFlow();
	}

	public logoff() {
		this.oauthService.logOut();
		this.oauthStorage.removeItem("user");
		this.user = undefined;
	}

	public get name() {
		let user = JSON.parse(this.oauthStorage.getItem("user"));
		if (!user) return null;
		return user['email'];
	}

	getUserInfo(): Observable<Response<any>> {
		// let token = this.oauthStorage.getItem('access_token');
		// let headers = new HttpHeaders()
		// headers.set('Authorization', 'Bearer ' + token);
		// headers = headers.set('Content-Type', 'application/json');
		// headers = headers.set('Access-Control-Allow-Origin', '*');
		// const options = {
		//   headers: headers
		// };
		return this.http.get<Response<any>>(this._env.sceibaApi + 'me');
	}

	public me() {
		this.getUserInfo().subscribe({
			next: (response) => {
				console.log(response)
			},

			error: (e) => { },

			complete: () => { },
		});
	}
}
