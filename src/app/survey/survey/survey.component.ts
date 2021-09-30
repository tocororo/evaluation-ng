
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-survey',
	templateUrl: './survey.component.html',
	styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit
{
	/**
	 * Returns the selected tab position. Its value is set internally. 
	 */
	private _selectedTabPos: number;

	public constructor()
	{
		this._selectedTabPos = 0;
	}

	public ngOnInit(): void
	{ }

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
