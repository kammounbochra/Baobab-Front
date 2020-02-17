export class UserRegister{
username: string;
email: string;
role: string[];
password: string;
datenaiss: Date;
phoneNumber: any;
nationality: any;

constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = ['user'];
}
}
