
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MatTabsModule } from '@angular/material/tabs';

import { TocoFormsModule } from 'toco-lib';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';

@NgModule({
	declarations: [
		SurveyComponent
	],
	imports: [
    	ReactiveFormsModule,
		TranslateModule,

		MatTabsModule,

		TocoFormsModule,
		SurveyRoutingModule
	]
})
export class SurveyModule
{ }
