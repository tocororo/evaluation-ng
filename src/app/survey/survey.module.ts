
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

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
import { MatTableModule } from '@angular/material/table';

import { CoreModule, TocoFormsModule, StaticsModule } from 'toco-lib';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { SurveyViewComponent } from './survey-view/survey-view.component';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { SurveyResultAndRecommendationsComponent } from './survey-result-and-recommendations/survey-result-and-recommendations.component';
import { SurveyJournalDataComponent } from './survey-journal-data/survey-journal-data.component';
import { ViewerCardComponent } from './viewer-card/viewer-card.component';

@NgModule({
	declarations: [
		SurveyComponent,
		SurveyViewComponent,
        SurveyQuestionsComponent,
		SurveyResultAndRecommendationsComponent,
		SurveyJournalDataComponent,
		ViewerCardComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
    	ReactiveFormsModule,
		FlexLayoutModule,
		TranslateModule,

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
		MatTableModule,

		CoreModule,
		TocoFormsModule,
		StaticsModule,
		SurveyRoutingModule
	]
})
export class SurveyModule
{ }
