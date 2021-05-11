import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { FormsModule } from "@angular/forms";
import { RegisterFormComponent } from './register-form/register-form.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from "@angular/common/http";
import {ApiService} from "./api.service";
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CreateScaleComponent } from './create-scale/create-scale.component';
import { CreateAnswerComponent } from './create-answer/create-answer.component';
import { CreateTokenComponent } from './create-token/create-token.component';
import { UserTestsComponent } from './user-tests/user-tests.component';
import { PassTestComponent } from './pass-test/pass-test.component';
import { TestStatComponent } from './test-stat/test-stat.component';

const appRoutes: Routes = [
  {path: 'login', component: AuthFormComponent},
  {path: 'register', component: RegisterFormComponent},
  {path: '', component: HomeComponent},
  {path: 'newtest', component: CreateTestComponent},
  {path: 'user-tests', component: UserTestsComponent},
  {path: 'pass-test', component: PassTestComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    RegisterFormComponent,
    CreateTestComponent,
    HomeComponent,
    CreateQuestionComponent,
    CreateScaleComponent,
    CreateAnswerComponent,
    CreateTokenComponent,
    UserTestsComponent,
    PassTestComponent,
    TestStatComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
