
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: 'survey',
		loadChildren: () => import('./survey/survey.module').then(mod => mod.SurveyModule)
	},
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule
{ }
