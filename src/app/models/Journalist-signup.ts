

export class JournalistSignup  {

    id: number;
  name: string;
  surname: string;
    username: any;
    email: any;
  role: string[] ;

  /// role: string;
    password: string;
    actualEntreprise: any;
    nationality: string;
    experience: number;
  datenaiss: any ;
  numtel: number;
  motivationtext: any;
  cv: File;
  portefolio: File;

  constructor(role: string) {
    this.role = ['journaliste'];
    }
}
