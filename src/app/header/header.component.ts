import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { convertLangFromNumberToString } from 'toco-lib';

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
  @Input()
  public menuElements: MenuElement[];

  @Input()
  public showMenuLang: boolean;

  constructor(private _transServ: TranslateService) { }

  ngOnInit() {
    this.languageTexts = ['Español', 'English'];
    this.languageAbbrs = ['es', 'en'];
    this.currentLang = 0;  /* The default language is Spanish; that is, the zero index. */
    this.showMenuLang == undefined ? this.showMenuLang = false : null;

    this.menuElements = [
      {
        nameTranslate : "INICIO",
        href : "/",
        target :"_blank",
        useRouterLink : true
      },
      {
        nameTranslate : "ORGANIZACIONES",
        href : "https://organizaciones.sceiba.cu",
        target :"_blank",
        useRouterLink : false
      },
      {
        nameTranslate : "PERSONAS",
        href : "https://personas.sceiba.cu",
        target :"_blank",
        useRouterLink : false
      },
      {
        nameTranslate : "CATALOGO",
        href : "https://catalogo.sceiba.cu",
        target :"_blank",
        useRouterLink : false
      },
      {
        nameTranslate : "REVISTAS_MES",
        href : "https://revistasmes.sceiba.cu",
        target :"_blank",
        useRouterLink : false
      },
      {
        nameTranslate : "EVALUACION",
        href : "https://evaluaciones.sceiba.cu",
        target :"_blank",
        useRouterLink : false
      },
      {
        nameTranslate : "VOCABULARIO",
        href : "https://vocabularios.sceiba.cu/es",
        target :"_blank",
        useRouterLink : false
      }
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

export interface MenuElement{
  nameTranslate: string;
  href: string;
  target: string;
  useRouterLink: boolean;
}