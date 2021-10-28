
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';

import { CoreModule, TocoFormsModule, StaticsModule } from 'toco-lib';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { SurveyViewComponent } from './survey-view/survey-view.component';
import { SurveyEditComponent } from './survey-edit/survey-edit.component';
import { SurveyResultComponent } from './survey-result/survey-result.component';
import { SurveyRecommendationComponent } from './survey-recommendation/survey-recommendation.component';
import { ViewerCardComponent } from './viewer-card/viewer-card.component';

@NgModule({
	declarations: [
		SurveyComponent,
		SurveyViewComponent,
        SurveyEditComponent,
		SurveyResultComponent,
		SurveyRecommendationComponent,
		ViewerCardComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
    	ReactiveFormsModule,
		FlexLayoutModule,
		TranslateModule,

		MatTabsModule,
        MatTooltipModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
		MatExpansionModule,
		MatMenuModule,
		MatStepperModule,

		CoreModule,
		TocoFormsModule,
		StaticsModule,
		SurveyRoutingModule
	]
})
export class SurveyModule
{ }
