import { Component, OnInit } from '@angular/core';
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

  constructor(private _transServ: TranslateService) { }

  ngOnInit() {
    this.languageTexts = ['Español', 'English'];
    this.languageAbbrs = ['es', 'en'];
    this.currentLang = 0;  /* The default language is Spanish; that is, the zero index. */
    this._transServ.setDefaultLang('es');
    this._transServ.use('es');
    this._transServ.addLangs(this.languageAbbrs);

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
