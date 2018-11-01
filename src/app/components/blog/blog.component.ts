import { Component, OnInit, Pipe } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from "../../service/blog.service";

@Component({
  selector: 'blog-listing',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogService, HttpClientModule]
})
export class BlogComponent implements OnInit {
  private blogData: any;
  constructor(private svc: BlogService) { }

  ngOnInit() {
    this.svc.getBlog().subscribe(data => {
      this.blogData = data;
    });
  }

}
