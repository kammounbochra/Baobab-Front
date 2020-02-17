import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'ng-uikit-pro-standard';
import {JournalistService} from '../../services/journalist.service';

@Component({
  selector: 'app-inscrit-app',
  templateUrl: './inscrit-app.component.html',
  styleUrls: ['./inscrit-app.component.scss']
})
export class InscritAppComponent implements OnInit , AfterViewInit {
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row') row: ElementRef;

  elements: any = [];
  headElements = ['id', 'Name', 'Surname', 'Username', 'Email', 'Date Naissance', 'Nationality' , 'Actions'];

  searchText;
  previous: string;

  maxVisibleItems  = 8;

  tableData: Array<any> = [];

  ////
  editField: string;
  personList: Array<any> = [
    { id: 1, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
    { id: 2, name: 'Guerra Cortez', age: 45, companyName: 'Insectus', country: 'USA', city: 'San Francisco' },
    { id: 3, name: 'Guadalupe House', age: 26, companyName: 'Isotronic', country: 'Germany', city: 'Frankfurt am Main' },
    { id: 4, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
    { id: 5, name: 'Elisa Gallagher', age: 31, companyName: 'Portica', country: 'United Kingdom', city: 'London' },
  ];

  awaitingPersonList: Array<any> = [
    { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
    { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
    { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
    { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
    { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
  ];
  constructor(private cdRef: ChangeDetectorRef, private journalisteService: JournalistService) {}

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
  /*  for (let i = 1; i <= 25; i++) {
      this.elements.push({id: i.toString(), first: 'Wpis ' + i, last: 'Last ' + i, handle: 'Handle ' + i});
    }*/
    //this.createForm();
    this.journalisteService.getAll().subscribe((next: any) => {
      next.forEach((element: any) => {
        this.tableData.push({  id: element.id, name: element.name ,
          surname: element.surname ,
          username: element.username ,
          datenaiss: element.datenaiss ,
          nationality: element.nationality ,
          email: element.email ,
          motivationtext: element.motivationtext ,

        });
      });
    });
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
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
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
}
