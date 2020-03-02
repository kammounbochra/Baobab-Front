import {AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'ng-uikit-pro-standard';
import {FormBuilder, FormGroup} from '@angular/forms';
import {JournalistSignup} from '../../models/Journalist-signup';
import {JournalistService} from '../../services/journalist.service';
import {Router} from '@angular/router';
import {ArticleService} from '../../services/article.service';
import {Article} from '../../models/Article';

@Component({
  selector: 'app-article-app',
  templateUrl: './article-app.component.html',
  styleUrls: ['./article-app.component.scss']
})
export class ArticleAppComponent  implements OnInit  {

  private text;
  private text1;
  private text2;
  private text3;

  @ViewChildren('list') list: QueryList<ElementRef>;
  @ViewChildren('pages') pages: QueryList<any>;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;


  paginators: Array<any> = [];
  activePage = 1;
  firstVisibleIndex = 1;
  lastVisibleIndex = 10;
  tableData: Array<any> = [];
  sorted = false;
  searchText: string;
  firstPageNumber = 1;
  lastPageNumber: number;
  maxVisibleItems = 20;
  elements: any = [];

  article: Article = new Article;


  constructor(private articleService: ArticleService,
            ) { }



  ngOnInit() {
    this.articleService.getEncours().subscribe((next: any) => {
      next.forEach((element: any) => {
        this.tableData.push({
          idArticle: element.idArticle,
          author: element.author,
          date : element.date,
          contentDetails: element.contentDetails,
         // content: element.contentDetails.content ,
        }); console.log('art', element);
      });
  });

  setTimeout(() => {
  for (let i = 1; i <= this.tableData.length; i++) {
  if (i % this.maxVisibleItems === 0) {
  this.paginators.push(i / this.maxVisibleItems);
}
}
if (this.tableData.length % this.paginators.length !== 0) {
  this.paginators.push(this.paginators.length + 1);
}
this.lastPageNumber = this.paginators.length;
this.lastVisibleIndex = this.maxVisibleItems;
}, 200);

}

@HostListener('input') oninput() {
  this.paginators = [];
  for (let i = 1; i <= this.search().length; i++) {
    if (!(this.paginators.indexOf(Math.ceil(i / this.maxVisibleItems)) !== -1)) {
      this.paginators.push(Math.ceil(i / this.maxVisibleItems));
    }
  }
  this.lastPageNumber = this.paginators.length;
}
changePage(event: any) {
  if (event.target.text >= 1 && event.target.text <= this.maxVisibleItems) {
    this.activePage = +event.target.text;
    this.firstVisibleIndex = this.activePage * this.maxVisibleItems - this.maxVisibleItems + 1;
    this.lastVisibleIndex = this.activePage * this.maxVisibleItems;
  }
}

nextPage() {
  this.activePage += 1;
  this.firstVisibleIndex = this.activePage * this.maxVisibleItems - this.maxVisibleItems + 1;
  this.lastVisibleIndex = this.activePage * this.maxVisibleItems;
}
previousPage() {
  this.activePage -= 1;
  this.firstVisibleIndex = this.activePage * this.maxVisibleItems - this.maxVisibleItems + 1;
  this.lastVisibleIndex = this.activePage * this.maxVisibleItems;
}

firstPage() {
  this.activePage = 1;
  this.firstVisibleIndex = this.activePage * this.maxVisibleItems - this.maxVisibleItems + 1;
  this.lastVisibleIndex = this.activePage * this.maxVisibleItems;
}

lastPage() {
  this.activePage = this.lastPageNumber;
  this.firstVisibleIndex = this.activePage * this.maxVisibleItems - this.maxVisibleItems + 1;
  this.lastVisibleIndex = this.activePage * this.maxVisibleItems;
}

sortBy(by: string | any): void {
  if (by === 'id') {
  this.search().reverse();
} else {
  this.search().sort((a: any, b: any) => {
    if (a[by] < b[by]) {
      return this.sorted ? 1 : -1;
    }
    if (a[by] > b[by]) {
      return this.sorted ? -1 : 1;
    }
    return 0;
  });
}
this.sorted = !this.sorted;
}

filterIt(arr: any, searchKey: any) {
  return arr.filter((obj: any) => {
    return Object.keys(obj).some((key) => {
      return obj[key].includes(searchKey);
    });
  });
}

search() {
  if (!this.searchText) {
    return this.tableData;
  }
  if (this.searchText) {
    return this.filterIt(this.tableData, this.searchText);
  }
}



  update(idArticle: any) {

    let art: Article;
    let position = -1;

    for (let ar: Article of this.tableData) {
      position++;
      if (ar.idArticle === idArticle) {
        art = ar;
        break;
      }
    }


    this.articleService.Update(idArticle,
      {
        status: art.status
      }).subscribe(data => {
      console.log(data);
      this.article = data as Article;
      this.tableData.splice(position , 1);
    });
  }
  showFrame(frame, txt, txt1, txt2 , txt3) {
    this.text = txt;
    this.text1 = txt1;
    this.text2 = txt2;
    this.text3 = txt3;
    frame.show();
  }
}
