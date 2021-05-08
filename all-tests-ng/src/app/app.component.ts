import { Component } from '@angular/core';
import {ApiService} from "./api.service";
import {Routes} from "@angular/router";
import {AuthFormComponent} from "./auth-form/auth-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private api: ApiService) {
  }

  apitoken: string | null = 'None';

  checkToken(){
    this.apitoken = this.api.httpOptions.headers.get('Authorization')
  }

  title = 'all-tests-ng';

}
