import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../../models/Article';
import {JournalistService} from '../../services/journalist.service';

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.scss']
})
export class AuteurComponent implements OnInit , OnDestroy  {


  article$: any = {};
  journaliste: any = {};
  art: Article = {} as Article ;
  a: any;
  param : number ;
  name: any;

  idUser: number;
  private sub: any;

  constructor(private route: ActivatedRoute , private  journalistService : JournalistService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.idUser = +params['idUser']; // (+) converts string 'id' to a number


      this.journalistService.get(this.idUser).subscribe(dat => {
        this.journaliste = dat;  console.log('jour' , dat) ;
      });
      console.log ('idd' , this.idUser);
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
