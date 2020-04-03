import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  email: any;
  otp: any;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
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
      .subscribe((userInfo: any) => {
        console.log('userInfo', userInfo);
        if (userInfo) {
          // localStorage.removeItem('userInfo');
          // localStorage.setItem('userInfo', JSON.stringify(userInfo));
          this.router.navigateByUrl('/login');
        }
      }, (err) => {
        console.log('error', err);
      });
  }

}
