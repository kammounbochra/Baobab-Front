import {UserRegister} from './User-register';


export class JournalistSignup extends UserRegister {

    id: number;
  name: string;
  surname: string;
 //   username: any;
    email: any;
  role: string[] ;

//   role: string;
  //  password: string;
  entrepriseActuelle : any;
    actualEntreprise: any;
   nationality: string;
    experience: any;
  dateNaissance: any ;
  numtel: number;
  motivationtext: any;
  status : any;
  cv: File;
  portefolio: File;
/*
  constructor(role: string) {
    this.role = ['journaliste'];
    }*/


  constructor(username: string, email: string, password: string, nationality: string, numtel: number) {
    super(username, email, password, nationality, numtel);
    this.role = this.role;
  }
}
