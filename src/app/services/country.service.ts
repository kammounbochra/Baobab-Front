import { Injectable } from '@angular/core';
import {Country} from '../models/Country';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions =
  { headers: new HttpHeaders ({'ContentType' : 'application/json'}) };

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = 'http://localhost:8080/api/country/';
  countrys:  Country ;
  handleErrors: any;
  constructor(private http: HttpClient) { }



  /*getBruit(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, httpOptions ).pipe(map(bruit => bruit));
  }

  createBruit(bruit: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, bruit, httpOptions);
  }

  updateBruit(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteBruit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }*/

  getCountryList() {
    return this.http.get<Country[]>(`${this.baseUrl}` , httpOptions);
  }


 /* deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/delete`, { responseType: 'text' });
  }*/}
