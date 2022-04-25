import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from '../../model/signInData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly mockedUsers = new SignInData('admin', '123');
  isAuthenticated = false;

  constructor(private router: Router) { }
  authenticate(signInData: SignInData): boolean {
    console.log(signInData)
    if (this.checkCredentials(signInData)) {
      this.isAuthenticated = true;
      this.router.navigate(['dashboard-page']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }
  private checkCredentials(signInData: SignInData): boolean {
    console.log('signdata', signInData)
    return this.checkAccout(signInData.getEmail()) && this.checkPassword(signInData.getPassword());
  }

  private checkAccout(accout: string): boolean {
    return accout === this.mockedUsers.getEmail();
  }

  private checkPassword(password: string): boolean {
    return password === this.mockedUsers.getPassword();

  }
}
