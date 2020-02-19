import {UserRegister} from './User-register';
import {Role} from './Role';


export class JournalistSignup  {


idUser : any ;
    id: any;
  name: string;
  surname: string;
   username: any;
    email: string;
  role: string[] ;
 roles: Role;
//   role: string;
  //  password: string;
  entrepriseActuelle : any;
    actualEntreprise: any;
   nationality: string;
    experience: any;
  dateNaissance: any ;
 numtel: string;
  motivationtext: any;
  status : any;
  cv: File;
  portefolio: File;

  constructor(role: string) {
    this.role = ['journaliste'];
    }

/*  constructor(username: string, email: string, password: string, nationality: string, numtel: string , dateNaissance: Date) {
    super(username, email, password, nationality, numtel , dateNaissance);
    this.role = this.role;
  }*/

 /* constructor(username: string, email: string, password: string, nationality: string, numtel: string, dateNaissance: Date, name: string, surname: string, role: string[], entrepriseActuelle: any, actualEntreprise: any, experience: any, motivationtext: any, status: any) {
    super(username, email, password, nationality, numtel, dateNaissance);
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.entrepriseActuelle = entrepriseActuelle;
    this.actualEntreprise = actualEntreprise;
    this.experience = experience;
    this.motivationtext = motivationtext;
    this.status = status;
  }*/
}
