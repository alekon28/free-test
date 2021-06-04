import { Component, OnInit } from '@angular/core';
import {TestData} from "../DataModels/TestData";
import {UserData} from "../DataModels/UserData";
import {ApiService} from "../api.service";
import {PassTestData} from "../DataModels/PassTestData";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {Message} from "../DataModels/Message";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-pass-test',
  templateUrl: './pass-test.component.html',
  styleUrls: ['./pass-test.component.scss']
})
export class PassTestComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  testData: TestData;
  emptyTestData: TestData;
  passTestData: PassTestData = {
    "guest_name":"",
    "test_id": 0,
    "token": "",
    "answer_ids": []
  };
  response: Message;
  currentQuestion: number;
  questionQuantity: number;

  ngOnInit(): void {
  }

  getTest(id: string) {
    this.api.getTest(id).subscribe((data: TestData) => {
      this.testData = data;
      this.questionQuantity = data.questions.length;
    });
    this.currentQuestion = 0;
  }

  nextQuestion() {
    if (this.currentQuestion + 1 <= this.questionQuantity) {
      this.currentQuestion++;
    }
  }

  submit(): void {
    this.passTestData.test_id = this.testData.id;
    this.api.passTest(this.passTestData).subscribe((data: Message) => this.response = data);
    this.testData = this.emptyTestData;
  }

  addAnswer(id: string): void {
    this.passTestData.answer_ids.push(Number(id));
  }

  changeGuestName(data: string): void {
    this.passTestData.guest_name = data;
  }
}
