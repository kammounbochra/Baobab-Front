import {Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'ng-uikit-pro-standard';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {JournalistService} from '../../services/journalist.service';
import {JournalistSignup} from '../../models/Journalist-signup';
import {Observable} from 'rxjs';
import {Angular5Csv} from 'angular5-csv/Angular5-csv';
import {Article} from '../../models/Article';

@Component({
  selector: 'app-artcile-supp',
  templateUrl: './artcile-supp.component.html',
  styleUrls: ['./artcile-supp.component.scss']
})
export class ArtcileSuppComponent implements OnInit {

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    useBom: true,
    headers: [' Id', 'Name', 'Surname' , 'Date Naissance' , 'Numero', 'Email', 'Nationality', 'Motivation' ,  'Actions']

  };
  elements: any = [];

  previous: string;

  @ViewChildren('list') list: QueryList<ElementRef>;
  @ViewChildren('pages') pages: QueryList<any>;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  paginators: Array<any> = [];
  activePage = 1;
  firstVisibleIndex = 1;
  lastVisibleIndex = 10;
  firstVisiblePaginator: number;
  tableData: Array<any> = [];
  sorted = false;
  searchText: string;
  firstPageNumber = 1;
  lastPageNumber: number;
  maxVisibleItems = 10;
  private id: any;
  private objElement: any;

  numberOfPaginators: number;
  lastVisiblePaginator: number;





  submitted = false;
  angForm: FormGroup;
  validatingForm: FormGroup;
 journalistes: Object;

  constructor(private journalisteService: JournalistService,
              private fb: FormBuilder , private _router: Router)
  { }

  ngOnInit() {
    this.journalisteService.getAll().subscribe(dat => {
      this.journalistes = dat;
      console.log(dat); })
    this.createForm();
    this.journalisteService.getAll().subscribe((next: any) => {
      next.forEach((element: any) => {
        this.tableData.push({  id: element.id ,
          name: element.name ,
          surname: element.surname ,
          dateNaissance: element.dateNaissance ,
          numtel: element.numtel ,
          email: element.email ,
          nationality: element.nationality ,
          motivationtext: element.motivationtext ,
        });
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


/*  generateCsv() {
    new Angular5Csv(this.search(), 'journaliste', this.options);
  }*/

  createForm() {

    this.validatingForm = new FormGroup({
      name: new FormControl(),

    });
  }
/*
  get input() { return this.validatingForm.get('bruit'); }
*/
  /* calculAge() :void
  {if (this.date_naissance)
  {var timeDiff = Math.abs(Date.now()- new Date(this.date_naissance).getTime());
    this.age= Math.floor(timeDiff/(1000*3600*24)/365.25);
  }
  } */
  /*liste()
  { this.journalisteService.getBruitsList().subscribe((next: any) => {
    next.forEach((element: any) => {
      this.tableData.push({  id: (element.id).toString(), libelle: element.libelle});
    });
  });}*/
 /* save() {
    this.bruitService.createBruit(this.bruits).subscribe( data => {  console.log(data); this.bruits = data as Bruit; } ) ;
    //      this.patientService.createPatient(this.patient).subscribe(dat =>  this.patient = dat);
    this.bruits = new Bruit();
    this.reloadComponent();
  }*/

 /* reloadComponent() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.liste();
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/bruit']);
  }*/

  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      first: 'Wpis ' + this.elements.length,
      last: 'Last ' + this.elements.length,
      handle: 'Handle ' + this.elements.length
    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, {id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy'});
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }


  removeA(id: any) {
    this.tableData.push(this.list[id]);
    this.tableData.splice(id, 1);
  }

  add() {
    if (this.tableData.length > 0) {
      const person = this.tableData[0];
      this.tableData.push(person);
      this.tableData.splice(0, 1);
    }
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }


  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.tableData[id][property] = editField;
  }

  remove(id: any) {
    this.tableData.push(this.elements[id]);
    this.tableData.splice(id, 1);
  }


  changeValue(id: number, property: string, event: any) {
    this.tableData = event.target.textContent;
  }
}
