import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://documentsharer.herokuapp.com';

  constructor(
    private http: HttpClient,
  ) { }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    let date;
    if (token) {
      date = this.getTokenExpirationDate(token);
    }
    if (date === undefined) {
      return false;
    }
    return (date.valueOf() > new Date().valueOf());
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  login(loginDetails) {
    return this.http.post(this.url + '/user/auth/login', loginDetails);
  }

  register(userDetails) {
    return this.http.post(this.url + '/user/auth/register', userDetails);
  }

  verifyOtp(otpDetails) {
    return this.http.post(this.url + '/user/auth/validate_otp', otpDetails);
  }

  forgotPassword(email) {
    return this.http.post(this.url + '/user/auth/forgot_password', email);
  }

  resetPassword(resetObj) {
    return this.http.post(this.url + '/user/auth/reset_password', resetObj);
  }
}
