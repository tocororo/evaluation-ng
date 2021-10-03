
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActionText } from 'toco-lib';

@Component({
	selector: 'app-survey',
	templateUrl: './survey.component.html',
	styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit
{
	/**
	 * Returns the action through a text. 
	 */
	 public actionText: ActionText;

	/**
	 * Returns the title. 
	 */
	 public title: string;

	/**
	 * Returns the selected tab position. Its value is set internally. 
	 */
	private _selectedTabPos: number;

	public constructor(private _activatedRoute: ActivatedRoute)
	{
		this.actionText = undefined;
		this.title = '';
		this._selectedTabPos = 0;
	}

	public ngOnInit(): void
	{
		/* The string ActionText.add is the value of the last route sub-path that is specified in the `*-routing.module.ts` file. */
		this.actionText = this._activatedRoute.snapshot.children[0].url[(this._activatedRoute.snapshot.children[0].url.length - 1)].path as ActionText;

		switch (this.actionText)
		{
			case ActionText.view:
				{
					this.title = 'TITULO_VISTA_DETALLES';
					break;
				}

			case ActionText.add:
				{
					this.title = 'TITULO_VISTA_ADICIONAR';
					break;
				}

			case ActionText.edit:
				{
					this.title = 'TITULO_VISTA_EDITAR';
					break;
				}

			default:
				{
					console.error('There is a configuration error with the URL because the programme does not know what to do with it!');
					break;
				}
		}
	}

	public onSelectTab(newPos: number): void
	{
		// console.log('onSelectTab pos: ', newPos);

		switch ((this._selectedTabPos = newPos))
		{
			case 0:  /* Survey */
				{
					break;
				}

			case 1:  /* Result */
				{
					break;
				}

			default:  /* Recommendation */
				{
					break;
				}
		}
	}
}
