import { Component } from '@angular/core';
import {ApiService} from "./api.service";
import {Router, Routes} from "@angular/router";
import {AuthFormComponent} from "./auth-form/auth-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private api: ApiService, private router: Router) {
  }

  apitoken: string = "";

  checkToken(){
    console.log('Token in app component ' + this.apitoken);
    console.log('Token in observable ' + this.api.sharedJWT);
    console.log('Token in service ' + this.api.jwt.token);
  }

  ngOnInit() {
    this.api.sharedJWT.subscribe(token => {
      this.apitoken = token.token;
    })
  }

  logout() {
    this.api.nextJWT({'token': ''});
    this.router.navigate(['login']);
  }

}
