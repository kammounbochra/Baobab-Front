import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JournalistSignup} from '../models/Journalist-signup';
import {Observable} from 'rxjs';
import {JournalistLogin} from '../models/Journalist-login';
import {JwtResponse} from '../Auth/jwt-response';
import {ModeratorLogin} from '../models/Moderator-login';
const httpOptions = { headers: new HttpHeaders ({'ContentType' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ModerateurService {

  private baseUrl = 'http://localhost:8080/api/Moderator';

  constructor(private http: HttpClient) {
  }

  private journaliste: JournalistSignup ;

  signUp(journaliste: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/signup`, journaliste);
  }


  signInModerator(credentials: ModeratorLogin): Observable<JwtResponse> {
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
