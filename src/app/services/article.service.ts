import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Article } from '../models/Article';
import { Observable } from 'rxjs';
import { ContentDetails } from '../models/ContentDetails';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
private baseURL = 'http://localhost:8080/api/article/';
private article: Article;
private ContentDetails: ContentDetails;
  constructor(private http: HttpClient) { }

  AddArticle( article: Object , contentDetails: Object): Observable<Object> {
    return this.http.post(this.baseURL + 'addArticle', Article, contentDetails );
  }
  DeleteArticle(id: number ): Observable<Object> {
    return this.http.delete(this.baseURL + id);
  }
  getAll(): Observable <Object> {
    return this.http.get(this.baseURL);
  }
  getArticle() { return  this.http.get(`${this.baseURL}` ); }

  getArticleList() {
    return this.http.get<Article[]>(`${this.baseURL}` , httpOptions );
  }

  editArticle(idArticle: any): Observable<any> {

    return this.http.get(`${this.baseURL}edit/${idArticle}`);
  }
  getArticleId(idArticle: any): Observable<any> {

    return this.http.get(`${this.baseURL}${idArticle}`);
  }
  //  return this.http.get(`${this.baseUrl}/${id}`).pipe(map(pp => pp));}
  get(id) {
    return this.http.get(`${this.baseURL}${id}`);
  }

  getLifestyle() {
    return this.http.get<Article[]>(`${this.baseURL}ByCatlifestyle`);
  }

  getTechnologie() {
    return this.http.get<Article[]>(`${this.baseURL}ByCattech`);
  }

  getEntreprise() {
    return this.http.get<Article[]>(`${this.baseURL}ByCatEntreprise`);
  }

  getEconomie() {
    return this.http.get<Article[]>(`${this.baseURL}ByCatEco`);
  }

}
