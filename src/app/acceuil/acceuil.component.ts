import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from '../services/article.service';
import {Article} from '../models/Article';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  private  article: Article = new Article();
  @Input() art: Article;
  articles: Article[];


  constructor(private articleService: ArticleService ) { }

  ngOnInit() {
    this.articleService.getArticleList().subscribe(dat => {
      this.articles = dat;  console.log(dat) ;
    });


}
}
