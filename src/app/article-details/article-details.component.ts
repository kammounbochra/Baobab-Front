import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../models/Article';
import {ArticleService} from '../services/article.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  article$: any = {};
  articles: any = {};
  art: Article = {} as Article ;
  a: any;
  param : number ;
  name: any;

  idArticle: number;
  private sub: any;
  private idUser: any;


  constructor(private route: ActivatedRoute , private articleService : ArticleService) { }

  ngOnInit() {
 /*   const idArticle = this.route.snapshot.params['idArticle'];
    console.log('id' , idArticle);
    this.name = this.articleService.getArticleId(+idArticle).subscribe(res => {
      this.articles = res;
      console.log('zzz', this.articles);
      console.log('aa' , this.name);
    })*/

    this.sub = this.route.params.subscribe(params => {
      this.idArticle = +params['idArticle']; // (+) converts string 'id' to a number


this.articleService.get(this.idArticle).subscribe(dat => {
  this.articles = dat;  console.log('article' , dat) ;
  this.idUser = this.articles.author.idUser;
});
console.log ('idd' , this.idArticle);
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
