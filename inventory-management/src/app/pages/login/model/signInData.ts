export class SignInData{
  private accout : string;
  private password : string;
  constructor(accout : string, password : string) {
    this.accout = accout;
    this.password = password;
  }
  getEmail() {
     return this.accout; 
    }
  getPassword() {
    return this.password;
  }
}