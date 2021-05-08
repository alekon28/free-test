import { Component, OnInit } from '@angular/core';
import {TestData} from "../TestData";
import {UserData} from "../UserData";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-pass-test',
  templateUrl: './pass-test.component.html',
  styleUrls: ['./pass-test.component.scss']
})
export class PassTestComponent implements OnInit {

  constructor(private api: ApiService) { }

  testData: TestData;

  ngOnInit(): void {
  }

  getTest(id: string) {
    this.api.getTest(id).subscribe((data: TestData) => this.testData = data);
  }

}
