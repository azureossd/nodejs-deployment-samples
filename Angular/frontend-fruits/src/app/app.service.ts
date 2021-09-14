import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fruit } from "./fruit";
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private API_ENDPOINT='http://localhost:3000';

  constructor(private http: HttpClient) { }

  getFruits(): Observable<Fruit> {
    return this.http.get<Fruit>(this.API_ENDPOINT + '/fruits')
  }

  addFruit(fruit: Fruit): Observable<Fruit> {
    return this.http.post<Fruit>(this.API_ENDPOINT + '/fruits', fruit, httpOptions)
  }
  
}
