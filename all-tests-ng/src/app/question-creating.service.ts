import { Injectable } from '@angular/core';
import {QuestionData} from "./DataModels/QuestionData";

@Injectable({
  providedIn: 'root'
})
export class QuestionCreatingService {

  constructor() { }

  questionData: QuestionData;

}
