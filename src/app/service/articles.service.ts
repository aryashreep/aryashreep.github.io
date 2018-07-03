import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Articles } from '../interface/articles';

@Injectable()
export class ArticlesService {
  private _articlesURL = 'https://www.etechbuddy.com/assets/data/api/articles.json';
  constructor(private http: HttpClient) {
  }

  getArticles(): Observable<any> {
    return this.http
      .get(this._articlesURL);
  }

  private handleError(errror: Response) {
    return Observable.throw(errror.statusText);
  }
}
