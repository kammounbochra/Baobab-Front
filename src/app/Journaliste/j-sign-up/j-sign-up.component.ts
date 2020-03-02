import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompleterData, CompleterService, IMyOptions, MDBDatePickerComponent, ToastService} from 'ng-uikit-pro-standard';
import {JournalistService} from '../../services/journalist.service';
import {Router} from '@angular/router';
import {JournalistSignup} from '../../models/Journalist-signup';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-j-sign-up',
  templateUrl: './j-sign-up.component.html',
  styleUrls: ['./j-sign-up.component.scss']
})
export class JSignUpComponent implements OnInit  , AfterViewInit {
  private error: any;
  constructor(public completerService: CompleterService,
              private fb: FormBuilder,
              private journalistService: JournalistService,
              private router: Router,
              private toastrService: ToastService
              )

  {this.dataRemote = completerService.remote('https://raw.githubusercontent.com/oferh/ng2-completer/master/demo/res/data/countries.json?', 'name', 'name');
  }


  model: any;
  modell: any;
  @ViewChild('dateNaissance') dateNaissance: MDBDatePickerComponent;
  public myDatePickerOptions:   IMyOptions = {
    minYear: 1900,
    maxYear: 2017
  };

  public dataRemote: CompleterData;
  public ngModelSearchStr: string;
  public ngModelDataService: CompleterData;
  remoteDataSearchStr: any;
  public searchStr: string;

  public invalid = false ;
  public dataService: CompleterData;



  private role: 'Journaliste';
  testForm: FormGroup;
  submitted = false;
  loading = false;
  private username: string;
  private password: string;
  private nationality: string;
  private  numtel: any;
  private  email: any;
//  private dateNaissance : any ;
  journalist: JournalistSignup = new JournalistSignup(this.role );
  // journalist: JournalistSignup = new JournalistSignup(this.username, this.email , this.password, this.nationality, this.numtel, this.dateNaissance);
  @Input() j: JournalistSignup;
  journalistes: Observable<JournalistSignup[]>;



  ngAfterViewInit() {
    this.dateNaissance.addLocale({
      de: {
        dayLabels: { su: 'Son', mo: 'Mon', tu: 'Die', we: 'Mit', th: 'Don', fr: 'Fre', sa: 'Sam' },
        dayLabelsFull: { su: 'Sonntag', mo: 'Montag', tu: 'Dienstag', we: 'Mittwoch', th: 'Donnerstag', fr: 'Freitag', sa: 'Samstag' },
        monthLabels: {
          1: 'Jan', 2: 'Feb', 3: 'Mär', 4: 'Apr', 5: 'Mai', 6: 'Jun',
          7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Okt', 11: 'Nov', 12: 'Dez'
        },
        monthLabelsFull: {
          1: 'Januar', 2: 'Februar', 3: 'März', 4: 'April', 5: 'Mai', 6: 'Juni', 7: 'Juli',
          8: 'August', 9: 'September', 10: 'Oktober', 11: 'November', 12: 'Dezember'
        },
        dateFormat: 'dd-mm-yyyy',
        todayBtnTxt: 'Today',
        clearBtnTxt: 'Clear',
        closeBtnTxt: 'Close',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
      }
    });
  }
      ngOnInit() {
        this.testForm = this.fb.group({
        // testSelect: new FormControl(''),
          numtel: ['', [ Validators.required, Validators.minLength(3)]],
       username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirm_password: ['', Validators.required],
          actualEntreprise: ['', Validators.required],
         nationality: ['', Validators.required],
          experience: ['', Validators.required],
          name: ['', Validators.required],
         surname: ['', Validators.required],
          dateNaissance: ['', Validators.required],
          motivationtext: ['', Validators.required],
        });


      /*  this.testForm = this.fb.group({
          //  testSelect: new FormControl(''),
          name: new FormControl(null, Validators.required ),
        });*/

      /*  this.results = this.testForm.controls.autocomplete.valueChanges
          .pipe(
            startWith(''),
            map((value: string) => this.filter(value))
          );*/
     /*   this.testForm.get('nationality').valueChanges.subscribe( (value) => {
          console.log('Selected value:', value);
        });
*/
   /* this.registerForm = this.fb.group({
      orangeFormuserName: ['', Validators.required],
      orangeFormuserName: ['', Validators.required],
      orangeFormEmail: ['', [Validators.required, Validators.email]],
      orangeFormPass: ['', [Validators.required, Validators.minLength(8)]],
      orangeFormentreprise: ['', Validators.required],
      motivationFormMessage: ['', [Validators.required, Validators.minLength(30)]],
      birthCalendar: ['', Validators.required],
      nomFormName: ['', [Validators.required, Validators.minLength(2)]],
      prenomFormName: ['', [Validators.required, Validators.minLength(4)]],
      phoneFormName: ['', Validators.required],
      xpNumFormName: ['', Validators.required],
      selectForm: ['', Validators.required]
    });*/

  }
/*  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.data.filter((item: any) => item.toLowerCase().includes(filterValue));
  }*/
  showInfo() {
    this.toastrService.info('Votre inscription est enregistré ');
  }
  showWarning() {
    this.toastrService.warning('Vérifier les champs');
  }
  get f() {
    return this.testForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.showWarning();
    // stop here if form is invalid
 /*   if (this.testForm.invalid) {
      this.showWarning();
    } else {
        this.showInfo();
    }*/
    }

   // alert('SUCCESS!! :-)');
  signup() {

  this.journalistService.signUpJ(this.journalist).subscribe( data => {  console.log('aaaaa', data);
  this.journalist = data as JournalistSignup;
    this.showInfo();
    });



   // this.submitted = true;

    // stop here if form is invalid
 /*   if (this.invalid = false) {
      this.showWarning();
    } else {
      this.showInfo();
    }*/

}}
