
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionText } from 'toco-lib';

import { SurveyComponent } from './survey/survey.component';
import { SurveyViewComponent } from './survey-view/survey-view.component';
import { SurveyEditComponent } from './survey-edit/survey-edit.component';
import { SurveyResolverService } from './survey-resolver.service';

const surveyRoutes: Routes = [
	{
		path: '',
		component: SurveyComponent,
		children: [
            {
                path: ':uuid/' + ActionText.view,
                component: SurveyViewComponent,
                resolve: {
                    /**
                     * This resolver is used on all views. In the case of viewing view, 
                     * it needs to resolve an object from the backend. 
                     */
                    'evaluation': SurveyResolverService
                }
            },
            {
                path: ActionText.add,
                component: SurveyEditComponent,
                resolve: {
                    /**
                     * This resolver is used on all views. In the case of adding view, 
                     * it needs to resolve an object with all its values set to empty. 
                     */
                    'evaluation': SurveyResolverService
                }
            },
            {
                path: ':uuid/' + ActionText.edit,
                component: SurveyEditComponent,
                resolve: {
                    /**
                     * This resolver is used on all views. In the case of editing view, 
                     * it needs to resolve an object from the backend. 
                     */
                    'evaluation': SurveyResolverService
                }
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
