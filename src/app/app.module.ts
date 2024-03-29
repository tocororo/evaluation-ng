import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { OAuthModule, OAuthStorage } from "angular-oauth2-oidc";
import { RecaptchaModule } from "ng-recaptcha";
import { MarkdownModule } from "ngx-markdown";
import { allowedURLS, environment } from "src/environments/environment";

import {
  AuthenticationModule,
  CoreModule,
  Environment,
  HTTP_INTERCEPTOR_PROVIDERS,
  StaticsModule,
  TocoFormsModule,
} from "toco-lib";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { MenuItemComponent } from "./header/menu-item/menu-item.component";
import { MenuComponent } from "./header/menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { SceibaMenuAppsComponent } from "./menu-apps/menu-apps.component";
import { PageNotFoundEvaluationComponent } from "./page-not-found-evaluation/page-not-found-evaluation.component";
// import {
// 	AngularMaterialModule,OrganizationServiceNoAuth, SearchModule,
// 	SearchService, SourceServiceNoAuth, StaticsModule, TocoFormsModule
//   } from 'toco-lib';
import { CategoryTableComponent } from "./evaluation-view/category-table/category-table.component";
import { EvaluationViewComponent } from "./evaluation-view/evaluation-view.component";
import { MyEvaluationComponent } from "./my-evaluation/my-evaluation.component";
import { SharedModule } from "./shared/shared.module";
export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundEvaluationComponent,
    FooterComponent,
    HeaderComponent,
    ContactComponent,
    MenuComponent,
    MenuItemComponent,
    MyEvaluationComponent,
    SceibaMenuAppsComponent,
    EvaluationViewComponent,
    CategoryTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    FlexLayoutModule,
    RecaptchaModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),

    SharedModule,
    CoreModule,
    StaticsModule,
    TocoFormsModule,
    AuthenticationModule,

    AppRoutingModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: allowedURLS,
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS,
    { provide: Environment, useValue: environment },
    { provide: OAuthStorage, useFactory: storageFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
