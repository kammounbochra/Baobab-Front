export class JournalistSignup  {
idUser: any ;
    id: any;
  name: string;
  surname: string;
   username: any;
    email: string;
  role: string[] ;
password: string;
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

}
