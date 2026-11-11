import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '../interfaces/api-response';
import { User } from '../interfaces/user';

@Service()
export class AuthService {
    http = inject(HttpClient)
    router = inject(Router)

    private _isAuthenticated = signal<boolean>(!!localStorage.getItem('token'))
    readonly isAuthentiaced = this._isAuthenticated.asReadonly()
    
    login(user: any) {
        const url = 'http://localhost:8000/api/login'
        return this.http.post<ApiResponse<User>>(url, user)
    }

    loginSuccess() {
        this._isAuthenticated.set(true)
    }

    logout() {
        localStorage.removeItem('token')
        this._isAuthenticated.set(false)
        this.router.navigate(['login'])
    }
}
