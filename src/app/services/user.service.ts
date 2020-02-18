import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../models/User-register';
import { UserLogin } from '../models/User-login';
import { JwtResponse } from '../Auth/jwt-response';
const httpOptions={
  'headers':new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  'providedIn': 'root'
})
export class UserService {
private baseURL= 'http://localhost:8080/api/auth/'
  constructor(private http: HttpClient) { }

  signUp(credential: UserRegister):Observable<string>{
    return this.http.post<string>(this.baseURL+'signup',credential,httpOptions);
  }
  login(Credential:UserLogin):Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.baseURL+ 'signin',Credential,httpOptions);
  }


}
