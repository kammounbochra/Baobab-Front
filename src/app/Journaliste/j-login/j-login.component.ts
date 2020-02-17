import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompleterData, CompleterService, ToastService} from 'ng-uikit-pro-standard';
import {Http} from '@angular/http';
import {JournalistService} from '../../services/journalist.service';
import {Router} from '@angular/router';
import {JournalistSignup} from '../../models/Journalist-signup';
import {Observable} from 'rxjs';
import {JournalistLogin} from '../../models/Journalist-login';
import {ModeratorLogin} from '../../models/Moderator-login';
import {ModerateurService} from '../../services/moderateur.service';
import {TokenStorageService} from '../../Auth/token-storage.service';

@Component({
  selector: 'app-j-login',
  templateUrl: './j-login.component.html',
  styleUrls: ['./j-login.component.scss']
})
export class JLoginComponent implements OnInit {
  private role: any;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  testForm: FormGroup;
  submitted = false;
  journalist: JournalistLogin = new JournalistLogin();
  @Input() j: JournalistLogin;
  //journalistes: Observable<JournalistLogin[]>;


  constructor(private fb: FormBuilder,
              private journalistService: JournalistService, private toastrService: ToastService,
              private router: Router, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.testForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  showInfo() {
    this.toastrService.info('Votre inscription est enregistré ');
  }

  showWarning() {
    this.toastrService.warning('Identifiant ou mot de passe incorrect !!!');
  }

  get f() {
    return this.testForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

  signin() {
    if (this.testForm.valid) {
      this.journalistService.signInJournalist(this.journalist).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.router.navigate(['redaction']);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
          this.showWarning();
          //alert('identifiant ou mot de passe incorrect !!!');
        }
      );
    }
  }

}
