import { Component, OnInit } from '@angular/core';
import {TestData} from "../TestData";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-user-tests',
  templateUrl: './user-tests.component.html',
  styleUrls: ['./user-tests.component.scss']
})
export class UserTestsComponent implements OnInit {

  constructor(private api: ApiService) { }

  userTests: TestData[];

  ngOnInit(): void {
    this.api.getUserTests().subscribe((data: TestData[]) => this.userTests = data)
  }


}
