import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JournalistLogin} from '../../models/Journalist-login';
import {Observable} from 'rxjs';
import {JournalistService} from '../../services/journalist.service';
import {CompleterData, CompleterService, IMyOptions, MDBDatePickerComponent, ToastService} from 'ng-uikit-pro-standard';
import {Router} from '@angular/router';
import {JournalistSignup} from '../../models/Journalist-signup';
import {ModerateurService} from '../../services/moderateur.service';
import {TokenStorageService} from '../../Auth/token-storage.service';
import {ModeratorLogin} from '../../models/Moderator-login';

@Component({
  selector: 'app-footers',
  templateUrl: './footers.component.html',
  styleUrls: ['./footers.component.scss']
})
export class FootersComponent implements OnInit , AfterViewInit {
  testlog: FormGroup;
  submitted = false;
  journaliste: JournalistLogin = new JournalistLogin();
  @Input() jl: JournalistLogin;
  journalistes: Observable<JournalistLogin[]>;

  private username : string;
  private password : string;
  private nationality: string;
  private  numtel : string;
 // private  dateNaissance: Date;
  testForm: FormGroup;
  private role: any;
  model: any;
  modell: any;

  @ViewChild('dateNaissance') dateNaissance: MDBDatePickerComponent;
  public myDatePickerOptions:   IMyOptions = {
    minYear: 1900,
    maxYear: 2020
  };


  public dataRemote: CompleterData;
 journalist: JournalistSignup = new JournalistSignup(this.role);
  //  journalist: JournalistSignup = new JournalistSignup(this.username, this.password, this.nationality, this.numtel , this.role , this.dateNaissance, this.name)

  @Input() j: JournalistSignup;
  journalistess: Observable<JournalistSignup[]>;
  loading = false;



  testForm2: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  moderator: ModeratorLogin = new ModeratorLogin();
  @Input() m: ModeratorLogin;

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
  constructor(private fb: FormBuilder, public completerService: CompleterService,
              private journalistService: JournalistService, private toastrService: ToastService,
              private router: Router,  private moderateurService: ModerateurService,
             private tokenStorage: TokenStorageService) {
    this.dataRemote = completerService.remote('https://raw.githubusercontent.com/oferh/ng2-completer/master/demo/res/data/countries.json?', 'name', 'name');
  }

      ngOnInit() {
    this.testlog = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

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

    this.testForm2 = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  showInfo() {
    this.toastrService.info('Votre inscription est enregistré ');
  }

  showWarning() {
    this.toastrService.warning('Vérifier les champs');
  }

  get fl() {
    return this.testForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.showWarning();
  }
  signin() {
    if (this.testlog.valid) {
      this.journalistService.signInJournalist(this.journaliste);
      this.router.navigate(['redaction']);
    }
  }

  get f() {
    return this.testForm.controls;
  }
  signup() {

    this.journalistService.signUpJ(this.journalist).subscribe(data => {
      console.log('aaaaa', data);
      this.journalist = data as JournalistSignup;
      this.showInfo();
    });
  }


  get f2() {
    return this.testForm2.controls;
  }
  signinM() {
   if (this.testForm2.valid) {
      this.moderateurService.signInModerator(this.moderator).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.router.navigate(['inscrit_app']);
        },
        error => { this.showWarning(); }
       /* error => {
          console.log(error);

          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
          alert('identifiant ou mot de passe incorrect !!!');
        }*/
      );
    }
  }
}
