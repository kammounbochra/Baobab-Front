import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';

import {  ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import {JournalistService} from '../../services/journalist.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {JournalistSignup} from '../../models/Journalist-signup';
import {Article} from '../../models/Article';
@Component({
  selector: 'app-article-categorie',
  templateUrl: './article-categorie.component.html',
  styleUrls: ['./article-categorie.component.scss']
})
export class ArticleCategorieComponent implements OnInit , OnDestroy  {


  article$: any = {};
  journaliste: any = {};
  art: Article = {} as Article ;
  a: any;
  param : number ;
  name: any;
i:any;
  idUser: number;
private sub: any;

  constructor(private route: ActivatedRoute , private  journalistService : JournalistService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.idUser = +params['i']; // (+) converts string 'id' to a number


      this.journalistService.get(this.idUser).subscribe(dat => {
        this.journaliste = dat;  console.log('jour' , dat) ;
      });
      console.log ('idd' , this.idUser);
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
