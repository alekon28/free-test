import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { AuthData } from "./AuthData";
import {AuthToken} from "./AuthToken";
import {Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import {Message} from "./Message";
import {UserData} from "./UserData";
import { HttpHeaders } from '@angular/common/http';
import {TestData} from "./TestData";
import {PassTestData} from "./PassTestData";

@Injectable()
export class ApiService {

  api_host: string = 'http://127.0.0.1:5000/';
  public jwt: AuthToken = {
    "token":"null"
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.jwt.token}`
    })
  };

  constructor(private http: HttpClient) { }

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


  public registration(authdata: AuthData) {
    return this.http.post<Message>(this.api_host + 'api/signup', authdata)
      .pipe(
        catchError(this.handleError)
      )
  }

  public authorization(authdata: AuthData): Observable<AuthToken> {
    let response = this.http.post<AuthToken>(this.api_host + 'api/signin', authdata)
    response.subscribe((data: AuthToken) => this.jwt = {
      token: data.token
    });

    return response
      .pipe(
        catchError(this.handleError)
      );
  }

  public info() {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.jwt.token}`);
    return this.http.get<UserData>(this.api_host + 'api/info', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public addTest(data: TestData) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.jwt.token}`);
    return this.http.post<Message>(this.api_host + 'api/test', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getUserTests() {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.jwt.token}`);
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
}
