import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Article} from '../../models/Article';
import {Observable} from 'rxjs';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/Category';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

  private  article: Article = new Article();
  @Input() art: Article;
  articles: Article[];
  artLifestyle: Article[];
  artEco: Article[];
  artEntreprise: Article[];
  artTech: Article[];


  @Input() cat: Category;
  categorys: Category[];
  private x: any;
  constructor(private articleService: ArticleService , private categoryService : CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(dat => {
      this.categorys = dat;  console.log(dat) ;
    });
    this.articleService.getArticleList().subscribe(dat => {
      this.articles = dat;  console.log(dat) ;

    });

    this.articleService.getLifestyle().subscribe(datL => {
      this.artLifestyle = datL;
      console.log('artLifestyle' , datL) ;

    });

    this.articleService.getEntreprise().subscribe(datet => {
      this.artEntreprise = datet;
      console.log('Entreprise' , datet) ;

    });
    this.articleService.getEconomie().subscribe(date => {
      this.artEco = date;
      console.log('eco' , date) ;

    });

    this.articleService.getTechnologie().subscribe(dattec => {
      this.artTech = dattec;
      console.log('Technologie' , dattec) ;

    });
}


}
