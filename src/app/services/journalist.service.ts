import { Injectable } from '@angular/core';
import { JournalistSignup } from '../models/Journalist-signup';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtResponse } from '../Auth/jwt-response';
import { JournalistLogin } from '../models/Journalist-login';
import {UserService} from './user.service';

const httpOptions = { headers: new HttpHeaders ({'ContentType' : 'application/json'
    })
  };
@Injectable({
  providedIn: 'root'
})
export class JournalistService  {


  private baseUrl = 'http://localhost:8080/journalist/auth';
  constructor(private http: HttpClient) {
  }

  private journaliste: JournalistSignup ;

  signUpJ(journaliste: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/signup`, journaliste);
  }


  signInJournalist(credentials: JournalistLogin): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}` + `/signin`, credentials , httpOptions);
  }


  getAll() {
    return this.http.get(`${this.baseUrl}` + `/`);
  }
 /* signUp(info:JournalistSignup):Observable<string>{
    return this.http.post<string>(this.signupUrl,info,httpOptions)
  }*/

/*  GetMyArticle(id:number):Observable<any>{
    return this.http.get(this.baseURL+id);
  }*/

}
