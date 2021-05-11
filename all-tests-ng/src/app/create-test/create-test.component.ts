import { Component, OnInit } from '@angular/core';
import {CreateScaleComponent} from "../create-scale/create-scale.component";
import {CreateQuestionComponent} from "../create-question/create-question.component";
import {TestData} from "../DataModels/TestData";
import {TestCreatingService} from "../test-creating.service";
import {QuestionData} from "../DataModels/QuestionData";
import {ScaleData} from "../DataModels/ScaleData";
import {ApiService} from "../api.service";
import {Message} from "../DataModels/Message";


@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {

  constructor(private api: ApiService) { }

  testData: TestData = {
    "id": 0,
    "created_by": 0,
    "name": "",
    "token": "",
    "questions": [],
    "guests": []
  }

  response: Message;

  ngOnInit(): void {
  }

  addQuestion(data: QuestionData): void {
    this.testData.questions.push(data);
  }

  changeTestName(name: string) {
    this.testData.name = name;
  }

  changeTestToken(token: string) {
    this.testData.token = token;
  }

  submit() {
    this.api.addTest(this.testData).subscribe((data: Message) => this.response = {
      "message": data.message
    });
  }
}
