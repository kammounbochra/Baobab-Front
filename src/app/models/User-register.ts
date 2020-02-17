export class UserRegister {
  id: number ;
username: string;
email: string;
role: string[];
password: string;
datenaiss: Date;
  numtel: string;
nationality: string;


constructor(username: string, email: string, password: string, nationality: string , numtel: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  this.nationality = nationality;
  this.numtel = numtel;
    this.role = ['user'];
}

}
