import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  password: string;
  otp: number;
  error: string;
  flag = false;
  title = 'Forgot Password';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    if (!this.email) {
      this.error = 'Fill Email Field!!!';
      return;
    }
    this.error = '';
    const obj = {
      email: this.email
    };
    this.authService.forgotPassword(obj)
      .subscribe((res: any) => {
        if (res) {
          this.flag = true;
          this.title = 'Reset Password';
        }
      });
  }

  resetPassword() {
    if (!this.email || !this.password || !this.otp) {
      this.error = 'Fill All Fields!!!';
      return;
    }
    const resetObj = {
      email: this.email,
      password: this.password,
      otp: this.otp
    };
    this.authService.resetPassword(resetObj)
      .subscribe(() => {
        this.router.navigateByUrl('/login');
      });
  }

  getClass() {
    switch (this.flag) {
      case true:
        return { card_reset: true };
      default:
        return { card: true };
    }
  }

}
