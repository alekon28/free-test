import { Component, OnInit } from '@angular/core';
import {TestData} from "../TestData";
import {UserData} from "../UserData";
import {ApiService} from "../api.service";
import {PassTestData} from "../PassTestData";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {Message} from "../Message";

@Component({
  selector: 'app-pass-test',
  templateUrl: './pass-test.component.html',
  styleUrls: ['./pass-test.component.scss']
})
export class PassTestComponent implements OnInit {

  constructor(private api: ApiService) { }

  testData: TestData;
  passTestData: PassTestData = {
    "guest_name":"",
    "test_id": 0,
    "token": "",
    "answer_ids": []
  };
  response: Message;

  ngOnInit(): void {
  }

  getTest(id: string) {
    this.api.getTest(id).subscribe((data: TestData) => this.testData = data);
  }

  submit(): void {
    this.passTestData.test_id = this.testData.id;
    this.api.passTest(this.passTestData).subscribe((data: Message) => this.response = data);
  }

  addAnswer(id: string): void {
    this.passTestData.answer_ids.push(Number(id));
  }

  changeGuestName(data: string): void {
    this.passTestData.guest_name = data;
  }
}
