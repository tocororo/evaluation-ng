import { Component, OnInit } from '@angular/core';
import { MyEvaluation } from '../survey/evaluation.entity';

let objectDate = new Date();

let day = objectDate.getDate();
let month = objectDate.getMonth();
let year = objectDate.getFullYear();

let dateformat = day + "/" + month + "/" + year;


const ELEMENT_DATA: MyEvaluation[] = [{date: dateformat, name: 'David', status: true},
                                      {date: dateformat, name: 'Mario', status: false},
                                      {date: dateformat, name: 'Maria', status: true}];

@Component({
  selector: 'app-my-evaluation',
  templateUrl: './my-evaluation.component.html',
  styleUrls: ['./my-evaluation.component.scss']
})


export class MyEvaluationComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'status', 'view'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

  
}
