import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../models/Article';
import {ArticleService} from '../../services/article.service';
import {Observable} from 'rxjs';
import {JournalistService} from '../../services/journalist.service';
import {JournalistSignup} from '../../models/Journalist-signup';
import {Router} from '@angular/router';

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
  private role: string;
  journaliste: JournalistSignup = new JournalistSignup(this.role);
  private etat = 'valid';


  constructor(private articleService: ArticleService, private journalistService: JournalistService,  private _router: Router) {
  }

  ngOnInit() {

    this.journalistService.getAll().subscribe(data => {
      this.journalists = data;
      console.log(data);  })


    this.articleService.getArticleList().subscribe(dat => {
      this.articles = dat;
      console.log(dat);
  //    console.log('aaa', this.art.author.id);
    });

  }


  updateE(idUser: any) {
    this.journalistService.updateJ(this.journaliste.idUser,
      {name: this.journaliste.name,
        status: this.journaliste.status  = this.etat} ).subscribe(data => {
      console.log(data);
      this.journaliste = data as JournalistSignup;
      this._router.navigate(['/j_liste']);
    }); }
}
