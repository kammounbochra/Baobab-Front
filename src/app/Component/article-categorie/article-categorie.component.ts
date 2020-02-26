import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';

import {  ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import {JournalistService} from '../../services/journalist.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {JournalistSignup} from '../../models/Journalist-signup';
@Component({
  selector: 'app-article-categorie',
  templateUrl: './article-categorie.component.html',
  styleUrls: ['./article-categorie.component.scss']
})
export class ArticleCategorieComponent implements OnInit{

  constructor(private journalisteService: JournalistService,
              private fb: FormBuilder , private _router: Router) { }
  editField: string;
personList: Array<any> = [];
  private role: any ;
  journaliste: JournalistSignup = new JournalistSignup(this.role);


  @ViewChildren('pages') pages: QueryList<any>;
  itemsPerPage = 3;
  numberOfVisiblePaginators = 10;
  numberOfPaginators: number;
  paginators: Array<any> = [];
  activePage = 1;
  firstVisibleIndex = 1;
  lastVisibleIndex: number = this.itemsPerPage;
  firstVisiblePaginator = 0;
  lastVisiblePaginator = this.numberOfVisiblePaginators;

  /*
  awaitingPersonList: Array<any> = [
    { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
    { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
    { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
    { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
    { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
  ];*/

  ngOnInit() {
    this.journalisteService.getEncours().subscribe((next: any) => {
      next.forEach((element: any) => {
        this.personList.push({
          id: element.id,
          idUser: element.idUser,
          name: element.name,
          surname: element.surname,
          dateNaissance: element.dateNaissance,
          numtel: element.numtel,
          email: element.email,
          nationality: element.nationality,
          motivationtext: element.motivationtext,

        });
        console.log(element);
        console.log(element.idUser);
      });


    });
      if (this.personList.length % this.itemsPerPage === 0) {
        this.numberOfPaginators = Math.floor(this.personList.length / this.itemsPerPage);
      } else {
        this.numberOfPaginators = Math.floor(this.personList.length / this.itemsPerPage + 1);
      }

      for (let i = 1; i <= this.numberOfPaginators; i++) {
        this.paginators.push(i);
      }
  }
updateList(id: number, property: string, event: any) {
  const editField = event.target.textContent;
  this.personList[id][property] = editField;
}
  update(idUser: any) {

    this.journalisteService.Update(idUser,
      {name: this.journaliste.name,
        status: this.journaliste.status} ).subscribe(data => {
      console.log(data);
      this.journaliste = data as JournalistSignup;
    });
    this.remove(idUser);
  }
remove(id: any) {
  this.personList.push(this.personList[id]);
  this.personList.splice(id, 1);
}

add() {
  if (this.personList.length > 0) {
    const person = this.personList[0];
    this.personList.push(person);
    this.personList.splice(0, 1);
  }
}

changeValue(id: number, property: string, event: any) {
  this.editField = event.target.textContent;
}

  changePage(event: any) {
    if (event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
      this.activePage = +event.target.text;
      this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
      this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }
  }

  nextPage() {
    if (this.pages.last.nativeElement.classList.contains('active')) {
      if ((this.numberOfPaginators - this.numberOfVisiblePaginators) >= this.lastVisiblePaginator) {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
        this.lastVisiblePaginator += this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
        this.lastVisiblePaginator = this.numberOfPaginators;
      }
    }

    this.activePage += 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
  }

  previousPage() {
    if (this.pages.first.nativeElement.classList.contains('active')) {
      if ((this.lastVisiblePaginator - this.firstVisiblePaginator) === this.numberOfVisiblePaginators)  {
        this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
        this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
        this.lastVisiblePaginator -= (this.numberOfPaginators % this.numberOfVisiblePaginators);
      }
    }

    this.activePage -= 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
  }

  firstPage() {
    this.activePage = 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = this.numberOfVisiblePaginators;
  }

  lastPage() {
    this.activePage = this.numberOfPaginators;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;

    if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
      this.firstVisiblePaginator = this.numberOfPaginators - this.numberOfVisiblePaginators;
      this.lastVisiblePaginator = this.numberOfPaginators;
    } else {
      this.lastVisiblePaginator = this.numberOfPaginators;
      this.firstVisiblePaginator = this.lastVisiblePaginator - (this.numberOfPaginators % this.numberOfVisiblePaginators);
    }
  }
}

