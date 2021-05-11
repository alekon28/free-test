import { Component, OnInit } from '@angular/core';
import { AuthData } from "../DataModels/AuthData";
import { ApiService } from "../api.service";
import {Observable} from "rxjs";
import {AuthToken} from "../DataModels/AuthToken";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  constructor(private api: ApiService) { }

  apitoken: string = 'None';

  checkToken(){
    this.apitoken = this.api.jwt.token;
  }
  public authToken!: AuthToken;

  username!: string;
  password!: string;
  user: AuthData = {
    "username": "",
    "password": ""
  };



  ngOnInit(): void {
  }

  usernameInputHandler(event: any) {
    this.username = event.target.value;
  }

  passwordInputHandler(event: any) {
    this.password = event.target.value;
  }

  sendData(): void {
    this.user.username = this.username;
    this.user.password = this.password;

    this.api.authorization(this.user).subscribe((data: AuthToken) => this.authToken = {
     token: data.token
    });
  }
}
