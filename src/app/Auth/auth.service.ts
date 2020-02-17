import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpEvent,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private loginUrl = 'http://localhost:8080/api/auth/login';
  

  constructor(private http: HttpClient) {
  }

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';

 

  private postArticle='http://localhost:8080/api/article/AddArticle';
  private getAllArticles='http://localhost:8080/api/article';
  

  pushFileToStorage(journalist:any[],file: File,file2: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('file', file2);

    //formdata.append('name', name);
    const req = new HttpRequest('POST', 'http://localhost:8080/journalist/auth/signup', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }


  // AuthpostArticle(info:ArticleInfo): Observable<string> {
  //   return this.http.post<string>(this.postArticle, info, httpOptions);
  // }
  getArticle():Observable <any>{
    
    return this.http.get(this.getAllArticles);
  }



 
}
