import {AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'ng-uikit-pro-standard';
import {FormBuilder, FormGroup} from '@angular/forms';
import {JournalistSignup} from '../../models/Journalist-signup';
import {JournalistService} from '../../services/journalist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-j-liste',
  templateUrl: './j-liste.component.html',
  styleUrls: ['./j-liste.component.scss']
})
export class JListeComponent implements OnInit , AfterViewInit {

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    useBom: true,
    headers: ['Post ID', 'Post title', 'Post body']
  };


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
  validatingForm: FormGroup;
  journalistes: Object;
  private editField: string;
  private id: any;
  private role: any ;
  journaliste: JournalistSignup = new JournalistSignup(this.role);
  private etat: 'valid';

  private a  ;
  constructor(private journalisteService: JournalistService,
              private fb: FormBuilder , private _router: Router) { }



  ngOnInit() {
    /*    this.getData().subscribe((next: any) => {
          next.json().forEach((element: any) => {
            this.tableData.push({ id: (element.id).toString(), title: element.title, body: element.body });
          });*/


    this.journalisteService.getAll().subscribe((next: any) => {
      next.forEach((element: any) => {
        this.tableData.push({  id: element.id,
          idUser: element.idUser,
          name: element.name ,
          surname: element.surname ,
          dateNaissance: element.dateNaissance ,
          numtel: element.numtel ,
          email: element.email ,
          nationality: element.nationality ,
          motivationtext: element.motivationtext,
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
    // this.updateEtat(this.id);
    this.tableData.push(this.tableData[id]);
    this.tableData.splice(id, 1);
  }


  update(idUser: any) {

    this.journalisteService.Update(this.journaliste.idUser,
      {name: this.journaliste.name,
        status: this.journaliste.status} ).subscribe(data => {
      console.log(data);
      this.journaliste = data as JournalistSignup;
    }); }


  updateJ(idUser: number) {
    this.journalisteService.updateJ(this.journaliste.idUser,
      {name: this.journaliste.name,
        status: this.journaliste.status  = this.etat} ).subscribe(data => {
      console.log(data);
      this.journaliste = data as JournalistSignup;
      //  this._router.navigate(['/article_details']);
    }); }

  /*  update(id: number) {
      this.journalisteService.Update(this.journaliste.id).subscribe(data => {
        console.log(data);
        this.journaliste = data as JournalistSignup;
      }); }*/

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
  showFrame(frame, txt , txt1 , txt2) {
    this.text = txt;
    this.text1 = txt1;
    this.text2 = txt2;
    frame.show();
  }

}
