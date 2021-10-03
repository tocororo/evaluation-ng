
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { ActionText, MetadataService } from "toco-lib";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit
{
    /**
     * Represents the `ActionText` enum for internal use. 
     */
	public readonly actionText: typeof ActionText;

	public constructor(private _activatedRoute: ActivatedRoute,
		public transServ: TranslateService,
		private _metadata: MetadataService)
	{
		this.actionText = ActionText;
	}

	public ngOnInit(): void
	{
		this._activatedRoute.url.subscribe(() => {
			this._metadata.meta.updateTag({ name: "DC.title", content: "Autoevaluación de Revistas Científicas Universitarias" });
			this._metadata.meta.updateTag({ name: "DC.description", content: "Control de calidad y monitoreo de las publicaciones científicas a nivel nacional e institucional con el objetivo de aumentar la visibilidad de las publicaciones científicas de los sistemas de educación superior cubano y peruano" });
		});
	}
}
