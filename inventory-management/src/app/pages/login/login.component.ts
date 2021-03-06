import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { postLogin } from 'src/app/services';

@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  result: any[] = [];

  constructor(private router: Router, private http: HttpClient, public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      UserName: [''],
      Password: ['']
    });
  }

  ngOnInit() {
    localStorage.setItem("token", "")
  }

  onSubmit() {
    if (this.loginForm.valid) {
      var formData: any = new FormData();
      formData.append('UserName', this.loginForm.get('UserName')?.value);
      formData.append('Password', this.loginForm.get('Password')?.value);

      this.http.post(postLogin, formData).subscribe((data) => {
        this.result = [data];
        if (this.result[0].isSuccessed) {
          localStorage.setItem("token", this.result[0].resultObj)
          this.router.navigate(['/dashboard-page']);
        }
      });
    }
  }
}