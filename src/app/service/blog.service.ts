import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class BlogService {
  private url: string;
  baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = window.location.origin;
    this.url = this.baseUrl + "/assets/data/api/blogs.json";
  }
  getBlog(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
