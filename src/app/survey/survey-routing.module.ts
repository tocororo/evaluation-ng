
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyComponent } from './survey/survey.component';

const surveyRoutes: Routes = [
	{
		path: '',
		component: SurveyComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(surveyRoutes)],

	exports: [RouterModule]
})
export class SurveyRoutingModule
{ }
