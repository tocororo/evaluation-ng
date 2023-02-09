
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionText } from 'toco-lib';

import { SurveyComponent } from './survey/survey.component';
import { SurveyViewComponent } from './survey-view/survey-view.component';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { SurveyResolverService } from './survey-resolver.service';

const surveyRoutes: Routes = [
	{
		path: '',
		component: SurveyComponent,
        resolve: {
            /**
             * This resolver is used on all views. 
             * In the case of viewing view, it needs to resolve an object from the backend. 
             * In the case of adding view, it needs to resolve an object with all its values set to empty. 
             * In the case of editing view, it needs to resolve an object from the backend. 
             */
            'evaluation': SurveyResolverService
        },
		children: [
            {
                path: ':uuid/' + ActionText.view,
                component: SurveyViewComponent
            },
            {
                path: ActionText.add,
                component: SurveyQuestionsComponent
                
            },
            {
                path: ':uuid/' + ActionText.add,
                component: SurveyQuestionsComponent
                
            },
            {
                path: '',
                redirectTo: '/survey/' + ActionText.add,
                pathMatch: 'full'
            }
        ]
	}
];

@NgModule({
	imports: [RouterModule.forChild(surveyRoutes)],

	exports: [RouterModule]
})
export class SurveyRoutingModule
{ }
