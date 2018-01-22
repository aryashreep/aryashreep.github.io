import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ArticlesService } from '../../service/articles.service';
import { Articles } from '../../interface/articles';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [ArticlesService]
})
export class AboutComponent implements OnInit {
  title = 'Arya\'s portfolio :: eTechBuddy';
  public articles;

  constructor(private titleService: Title, private articlesSerivce: ArticlesService) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.getArticles();
  }

  getArticles() {
    this.articlesSerivce.getArticles().subscribe(
      // the first argument is a function which runs on success
      data => { this.articles = data; },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading articles')
    );
  }
}
