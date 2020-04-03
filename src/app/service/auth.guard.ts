import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    loginStatus: boolean;

    constructor(
        public authService: AuthService,
        public router: Router
    ) { }

    canActivate() {
        this.loginStatus = this.authService.isTokenExpired(this.authService.getToken());
        if (this.loginStatus) {
            const token = this.authService.getToken();
            const tokenExpiryTime = this.authService.getTokenExpirationDate(token);
            if (new Date() >= tokenExpiryTime) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
            if (!localStorage.getItem('token')) {
                this.router.navigate(['/login']);
            } else {
                return true;
            }
        } else {
            this.router.navigate(['/login']);
        }
    }
}
