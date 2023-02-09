import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluations } from './survey/evaluation.entity';
import {Environment} from 'toco-lib'

@Injectable({
  providedIn: 'root'
})
export class MyEvaluationService {

  private _revitaURL: string = "evaluation/list"

  constructor( private httpClient: HttpClient, private env: Environment) { }

  findAllEvaluations(): Observable<Evaluations[]>{
    return this.httpClient.get<Evaluations[]>(`${this.env.sceibaApi}${this._revitaURL}`);
  }

  getEvaluationsById(uuid: number): Observable<Evaluations[]>{
    return this.httpClient.get<Evaluations[]>(`${this.env.sceibaApi}${'evaluation'}/${uuid}`);
  
  }
}
