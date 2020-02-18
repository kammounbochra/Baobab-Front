import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'ng-uikit-pro-standard';
import {JournalistService} from '../../services/journalist.service';
import {Http} from '@angular/http';
import {Angular5Csv} from 'angular5-csv/Angular5-csv';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inscrit-app',
  templateUrl: './inscrit-app.component.html',
  styleUrls: ['./inscrit-app.component.scss']
})
export class InscritAppComponent implements OnInit , AfterViewInit {
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    useBom: true,
    headers: ['Post ID', 'Post title', 'Post body']
  };



  @ViewChildren('list') list: QueryList<ElementRef>;
  @ViewChildren('pages') pages: QueryList<any>;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;


  paginators: Array<any> = [];
  activePage = 1;
  firstVisibleIndex = 1;
  lastVisibleIndex = 10;
  url: any = 'https://jsonplaceholder.typicode.com/posts';
  tableData: Array<any> = [];
  sorted = false;
  searchText: string;
  firstPageNumber = 1;
  lastPageNumber: number;
  maxVisibleItems = 10;
  elements: any = [];
  validatingForm: FormGroup;
  journalistes: Object;
  private editField: string;




  constructor(private journalisteService: JournalistService,
              private fb: FormBuilder , private _router: Router) { }



  ngOnInit() {
/*    this.getData().subscribe((next: any) => {
      next.json().forEach((element: any) => {
        this.tableData.push({ id: (element.id).toString(), title: element.title, body: element.body });
      });*/


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

  ngAfterViewInit(): void {
  }
  remove(id: any) {
    this.tableData.push(this.tableData[id]);
    this.tableData.splice(id, 1);
  //  this.journalisteService.delete
  }

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


  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }


  add() {
    if (this.tableData.length > 0) {
      const person = this.tableData[0];
      this.tableData.push(person);
      this.tableData.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
    this.tableData[id][property] = this.editField;
  }


}
