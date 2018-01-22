import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Articles } from '../interface/articles';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ArticlesService {
  private _articlesURL = 'http://www.etechbuddy.com/assets/data/api/articles.json';

  constructor(private http: HttpClient) {
  }

  getArticles() {
    return this.http.get(this._articlesURL);
  }

  private handleError(errror: Response) {
    return Observable.throw(errror.statusText);
  }
}
