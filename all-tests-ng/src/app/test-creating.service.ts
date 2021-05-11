import { Injectable } from '@angular/core';
import {CreateAnswerComponent} from "./create-answer/create-answer.component";
import {AnswerData} from "./DataModels/AnswerData";
import {CreateQuestionComponent} from "./create-question/create-question.component";
import {QuestionData} from "./DataModels/QuestionData";
import {TestData} from "./DataModels/TestData";

@Injectable({
  providedIn: 'root'
})
export class TestCreatingService {

  constructor() { }

  testData: TestData;

}
