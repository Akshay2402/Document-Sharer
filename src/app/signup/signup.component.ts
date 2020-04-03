import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Fill All The Fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Both Passwords not matching !!!';
      return;
    }
    this.error = '';
    const userDetails = {
      name: this.username,
      email: this.email,
      password: this.password
    };
    this.authService.register(userDetails)
      .subscribe((userInfo: any) => {
        console.log('userInfo', userInfo);
        if (userInfo) {
          localStorage.removeItem('userInfo');
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          this.router.navigateByUrl('/otp');
        }
      }, (err) => {
        console.log('error', err);
      });
  }

}
