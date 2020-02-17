import {UserRegister} from './User-register';


export class JournalistSignup extends UserRegister {

    id: number;
  name: string;
  surname: string;
    username: any;
  //  email: any;
  role: string[] ;

//   role: string;
  //  password: string;
    actualEntreprise: any;
 //   nationality: string;
    experience: number;
  dateNaissance: any ;
 // numtel: string;
  motivationtext: any;
  cv: File;
  portefolio: File;
/*
  constructor(role: string) {
    this.role = ['journaliste'];
    }*/


  constructor(username: string, email: string, password: string, nationality: string, numtel: string) {
    super(username, email, password, nationality, numtel);
    this.role = this.role;
  }
}
