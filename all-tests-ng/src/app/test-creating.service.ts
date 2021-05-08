import { Injectable } from '@angular/core';
import {CreateAnswerComponent} from "./create-answer/create-answer.component";
import {AnswerData} from "./AnswerData";
import {CreateQuestionComponent} from "./create-question/create-question.component";
import {QuestionData} from "./QuestionData";
import {TestData} from "./TestData";

@Injectable({
  providedIn: 'root'
})
export class TestCreatingService {

  constructor() { }

  testData: TestData;

}
