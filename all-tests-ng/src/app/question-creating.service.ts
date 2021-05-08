import { Injectable } from '@angular/core';
import {QuestionData} from "./QuestionData";

@Injectable({
  providedIn: 'root'
})
export class QuestionCreatingService {

  constructor() { }

  questionData: QuestionData;

}
