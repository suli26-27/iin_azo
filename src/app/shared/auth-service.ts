import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class AuthService {
    http = inject(HttpClient)
    
    login(user: any) {
        const url = 'http://localhost:8000/api/login'
        return this.http.post(url, user)
    }
}
