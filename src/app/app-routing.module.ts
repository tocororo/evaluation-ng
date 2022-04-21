
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundEvaluationComponent } from './page-not-found-evaluation/page-not-found-evaluation.component';

const routes: Routes = [
	{
		path: 'survey',
		loadChildren: () => import('./survey/survey.module').then(mod => mod.SurveyModule)
	},
	{
		path: 'help',
		loadChildren: () => import('./help/help.module').then(mod => mod.HelpModule)
	},
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: '**',
		component: PageNotFoundEvaluationComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule
{ }
