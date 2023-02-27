import { Component, OnInit } from "@angular/core";

import { MyEvaluationService } from "../my-evaluationService.service";
import { Evaluations } from "../survey/evaluation.entity";

import { ActionText } from "toco-lib";

@Component({
  selector: "app-my-evaluation",
  templateUrl: "./my-evaluation.component.html",
  styleUrls: ["./my-evaluation.component.scss"],
})
export class MyEvaluationComponent implements OnInit {
  evaluations!: Evaluations[];

  displayedColumns: string[] = ["name", "date", "state", "view", "clone"];
  // List evaluations
  dataSource: any;

  constructor(private MyEvaluationService: MyEvaluationService) {}

  ngOnInit() {
    this.getEvaluations();
  }

  public changeDate(date: Date) {
    let objectDate = new Date(date);

    let day = objectDate.getDate();
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();

    let dateformat = day + "/" + month + "/" + year;

    return dateformat;
  }

  private getEvaluations() {
    this.MyEvaluationService.findAllEvaluations().subscribe(
      (evaluationData: any) => {
        this.evaluations = evaluationData.data.evaluations.data.map((item) => ({
          ...item,
          datetime: this.changeDate(item.datetime),
        }));
      }
    );
  }

  private getEvaluationsById(uuid: number) {
    this.MyEvaluationService.getEvaluationsById(uuid).subscribe(
      (evaluationData: any) => {
        this.evaluations = evaluationData.data;
      }
    );
  }
}
