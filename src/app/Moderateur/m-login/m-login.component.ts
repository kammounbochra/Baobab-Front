import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JournalistLogin} from '../../models/Journalist-login';
import {Observable} from 'rxjs';
import {JournalistService} from '../../services/journalist.service';
import {ToastService} from 'ng-uikit-pro-standard';
import {Router} from '@angular/router';
import {ModeratorLogin} from '../../models/Moderator-login';
import {ModerateurService} from '../../services/moderateur.service';
import {TokenStorageService} from '../../Auth/token-storage.service';

@Component({
  selector: 'app-m-login',
  templateUrl: './m-login.component.html',
  styleUrls: ['./m-login.component.scss']
})
export class MLoginComponent implements OnInit {
  private role: any;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  testForm: FormGroup;
  submitted = false;
  moderator: ModeratorLogin = new ModeratorLogin();
  @Input() j: ModeratorLogin;
  //journalistes: Observable<JournalistLogin[]>;


  constructor(private fb: FormBuilder,
              private moderateurService: ModerateurService, private toastrService: ToastService,
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
    this.toastrService.warning('Vérifier les champs');
  }

  get f() {
    return this.testForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

  signin() {
    if (this.testForm.valid) {
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
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
          alert('identifiant ou mot de passe incorrect !!!');
        }
      );
    }
  }

}
