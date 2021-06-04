import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { AuthData } from "./DataModels/AuthData";
import {AuthToken} from "./DataModels/AuthToken";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import {Message} from "./DataModels/Message";
import {UserData} from "./DataModels/UserData";
import { HttpHeaders } from '@angular/common/http';
import {TestData} from "./DataModels/TestData";
import {PassTestData} from "./DataModels/PassTestData";
import {TestStatData} from "./DataModels/TestStatData";
import {GuestData} from "./DataModels/GuestData";
import {Router, Routes} from "@angular/router";

@Injectable()
export class ApiService {

  constructor(private router: Router, private http: HttpClient) { }

  api_host: string = 'http://127.0.0.1:5000/';

  public jwt: AuthToken = {
    "token": ""
  }

  private JWT = new BehaviorSubject(this.jwt);
  sharedJWT = this.JWT.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.jwt.token}`
    })
  };

  private navError() {
    this.router.navigate(['login']);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  public nextJWT(jwt: AuthToken) {
    this.JWT.next(jwt);
  }

  public registration(authdata: AuthData) {
    return this.http.post<Message>(this.api_host + 'api/signup', authdata)
      .pipe(
        catchError(this.handleError)
      )
  }

  public authorization(authdata: AuthData): Observable<AuthToken> {
    console.log("Функция вызвалась");
    let response = this.http.post<AuthToken>(this.api_host + 'api/signin', authdata);
    /*response.subscribe((data: AuthToken) => this.jwt = {
      token: data.token
    });*/
    console.log("Функция звершилась");
    return response
      .pipe(
        catchError(this.handleError)
      );
  }

  public info() {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.JWT.value.token}`);
    return this.http.get<UserData>(this.api_host + 'api/user/info', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public addTest(data: TestData) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.JWT.value.token}`);
    return this.http.post<Message>(this.api_host + 'api/test/add', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getUserTests() {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.JWT.value.token}`);
    return this.http.get<TestData[]>(this.api_host + 'api/tests', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getTest(id: string) {
    return this.http.get<TestData>(this.api_host + 'api/test/' + id)
      .pipe(
        catchError(this.handleError)
      )
  }

  public passTest(passTestData: PassTestData) {
    return this.http.post<Message>(this.api_host + 'api/test/pass', passTestData)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getTestStat(id: string) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.JWT.value.token}`);
    return this.http.get<GuestData[]>(this.api_host + 'api/test/stat/' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
}
