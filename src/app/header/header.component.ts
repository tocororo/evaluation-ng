import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {convertLangFromNumberToString, Environment} from 'toco-lib';
import {MA, ME, MHO} from "./constants";

@Component({
  selector: 'toco-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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

  /**
   * Gets a list of input `MenuElement` to build the menu of header
   */
  @Input() public menuElements: MenuElement[];

  public menuHelpOptions: MenuElement[];
  public menuLoginOptions: MenuElement[];
  public menuUserOptions: MenuElement[];
  public menuAppsOptions: MenuElement[];

  @Input() public showMenuLang: boolean;

  public sceibaHost: string;

  public simpleMenu = false;

  constructor(private _env: Environment, private _transServ: TranslateService) { }

  ngOnInit() {
    this.languageTexts = ['Español', 'English'];
    this.languageAbbrs = ['es', 'en'];
    this.currentLang = 0;  /* The default language is Spanish; that is, the zero index. */
    this.showMenuLang == undefined ? this.showMenuLang = false : null;

    this.sceibaHost = this._env.sceibaHost;

    this.menuElements = ME;

    this.menuHelpOptions = MHO;

    this.menuAppsOptions = MA;

    this.menuLoginOptions = [
      {
        nameTranslate : "AUTENTICARSE",
        icon: "lock",
        href: null,
        // click: () => this.login
        click: () => console.log("login===")
      },
      {
        nameTranslate : "REGISTRARSE",
        icon: "assignment_ind",
        href: null,
        // click: () => this.login
        click: () => console.log("login===")
      }
    ];

    this.menuUserOptions = [
      {
        nameTranslate : "PERFIL_USUARIO",
        icon: "account_circle",
        href: `${ this.sceibaHost }account/settings/profile/`,
        useRouterLink : false
      },
      {
        nameTranslate : "CAMBIAR_CONTRASEÑA",
        icon: "vpn_key",
        href: `${ this.sceibaHost }account/settings/password/`,
        useRouterLink : false
      },
      {
        nameTranslate : "SEGURIDAD",
        icon: "security",
        href: `${ this.sceibaHost }account/settings/security/`,
        useRouterLink : false
      },
      {
        nameTranslate : "APLICACIONES",
        icon: "settings_applications",
        href: `${ this.sceibaHost }account/settings/applications/`,
        useRouterLink : false
      },
      {
        nameTranslate : "SALIR",
        icon: "exit_to_app",
        href: null,
        // click: () => this.logoff
        click: () => console.log("logoff===")
      },
      {
        nameTranslate : "YO",
        icon: "exit_to_app",
        href: null,
        // click: () => this.me
        click: () => console.log("me===")
      },
    ];

    this._transServ.setDefaultLang('es');
    this._transServ.use('es');
    this._transServ.addLangs(this.languageAbbrs);
  }

  /*******************************************************************
   * Check if display is less than 600px to update menu classes
   * @returns String
   */
  showHideMenuHeader(): string {
    let menuClass = 'mat-menu-trigger mat-icon-button mat-button-base';
    return window.innerWidth < 600 ? menuClass + ' show-menu' : menuClass + ' hide-menu';
  }
  showHideMenuHeaderElements(): string {
    return (window.innerWidth > 600) ? 'menu-full show-menu-elements' : 'menu-full hide-menu';
  }

  /**
     * Sets the current language.
     * @param index Zero-based index that indicates the current language.
     */
  public setLanguage(index: number): void {
    if (index != this.currentLang) {
      console.log('setLanguage method is called with language: ', index);

      let currentLangAsString: string = convertLangFromNumberToString((this.currentLang = index));

      /* Informs the new current language. */
      this._transServ.use(currentLangAsString);
      // this._recaptchaDynamicLanguageLoaderServ.updateLanguage(currentLangAsString);
    }
  }

}

interface IMG {
  src: string;
  style: string;
}

export interface MenuElement {
  nameTranslate: string;
  href: string;
  target?: string;
  useRouterLink?: boolean;
  icon?: string;
  click?: () => void;
  img?: IMG;
  divider?: boolean;
}
