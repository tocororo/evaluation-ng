
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { CoreModule, TocoFormsModule } from 'toco-lib';

import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { SurveyJournalDataComponent } from './survey-journal-data/survey-journal-data.component';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { SurveyResultAndRecomsComponent } from './survey-result-and-recoms/survey-result-and-recoms.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyViewComponent } from './survey-view/survey-view.component';
import { SurveyComponent } from './survey/survey.component';
import { StaticViewerCardComponent } from './viewer-card/static-viewer-card/static-viewer-card.component';
import { ViewerCardComponent } from './viewer-card/viewer-card/viewer-card.component';

@NgModule({
	declarations: [
		SurveyComponent,
		SurveyViewComponent,
        SurveyQuestionsComponent,
		SurveyResultAndRecomsComponent,
		SurveyJournalDataComponent,
		StaticViewerCardComponent,
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
		MatDividerModule,
    MatListModule,
		CoreModule,
		TocoFormsModule,
		SurveyRoutingModule
	]
})
export class SurveyModule
{ }
