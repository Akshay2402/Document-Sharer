import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
  flag = false;

  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
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
        if (userInfo) {
          localStorage.removeItem('userInfo');
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          this.openSnackBar();
          this.router.navigateByUrl('/otp');
        }
      }, (err) => {
        this.error = err.message;
      });
  }

  getClass() {
    if (this.error.length) {
      return { card_large: true };
    } else {
      return { card: true };
    }
  }

  openSnackBar() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open('OTP Send To Your Email!!', '', config);
  }

}
