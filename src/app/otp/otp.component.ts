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
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  email: any;
  otp: any;
  error = '';

  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('userInfo')).email;
  }

  verify() {
    if (!this.email || !this.otp ) {
      this.error = 'Fill All The Fields';
      return;
    }
    this.error = '';
    const otpDetails = {
      email: this.email,
      otp: this.otp
    };
    this.authService.verifyOtp(otpDetails)
      .subscribe((res: any) => {
        if (res) {
          this.openSnackBar();
          this.router.navigateByUrl('/login');
        }
      }, (err) => {
        this.error = err.message;
      });
  }

  openSnackBar() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open('User Registered!!', '', config);
  }
}
