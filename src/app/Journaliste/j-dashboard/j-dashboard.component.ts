import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../models/Article';
import {ArticleService} from '../../services/article.service';
import {Observable} from 'rxjs';
import {JournalistService} from '../../services/journalist.service';
import {JournalistSignup} from '../../models/Journalist-signup';

@Component({
  selector: 'app-j-dashboard',
  templateUrl: './j-dashboard.component.html',
  styleUrls: ['./j-dashboard.component.scss']
})
export class JDashboardComponent implements OnInit {
  private article: Article = new Article();
  @Input() art: Article;
  articles: Article[];

  journalists:  Object = [];

  num: any;
  headElements: [' Id', 'Name', 'Surname' , 'Date Naissance' , 'Numero', 'Email', 'Nationality', 'Motivation' ,  'Actions']
  private projects: any;
  private user: any;

  constructor(private articleService: ArticleService, private journalistService: JournalistService) {
  }

  ngOnInit() {

    this.journalistService.getAll().subscribe(data => {
      this.journalists = data;
      console.log(data); })


    this.articleService.getArticleList().subscribe(dat => {
      this.articles = dat;
      console.log(dat);
  //    console.log('aaa', this.art.author.id);
    });

  }
}
