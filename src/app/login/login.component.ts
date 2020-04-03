import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  signin() {
    if (!this.email || !this.password) {
      this.error = 'Fill All The Feilds!!!';
      return;
    }
    this.error = '';

    const loginDetails = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginDetails)
      .subscribe((userInfo: any) => {
        if (userInfo) {
          localStorage.removeItem('userInfo');
          localStorage.setItem('userInfo', JSON.stringify(userInfo.user));
          localStorage.setItem('token', JSON.stringify(userInfo.token));
          this.router.navigateByUrl('/home');
        }
      });
  }

}
