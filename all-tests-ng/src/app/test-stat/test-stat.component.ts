import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {TestStatData} from "../DataModels/TestStatData";
import {TestData} from "../DataModels/TestData";
import {GuestData} from "../DataModels/GuestData";

@Component({
  selector: 'app-test-stat',
  templateUrl: './test-stat.component.html',
  styleUrls: ['./test-stat.component.scss']
})
export class TestStatComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  testStat: GuestData[];
  testData: TestData;

  getStat(id: string) {
    this.api.getTestStat(id).subscribe((data: GuestData[]) => this.testStat = data);
    this.api.getTest(id).subscribe((data: TestData) => this.testData = data);
  }
}
