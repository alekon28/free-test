import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {UserData} from "../DataModels/UserData";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  userData!: UserData;

  ngOnInit(): void {
      this.api.info().subscribe((data: UserData) => this.userData = {
        id: data.id,
        username: data.username,
        created_at: data.created_at,
        role: data.role
      });
  }

}
