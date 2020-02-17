import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../models/Article';
import {ArticleService} from '../../services/article.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-j-dashboard',
  templateUrl: './j-dashboard.component.html',
  styleUrls: ['./j-dashboard.component.scss']
})
export class JDashboardComponent implements OnInit {
  private article: Article = new Article();
  @Input() art: Article;
  articles: Article[];
  num: any;


  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.articleService.getArticleList().subscribe(dat => {
      this.articles = dat;
      console.log(dat);
  //    console.log('aaa', this.art.author.id);
    });

  }
}
