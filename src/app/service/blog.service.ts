import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class BlogService {
  private url = "http://localhost:4200/assets/data/api/blogs.json";
  constructor(private http: HttpClient) { }
  getBlog(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
